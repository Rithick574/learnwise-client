import { useNavigate } from "react-router-dom";



const ApplyasInstructor = () => {
  const navigate=useNavigate()
  return (
    <>
      <div className="w-full flex items-center h-screen">
        <div className="flex flex-col ml-24 mt-[200px]">
          <h2 className="text-[45px] font-Josefin px-3w-full font-[600]">
            Become An
            <span className="text-[#46e256]"> Instructor </span>
            Today
            <br />
            And Start Teaching
            <br />
          </h2>
          <br />
          <p className="font-Josefin font-[500] text-[16px]">
            Instructors from around the world teach millions of students on
            Learnwise.We provide
            <br />
            the tools skills to teach what you love.And you can also achieve
            your goal with us.
          </p>
          <br />
          <br />
          <div className="row flex ml-20" >
            <div className="w-[50%]">
              <ul>
                <li className="flex items-center">
                  <img
                    src="https://edmy-react.hibootstrap.com/images/icon/teaching-icon-1.svg"
                    alt="teaching"
                  />
                  <h3>Expert Instruction</h3>
                </li>

                <li className="flex items-center">
                  <img
                    src="https://edmy-react.hibootstrap.com/images/icon/teaching-icon-3.svg"
                    alt="teaching"
                  />
                  <h3>Remote Learning</h3>
                </li>
              </ul>
            </div>
            <div className="w-[50%]">
              <li className="flex items-center">
                <img
                  src="https://edmy-react.hibootstrap.com/images/icon/teaching-icon-2.svg"
                  alt="teaching"
                />
                <h3>Lifetime Access</h3>
              </li>
              <li className="flex items-center">
                <img
                  src="https://edmy-react.hibootstrap.com/images/icon/teaching-icon-1.svg"
                  alt="teaching"
                />
                <h3>Expert Instruction</h3>
              </li>
            </div>
          </div>
          <br/>
          <br/>
          <div className="flex justify-center items-center">
            <button
             className="bg-gradient-to-br font-Josefin from-blue-500 to-black font-bold py-2 px-4 rounded w-[40%]"
             onClick={() => navigate("/apply-to-teach")}
             >
              Become An Instructor
            </button>
          </div>
        </div>
        <div className="w-[50%] flex items-center justify-end pt-[50px] z-10 relative mt-[150px]">
          <img
            src="https://edmy-react.hibootstrap.com/images/teaching-img.png"
            alt="transform"
            className="object-contain 1100px:max-w-[90%] w-[80%] 1500px:max-w-[85%] h-[auto] z-[10]"
          />
          <div className="absolute bg-gradient-to-br from-blue-900 to-black rounded-full w-[580px] h-[580px]  right-20"></div>
        </div>
      </div>
    </>
  );
};

export default ApplyasInstructor;
