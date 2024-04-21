import { useState, useEffect } from "react";
import Signup from "../user/Signup";
import { GoogleLogin } from "@react-oauth/google";
import { googleLoginOrSignUp } from "@redux/actions/userActions";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { Props, UserValues, CustomJwtPayload } from "@/interface/IUserLogin";
// import { useDispatch,useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import InputWithIcon from "../../components/InputWithIcon";
import PasswordInputWithIcon from "../../components/PasswordInputWithIcon";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";

const Login: React.FC<Props> = ({ onClose }) => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  // const { user, loading, error } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (!e.target.closest(".modal-content")) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleSignupClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsSignupOpen(true);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLoginSubmit = () => {};

  const loginWithGoogle = async (data: any) => {
    if (data) {
      try {
        const credentials: CustomJwtPayload = jwtDecode(data.credential);
        console.log(credentials, "value");
        const userValues: UserValues = {
          email: credentials.email,
          google: true,
        };
        googleLoginOrSignUp(userValues);
        //  dispatch()
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div
        className="modal-content bg-gray-900 text-white p-8 rounded-lg"
        style={{ width: "450px" }}
      >
        <div className="flex justify-center p-4">
          <h2 className="text-3xl font-bold mb-4">Join to LearnWise</h2>
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
              as="input"
            />
            <PasswordInputWithIcon
              name="password"
              title="Password"
              placeholder="Enter your password"
              icon={<AiOutlineLock />}
              as="input"
            />
            {/* {error && <p className="my-2 text-red-400">{error}</p>} */}
            <button
              type="submit"
              className="btn-blue text-white w-full mt-5"
              // disabled={loading}
            >
              {/* {loading ? "Loading..." : "Login"} */}
            </button>
          </Form>
        </Formik>

        <br />
        <div className="flex justify-center items-center">
          <p className="mr-2">Or</p>
        </div>
        <div className="flex justify-center items-center mt-3 mr-3">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              loginWithGoogle(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
        <div className="mt-5 flex justify-center">
          <p>
            New to Learnwise?{" "}
            <a href="#" onClick={handleSignupClick} className="text-blue-500">
              Signup
            </a>{" "}
          </p>
        </div>
      </div>
      {isSignupOpen && <Signup onClose={() => setIsSignupOpen(false)} />}
    </div>
  );
};

export default Login;
