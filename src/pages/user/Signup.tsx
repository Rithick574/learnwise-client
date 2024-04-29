import { FC, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import SignupBG from "../../assets/business-img.png";
import { GoogleLogin } from "@react-oauth/google";
import InputWithIcon from "@/components/auth/InputWithIcon";
import PasswordInputWithIcon from "@/components/auth/PasswordInputWithIcon";
import {
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import toast from "react-hot-toast";
import { useTheme } from "@/components/ui/theme-provider";
import OTPEntersection from "@/components/auth/OTPEntersection";
import { SignUpFormData } from "@/types/IUserLogin";
import {
  googleLoginOrSignUp,
  signUpUser,
} from "@/redux/actions/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch,RootState } from "@/redux/store";
import OTPExpired from "@/components/auth/OTPExpired";
import { updateError } from "../../redux/reducers/userSlice";

const Signup: FC = () => {
  const { user, error } = useSelector((state:RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const [load, setLoad] = useState(true);
  const [otpLoading, setOTPLoading] = useState(false);
  const [otpComponent, setOTPComponent] = useState(false);
  const [datas, setDatas] = useState<SignUpFormData>({});
  const [otpExpired, setOTPExpired] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    return () => {
      dispatch(updateError(""));
    };
  }, [user]);

  const initialValues = {
    firstName: "Rithick",
    lastName: "p",
    email: "rithick.panoor574@gmail.com",
    password: "Rithick@123",
    passwordconfirm: "Rithick@123",
    phoneNumber: "9539590441",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    passwordconfirm: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    phoneNumber: Yup.number()
      .required("Phone number is required")
      .typeError("Phone number should be digits")
      .moreThan(111111111, "Not valid phone number"),
  });

  const dispatchSignUp = async (otp:string) => {
    console.log(datas?.email, "here in datas in dispatchsignup");
    let formData = new FormData();
    formData.append("firstName", datas.firstName ?? "");
    formData.append("lastName", datas.lastName ?? "");
    formData.append("email", datas.email ?? "");
    formData.append("password", datas.password ?? "");
    formData.append("passwordconfirm", datas.passwordconfirm ?? "");
    formData.append("phoneNumber", datas.phoneNumber ?? "");
    if (otp) {
      formData.append("otp",otp);
    }
    return await dispatch(signUpUser(formData));
  };

  const resendOTP=()=>{
    if (!datas.email) {
      toast.error("Email not available");
      return;
    }
    const formData = new FormData();
    formData.append("email", datas.email);
  
    dispatch(signUpUser(formData))
    .then(() => {
      toast.success("OTP has been resent");
    })
    .catch((error:any) => {
      toast.error("Failed to resend OTP");
      console.error("Error resending OTP:", error);
    });  
  }

  const handleSignup = async (value: any) => {
    setOTPLoading(true);

    const formData = new FormData();
    formData.append("firstName", value.firstName);
    formData.append("lastName", value.lastName);
    formData.append("email", value.email);
    formData.append("password", value.password);
    formData.append("passwordconfirm", value.passwordconfirm);
    formData.append("phoneNumber", value.phoneNumber);

    try {
      const result = await dispatch(signUpUser(formData));

      if (result.meta.requestStatus === "fulfilled") {
        console.log("Signup result:", result.payload?.success);
        if (result.payload?.success) {
          setLoad(false);
          toast.success("OTP Sent successfully");
          setDatas(value);
          setOTPComponent(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          toast.error("Signup failed!");
        }
      } else if (result.meta.requestStatus === "rejected") {
        const errorResponse = result.payload as any;
        toast.error(errorResponse?.response?.data?.error || "Signup failed!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed!");
    } finally {
      setOTPLoading(false);
    }
  };

  const loginWithGoogle = async (data: any) => {
    try {
      dispatch(googleLoginOrSignUp(data));
    } catch (error: any) {
      console.log("Login Failed", error);
      toast.error("Something is wrong! Please try later");
    }
  };

  return (
    <div className="py-20 lg:flex">
      <div className="lg:w-1/2 flex justify-center items-center">
        <img src={SignupBG} alt="SignUpBG" />
      </div>

      <div className="lg:w-1/2 p-5 mx-10 lg:mx-20 lg:p-10 border border-gray-00 rounded-3xl">
        <div className="flex items-center justify-center">
          {/* <img src={Logo} alt="logo" className="lg:w-1/12 w-1/12" /> */}
          <h1 className="text-4xl my-5 font-bold">Join to Learnwise</h1>
        </div>
        {load && (
          <Formik
            initialValues={initialValues}
            onSubmit={handleSignup}
            validationSchema={validationSchema}
          >
            <Form className="w-full">
              <InputWithIcon
                icon={<AiOutlineUser />}
                title="First Name"
                name="firstName"
                placeholder="Enter your first name"
                as="text"
                theme={theme}
              />
              <InputWithIcon
                icon={<AiOutlineUser />}
                title="Last Name"
                name="lastName"
                placeholder="Enter your last name"
                as="text"
                theme={theme}
              />
              <InputWithIcon
                icon={<AiOutlineMail />}
                title="Email"
                name="email"
                placeholder="Enter your email"
                as="email"
                theme={theme}
              />
              <PasswordInputWithIcon
                icon={<AiOutlineLock />}
                title="Password"
                name="password"
                placeholder="Enter your password"
                as="password"
                theme={theme}
              />
              <PasswordInputWithIcon
                icon={<AiOutlineLock />}
                title="Confirm Password"
                name="passwordconfirm"
                placeholder="Confirm your password"
                as="password"
                theme={theme}
              />
              <InputWithIcon
                icon={<AiOutlinePhone />}
                title="Phone Number"
                name="phoneNumber"
                placeholder="Enter your phone number"
                as="number"
                theme={theme}
              />
              <button
                type="submit"
                className="bg-blue-500 rounded-md p-2 w-full my-3"
                disabled={otpLoading}
              >
                {otpLoading ? "Loading..." : "Sign Up"}
              </button>
              {error && <p className="my-2 text-red-400">{error}</p>}
            </Form>
          </Formik>
        )}
        {otpComponent && (
          <OTPEntersection
            email={datas.email}
            setOTPExpired={setOTPExpired}
            setOTPSec={setOTPComponent}
            dispatchSignUp={dispatchSignUp}
            resendOtp={resendOTP}
          />
        )}
  {otpExpired && <OTPExpired />}
        <div className="text-center">
          <p className="my-4">OR</p>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                loginWithGoogle(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
                toast.error("Something is wrong! Please try later");
              }}
            />
          </div>
          <p className="my-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold cursor-pointer hover:text-blue-500"
            >
              Login now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
