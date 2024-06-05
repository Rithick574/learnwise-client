import { commonRequest } from "@/Common/api";
import { config } from "@/Common/configurations";
import { FC, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const UserPaymentFailed: FC = () => {
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
        const status = "failed";
        const wholeData = { method, status, ...rest };
        const response = await commonRequest("post", '/payment/savePayment', wholeData, config);
        console.log("🚀 ~ file: UserPaymentFailed.tsx:13 ~ fetchData ~ response:", response);

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
          className="text-red-600 w-16 h-16 mx-auto my-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.294 15.293a1 1 0 1 1-1.414 1.414L12 13.414l-3.88 3.88a1 1 0 0 1-1.415-1.415l3.88-3.88-3.88-3.88a1 1 0 0 1 1.415-1.415l3.88 3.88 3.88-3.88a1 1 0 0 1 1.414 1.415l-3.88 3.88 3.88 3.88z" />
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-white font-semibold text-center">
            Payment Failed!
          </h3>
          <p className="text-white my-2">
            Unfortunately, your payment was not successful.
          </p>
          <p>Please try again or contact support.</p>
          <div className="py-10 text-center">
            <a
              href="/courses"
              className="px-12 bg-red-600 hover:bg-red-500 text-white font-semibold py-3"
            >
              GO BACK
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPaymentFailed;
