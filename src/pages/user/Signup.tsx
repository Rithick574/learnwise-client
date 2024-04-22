import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
// import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import SignupBG from "../../assets/business-img.png";
import Logo from "../../assets/auth-img.png";
import InputWithIcon from "@/components/auth/InputWithIcon";
import PasswordInputWithIcon from "@/components/auth/PasswordInputWithIcon";
import {
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { useTheme } from "@/components/ui/theme-provider";
import OTPEntersection from "@/components/auth/OTPEntersection";
import {SignUpFormData } from "@/interface/IUserLogin"


const Signup = () => {
  const { theme } = useTheme();
  const [load, setLoad] = useState(true);
  const [otpLoading, setOTPLoading] = useState(false);
  const [otpComponent, setOTPComponent] = useState(false);
  const [data, setData] = useState<SignUpFormData >({});
  const [otpExpired, setOTPExpired] = useState(false);

  const initialValues = {
    firstName: "Rithick",
    lastName: "adc",
    email: "rithick@gmail.com",
    password: "Rithick@123",
    passwordconfirm: "Rithick@123",
    phoneNumber: "9539691245",
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


  const dispatchSignUp = () => {
    let formData = new FormData();
    if (data.firstName) formData.append("firstName", data.firstName);
    if (data.lastName) formData.append("lastName", data.lastName);
    if (data.email) formData.append("email", data.email);
    if (data.password) formData.append("password", data.password);
    if (data.passwordconfirm) formData.append("passwordAgain", data.passwordconfirm);
    if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);
    // dispatch(signUpUser(formData));
  };

  const handleSignup = async (value: any) => {
    console.log("cfvgbhjkjhugfdfghj");
    setOTPLoading(false);
    setData(value);
    setLoad(false)
    setOTPComponent(true)
  };

  return (
    <div className="py-20 lg:flex">
      <div className="lg:w-1/2 flex justify-center items-center">
        <img src={SignupBG} alt="SignUpBG" />
      </div>

      <div className="lg:w-1/2 p-5 mx-10 lg:mx-20 lg:p-10 border border-gray-00 rounded-3xl">
        <div className="flex items-center justify-center">
          {/* <img src={Logo} alt="logo" className="lg:w-1/12 w-1/12" /> */}
          <h1 className="text-2xl my-5 font-bold">Sign Up</h1>
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
            </Form>
          </Formik>
        )}
        {otpComponent && (
          <OTPEntersection
          email={data.email}
          setOTPExpired={setOTPExpired}
          setOTPSec={setOTPComponent}
          dispatchSignUp={dispatchSignUp}
          />
        )}
      </div>
    </div>
  );
};

export default Signup;
