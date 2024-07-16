import { commonRequest } from "@/Common/api";
import { config } from "@/Common/configurations";
import { useSocket } from "@/contexts/SocketContext";
import { RootState } from "@/redux/store";
import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { Player } from "@lottiefiles/react-lottie-player";

const UserPaymentSuccess: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const socket = useSocket();
  const navigate = useNavigate();
  const item = localStorage.getItem("paymentData");
  const isRequestSent = useRef(false);
  const [confettiDimensions, setConfettiDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    if (!item) {
      navigate("/student/courses");
      return;
    }

    if (isRequestSent.current) return;
    isRequestSent.current = true;

    const data = JSON.parse(item);
    const fetchData = async () => {
      try {
        const { courseName, thumbnail, ...rest } = data;
        const method = "card";
        const status = "completed";
        const wholeData = { method, status, ...rest };
        await commonRequest("post", "/payment/savePayment", wholeData, config);
      } catch (error) {
        console.error("Error saving payment:", error);
      }
    };
    fetchData();
  }, [item, navigate]);

  useEffect(()=>{
    setTimeout(() => {
      if (item) {
        const { courseId,instructorRef } = JSON.parse(item);
        if (socket) {
          socket.emit("newNotification", {
            recipientId: `${instructorRef}`,
            content: `Course ${courseId} is Purchased by ${user.firstName} `,
            type: "coursePurchase",
          });
        }
        localStorage.removeItem("paymentData");
      }
    }, 3000);
  },[socket,user])
  

  useEffect(() => {
    const updateDimensions = () => {
      setConfettiDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div className="h-screen">
      <Confetti
        width={confettiDimensions.width}
        height={confettiDimensions.height}
      />
      <div className="p-6 md:mx-auto">
        <Player
          autoplay
          loop
          src="https://lottie.host/64e5ead9-ca1d-4e85-bc64-fd2f609d4d91/GiwKcXIA3R.json"
          style={{ height: "400px", width: "400px" }}
        />
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z" />
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-white font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-white my-2">
            Thank you for completing your secure online payment.
          </p>
          <p>Have a great day!</p>
          <div className="py-10 text-center">
            <span
              onClick={() => navigate("/student/courses")}
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 cursor-pointer"
            >
              GO BACK
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPaymentSuccess;
