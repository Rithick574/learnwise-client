import { useState, useEffect } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import OtpPage from "./OtpPage"; 

interface Props {
  onClose: () => void;
}

const Signup: React.FC<Props> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPage, setCurrentPage] = useState("signup");

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

  const handleSignup = () => {
    // Handle signup logic here
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    // After successful signup, switch to OTP page
    setCurrentPage("otp");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div
        className="modal-content bg-gray-900 text-white p-8 rounded-lg"
        style={{ width: "450px" }}
      >
        {currentPage === "signup" && (
          <>
            <div className="flex justify-center p-4">
              <h2 className="text-3xl font-bold mb-4">Join to LearnWise</h2>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Enter your Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=" px-4 py-2 w-full rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Enter your Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" px-4 py-2 w-full rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2"> Enter your Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 w-full rounded"
              />
            </div>

            <div className="flex">
              <button
                onClick={handleSignup}
                className="flex-1 bg-blue-700 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-full"
              >
                Signup
              </button>
            </div>
            <br />
            <div className="flex justify-center items-center mt-3 mr-3">
              <FaGoogle className="mr-2" size={24} />
              <FaGithub className="text-white" size={24} />
            </div>
            <div className="mt-3 flex justify-center">
              <p>
                Already have an account?{" "}
                <a href="#" onClick={onClose} className="text-blue-500">
                  Login
                </a>{" "}
              </p>
            </div>
          </>
        )}
        {currentPage === "otp" && <OtpPage />}
      </div>
    </div>
  );
};

export default Signup;
