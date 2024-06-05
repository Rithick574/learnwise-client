import { commonRequest } from "@/Common/api";
import { config } from "@/Common/configurations";
import { FC, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const UserPaymentSuccess: FC = () => {
  const navigate = useNavigate();
  const item = localStorage.getItem("paymentData");
  const isRequestSent = useRef(false);  

  useEffect(() => {
    if (!item) {
      navigate("/courses");
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
        const response = await commonRequest("post", '/payment/savePayment', wholeData, config);
        console.log("🚀 ~ file: UserPaymentSuccess.tsx:13 ~ fetchData ~ response:", response);

        localStorage.removeItem('paymentData');
      } catch (error) {
        console.error("Error saving payment:", error);
      }
    };
    fetchData();
  }, [item, navigate]);

  return (
    <div className="h-screen">
      <div className="p-6 md:mx-auto">
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
            <a
              href="/courses"
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              GO BACK
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPaymentSuccess;
