import { useState, useEffect } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Signup from "../user/Signup"; 

interface Props {
  onClose: () => void;
}

const Login: React.FC<Props> = ({ onClose }) => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

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

  const handleSignupClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // Prevent the default behavior of the anchor tag
    setIsSignupOpen(true); // Open the Signup modal
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
        <div className="mb-4">
          <label className="block mb-2">Enter Your Email:</label>
          <input
            type="email"
            name="email"
            className=" px-4 py-2 w-full rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Enter Your Password:</label>
          <input
            type="password"
            name="password"
            className="px-4 py-2 w-full rounded"
          />
        </div>

        <div className="flex">
          <button className="flex-1 bg-blue-700 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-full">
            Login
          </button>
        </div>
        <br />
        <div className="flex justify-center items-center">
          <p className="mr-2">Or join with</p>
        </div>
        <div className="flex justify-center items-center mt-3 mr-3">
          <FaGoogle className="mr-2" size={24} />
          <FaGithub className="text-white" size={24} />
        </div>
        <div className="mt-3 flex justify-center">
          <p>New to Learnwise? <a href="#" onClick={handleSignupClick} className="text-blue-500">Signup</a> </p>
        </div>
      </div>
      {isSignupOpen && <Signup onClose={() => setIsSignupOpen(false)} />} 
    </div>
  );
};

export default Login;
