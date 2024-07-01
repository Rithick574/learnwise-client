import { FC, useState, useEffect } from "react";
import CertificateGenerator from "@/lib/utility/CertificateGenerator";
import { Player } from "@lottiefiles/react-lottie-player";
import Confetti from "react-confetti";
import { BsCaretRightFill } from "react-icons/bs";

interface ExamSuccessProps {
  percentage: number;
  userName: string;
}

const ExamSuccess: FC<ExamSuccessProps> = ({ percentage, userName }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (percentage > 40) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 6000);
    }
  }, [percentage]);

  return (
    <div className="p-5 w-full text-sm">
      <div className="flex justify-between items-center font-semibold pb-5">
        <div>
          <h1 className="font-bold mt-4 text-2xl">Exam</h1>
          <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
            <p className="text-green-500 font-semibold">exam</p>
            <span>
              <BsCaretRightFill />
            </span>
            <p className="font-semibold">result</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
      {showConfetti && <Confetti />}
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <Player
            autoplay
            loop
            src="https://lottie.host/64e5ead9-ca1d-4e85-bc64-fd2f609d4d91/GiwKcXIA3R.json"
            style={{ height: "400px", width: "400px" }}
          />
          <h1 className="text-2xl font-bold text-gray-500 p-5">
            Exam Successfully Completed
          </h1>
          <h2 className="text-lg font-semibold pb-2">
            You Got <span className="text-green-600">{percentage}%</span> mark on the exam
          </h2>
          {percentage > 40 ? (
            <CertificateGenerator
              userName={userName}
              courseName="The Complete Digital Marketing Course"
            />
          ) : (
            <p className="text-md text-red-600">
              You need to retake the exam and achieve above 40% to pass.
            </p>
          )}
        </div>
      </div>
    </div>

      </div>
  
  );
};

export default ExamSuccess;
