import LoginBG from "../../assets/business-img.png";
import Logo from "../../assets/auth-img.png"
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="py-20 lg:flex lg:items-center text-gray-500">
       <div className="lg:w-1/2">
        <img src={LoginBG} alt="LoginBG" />
      </div>
      <div className="lg:w-1/2 p-5 mx-10 lg:mx-20 lg:p-10 border border-gray-300 rounded-3xl">
      <div className="flex items-center justify-center">
          <img src={Logo} alt="ex.iphones. logo" className="lg:w-1/12 w-1/12" />
          <h1 className="text-2xl my-5 font-bold">Login</h1>
        </div>


        <p className="my-5">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-semibold cursor-pointer hover:text-blue-500"
            >
              Sign Up now
            </Link>
          </p>

      </div>
    </div>
  )
}

export default Login