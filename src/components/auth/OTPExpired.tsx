import {FC} from "react";
import { TiCancel } from "react-icons/ti";
import { Link } from "react-router-dom";

const OTPExpired:FC = () => {
  return (
    <div className="w-full flex flex-col items-center ">
      <div className="text-9xl text-red-600 animate-pulse">
        <TiCancel />
      </div>

      <h1 className="my-5 text-red-500 text-center animate-pulse">
        OTP Expired try again Later
      </h1>
      <Link to="/" className="btn-blue text-white ">
        Go Home
      </Link>
    </div>
  );
};

export default OTPExpired;
