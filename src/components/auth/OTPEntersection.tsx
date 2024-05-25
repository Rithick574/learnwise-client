import React, { useState,useEffect, ChangeEvent, ClipboardEvent } from "react";
import toast from "react-hot-toast";

import { OTPEntersectionProps } from "@/types/IUserLogin";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const OTPEntersection: React.FC<OTPEntersectionProps> = ({
  email,
  setOTPSec,
  setOTPExpired,
  dispatchSignUp,
  resendOtp
}) => {
  const { error } = useSelector((state:RootState) => state.user);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  const navigate = useNavigate()

  const [_errors, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [minutes, setMinutes] = useState(4);
  const [seconds, setSeconds] = useState(59);

  const [resendSeconds, setResendSeconds] = useState(30);
  const [resendLoading, setResendLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedOtp = [...otp];
    const value = e.target.value;
  
    if (value === "") {
      updatedOtp[index] = "";
      if (index > 0) {
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        if (prevInput instanceof HTMLInputElement) {
          prevInput.focus();
        }
      }
    } else if (value.length === 1) {
      updatedOtp[index] = value;
  
      if (index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`) as HTMLInputElement | null;
        if (nextInput) nextInput.focus();
      }
    }
  
    setOtp(updatedOtp);
  };
  
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, otp.length);
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      for (let i = 0; i < Math.min(pastedData.length, otp.length); i++) {
        newOtp[i] = pastedData[i]; 
      }
      return newOtp;
    });
  
    // Focus management
    const lastFilledIndex = Math.min(pastedData.length, otp.length) - 1;
    const nextInput = document.getElementById(`otp-input-${lastFilledIndex + 1}`) as HTMLInputElement | null;
    if (nextInput && nextInput.value === "") {
      nextInput.focus();
    } else {
      const lastInput = document.getElementById(`otp-input-${lastFilledIndex}`) as HTMLInputElement | null;
      if (lastInput) {
        lastInput.focus();
      }
    }
  };
  


  // OTP Submission function
  const handleOTPSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let otpNumber = otp.join("")
    if (otpNumber.length < 6) {
     toast.error("please a enter valid otp")
      setError("OTP is not valid");
      return;
    } else {
      setError("");
    }
    setLoading(true);

    try {
      const res = await dispatchSignUp(otpNumber); 
      console.log("🚀 ~ file: OTPEntersection.tsx:97 ~ handleOTPSubmit ~ res:", res);
  
    
      if (res.payload?.success) {
        console.log("Signup successful:", res);
        toast.success("Signup successful");
        navigate("/")
      } else {
        console.log("here in hangle otp submit else");
        
        toast.error("otp is Invalid try another");
        setError(res.response?.data.message);
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error("Signup failed!");
    } finally {
      setLoading(false);
    }
  };

   // OTP 5 Minute Timer function
   useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          toast.error("OTP Expired");
          setOTPExpired?.(true);
          setOTPSec?.(false);          
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

    // OTP Resend timer starting on component load
    useEffect(() => {
      const resendTimerInterval = setInterval(() => {
        if (resendSeconds > 0) {
          setResendSeconds(resendSeconds - 1);
        }
      }, 1000);
  
      return () => {
        clearInterval(resendTimerInterval);
      };
    }, [resendSeconds]);

    
  const handleResending = async () => {
    if (resendSeconds === 0) {
      setResendLoading(true);
      if (resendOtp) {
        resendOtp();
        setResendLoading(false);
      } else {
        console.error("Resend OTP function is undefined.");
        toast.error("Unable to resend OTP.");
      }
      setResendSeconds(30);
    }else{
      toast.error(`Please wait ${resendSeconds} seconds before resending OTP`);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <p className="mb-5 text-green-600">
          An OTP is sent to your email ({email})
        </p>
      </div>
      <label className="block text-gray-700 text-sm font-bold mb-2 text-center">
        Enter OTP
      </label>
      <div className="flex justify-center my-5">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            className="appearance-none border border-gray-400 rounded-lg w-12 py-4 px-3 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-1"
            maxLength={1}
            value={digit}
            placeholder="-"
            onChange={(e) => handleChange(e, index)}
            onPaste={(e) => handlePaste(e)}
          />
        ))}
      </div>

      <div className="my-5 flex justify-between">
        {resendLoading ? (
          <p>loading...</p>
        ) : (
          <button
            className={
              resendSeconds === 0
                ? "text-blue-500 hover:underline cursor-pointer "
                : "text-gray-500"
            }
            disabled={resendSeconds !== 0}
            onClick={handleResending}
          >
            {resendSeconds === 0
              ? "Resend OTP?"
              : `Resend OTP in ${resendSeconds}s`}
          </button>
        )}
        <p>
          OTP will expire in{" "}
          <span className="px-2 border border-gray-500 rounded">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </p>
      </div>
      {error && <p className="my-2 text-center text-red-400">{error}</p>}

      <div className="text-center">
        <button
          className="bg-blue-700 hover:bg-blue-900 p-3 rounded-sm"
          onClick={handleOTPSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Validate OTP"}
        </button>
      </div>
    </div>
  );
};

export default OTPEntersection;
