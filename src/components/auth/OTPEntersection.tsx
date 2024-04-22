import React,{ useState, ChangeEvent, ClipboardEvent } from "react";
import toast from "react-hot-toast";
import {OTPEntersectionProps} from "@/interface/IUserLogin"

const OTPEntersection: React.FC<OTPEntersectionProps> = ({email}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {}

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {}

  return (
    <div>
       <p className="mb-5">An OTP is sent to your email ({email})</p>
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
    </div>
  )
}

export default OTPEntersection