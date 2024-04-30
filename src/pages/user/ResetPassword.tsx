import { FC, useState } from 'react';
import { AiOutlineLock } from "react-icons/ai";
import axios from "axios";
import ForgotBG from "../../assets/business-img.png";
import { URL } from '@/Common/api';
import { config } from '@/Common/configurations';
import toast from 'react-hot-toast';
import * as Yup from 'yup'; 
import { Link } from "react-router-dom";

const ResetPassword: FC = () => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const param = params.get("token");

  const [password, setPassword] = useState("");
  const [emailSec, setEmailSec] = useState(true);
  const [finalMessage, setFinalMessage] = useState(false);
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const handlePasswordSubmit = async () => {
    setError("");
    setLoading(true);  

    try {
      await passwordSchema.validate({ password });
      if (password !== passwordAgain) {
        setError("Passwords don't match");
        setLoading(false);
        return;
      }

      const data = { password, param };
     
      console.log("🚀 ~ file: ResetPassword.tsx:43 ~ handlePasswordSubmit ~ data:", data)
      
      await axios.post(`${URL}/auth/reset-password`, { data }, config)
        .then(({ data }) => {
          if (data.success) {
            toast.success("Please login with your new password");
            setLoading(false);
            setError(""); 
            setEmailSec(false)
            setFinalMessage(true)
          } else {
            toast.error("Error while updating password");
            setLoading(false);
          }
        })
        .catch(({response})=>{
          console.log("🚀 ~ file: PasswordEnterSection.tsx:40 ~ handlePasswordSubmit ~ response:", response)
          setError(response.data.error);
          setLoading(false);
      })
    } catch (validationError) {
      setError("Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character");
      setLoading(false);
    }
  };

  return (
    <>
      
    <div className="py-20 lg:flex lg:items-center">
    <div className="lg:w-1/2">
      <img src={ForgotBG} alt="ForgotBG" />
    </div>
    <div className="lg:w-1/2 p-5 mx-10 lg:mx-20 lg:p-10 border border-gray-300 rounded-3xl">
        <div className="flex items-center justify-center">
          <p className="text-3xl font-bold">Learn<span className='text-green-500'>W</span>ise</p>
        </div>
        <h1 className="text-2xl my-7 font-bold">Reset your Password</h1>
      
        {emailSec && (
       <>
       <div className="flex items-center gap-3 border border-gray-200 shadow-sm p-2 rounded-lg my-2">
      <AiOutlineLock className="text-xl" />
      <input
        type="password"
        name="password"
        placeholder="Enter your new password"
        className="bg-transparent outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div className="flex items-center gap-3 border border-gray-200 shadow-sm p-2 rounded-lg my-5">
      <AiOutlineLock className="text-xl" />
      <input
        type="password"
        name="passwordAgain"
        placeholder="Enter your new password again"
        className="bg-transparent outline-none"
        value={passwordAgain}
        onChange={(e) => setPasswordAgain(e.target.value)}
      />
    </div>

    {error && <p className="my-2 text-red-400">{error}</p>}

    <div className="text-center">
      <button
        className="bg-blue-600 rounded-md p-2 w-full"
        onClick={handlePasswordSubmit}
        disabled={loading}
      >
        {loading ? "Loading..." : "Reset"}
      </button>
    </div>
       </>
    )}
     {finalMessage && (
       <div>
       <h1 className="my-4">
         Your password has been reset please login again
       </h1>
      <div className='flex items-center justify-center'>
      <Link className="bg-blue-700 p-2 rounded-sm" to="/login">
         Go to Login
       </Link>
      </div>
     </div>
     )}
    </div>
    </div>

    </>
  )
}

export default ResetPassword