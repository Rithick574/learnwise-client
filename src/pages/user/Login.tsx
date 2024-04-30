import LoginBG from "../../assets/business-img.png";
// import Logo from "../../assets/auth-img.png"
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import InputWithIcon from "@/components/auth/InputWithIcon";
import PasswordInputWithIcon from "@/components/auth/PasswordInputWithIcon";
import { useTheme } from "@/components/ui/theme-provider";
import {googleLoginOrSignUp} from "@/redux/actions/user/userActions"
import {loginUser} from "@/redux/actions/user/userActions"
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const { user, loading, error } = useSelector((state:RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const { theme } = useTheme();
  const initialValues = {
    email: "rithick.panoor57@gmail.com",
    password: "Rithick@123",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  useEffect(() => {
    if(user){
      navigate("/")
    }
  }, [user,navigate]);

  useEffect(() => {
    if (error) {
      toast.error("Please check your email or password");
    }
  }, [error]);

  const  handleLoginSubmit = async (value:any) => {
   dispatch(loginUser(value));
  };

  const loginWithGoogle = async (data:any) => {
    dispatch(googleLoginOrSignUp(data));
  };

  return (
    <div className="py-20 lg:flex lg:items-center">
      <div className="lg:w-1/2 flex justify-center items-center">
        <img src={LoginBG} alt="LoginBG" />
      </div>
      <div className="lg:w-1/2 p-5 mx-10 lg:mx-20 lg:p-10 border border-gray-300 rounded-3xl">
        <div className="flex items-center justify-center">
          {/* <img src={Logo} alt="ex.iphones. logo" className="lg:w-1/12 w-1/12" /> */}
          <h1 className="text-4xl my-5 font-bold ">Join to Learn<span className="text-green-500">W</span>ise</h1>
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={handleLoginSubmit}
          validationSchema={validationSchema}
        >
          <Form className="w-full">
            <InputWithIcon
              name="email"
              title="Email"
              placeholder="Enter your email"
              icon={<AiOutlineUser />}
              as="text"
              theme={theme}
            />
            <PasswordInputWithIcon
              name="password"
              title="Password"
              placeholder="Enter your password"
              icon={<AiOutlineLock />}
              as="password"
              theme={theme}
            />
             {error && <p className="my-2 text-red-400">{error || "An unknown error occurred"}</p>}
             <button
              type="submit"
              className="bg-blue-500 rounded-md p-2 w-full my-3 "
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </Form>
        </Formik>

        <div className="text-center">
          <Link to="/forgot-password">
            <div className="my-5 text-blue-600 font-bold cursor-pointer hover:text-blue-500">
              Forgot Password?
            </div>
          </Link>
          <p className="my-4">OR</p>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                loginWithGoogle(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>

          <p className="my-5">
            Don't have an account?
            <Link
              to="/signup"
              className="text-blue-600 font-semibold cursor-pointer hover:text-blue-500"
            >
              Sign Up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
