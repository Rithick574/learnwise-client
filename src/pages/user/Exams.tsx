import { URL } from "@/Common/api";
import { appJson } from "@/Common/configurations";
import { RootState } from "@/redux/store";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ExamSuccess from "./ExamSuccess";
import { BsCaretRightFill } from "react-icons/bs";

interface Question {
  _id:string,
  question: string;
  options: string[];
}

interface Result {
  question: string;
  selectedOption: string;
}

export const Exams: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { courseId } = useParams<{ courseId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [scorePercentage, setScorePercentage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExam = async () => {
      if (courseId) {
        try {
          const response = await axios.get(
            `${URL}/course/exam/${courseId}`,
            appJson
          );
          if (response.data.success) {
            const formattedQuestions = response.data.data.exams.map(
              (exam: any) => ({
                question: exam.question,
                options: Object.values(exam.options),
                _id:exam._id
              })
            );
            setQuestions(formattedQuestions);
          } else {
            console.log("Error fetching exams");
          }
        } catch (error) {
          console.error("Error fetching exams:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("courseId not found");
        setLoading(false);
      }
    };
    fetchExam();
  }, [courseId]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: number;
  }>({});
  const [isFinished, setIsFinished] = useState(false);

  const handleNext = () => {
    if (selectedOptions[currentQuestionIndex] !== undefined) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsFinished(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionChange = (optionIndex: number) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionIndex]: optionIndex,
    });
  };

  const handleFinish = async () => {
    const results: Result[] = questions.map((question, index) => ({
      question: question._id,
      selectedOption: `option${selectedOptions[index] + 1}`,
    }));
    console.log("🚀 ~ file: Exams.tsx:96 ~ constresults:Result[]=questions.map ~ questions:", questions)
    console.log("🚀 ~ file: Exams.tsx:95 ~ constresults:Result[]=questions.map ~ results:", results);

    try {
      const queryParams = new URLSearchParams({
        courseId: courseId as string,
        userId: user._id,
      });

      const response = await axios.post(
        `${URL}/course/exam/submit?${queryParams}`,
        { results }
      );
      console.log("🚀 ~ file: Exams.tsx:96 ~ handleFinish ~ response:", response);
      if (response.data.success) {
        setSubmissionSuccess(true);
        setScorePercentage(response.data.data.percentage);
      } else {
        console.log("Error submitting exam results");
      }
    } catch (error) {
      console.error("Error submitting exam results:", error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  if (submissionSuccess) {
    return (
      <ExamSuccess percentage={scorePercentage} userName={user.firstName} />
    );
  }

  const { question, options } = questions[currentQuestionIndex];
  const completionPercentage = Math.floor(
    ((currentQuestionIndex + 1) / questions.length) * 100
  );

  return (
    <div className="p-5 w-full overflow-auto text-sm">
      <div className="flex justify-between items-center font-semibold pb-5">
        <div>
          <h1 className="font-bold mt-4 text-2xl">Exams</h1>
          <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
            <p className="text-green-500 font-semibold">course</p>
            <span>
              <BsCaretRightFill />
            </span>
            <p className="font-semibold">exam</p>
          </div>
        </div>
      </div>

      <div className=" flex flex-col justify-center w-full">
        <div className="border border-gray-300 shadow-lg rounded-lg">
          <div className="border p-6 rounded-t-lg">
            <h1 className="text-lg font-semibold text-center">Tests</h1>
            <div className="flex justify-between items-center mt-4">
              <div className="w-full bg-gray-300 h-2 rounded">
                <div
                  className="bg-gray-600 h-2 rounded"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <span className="ml-4 text-sm">{completionPercentage}%</span>
            </div>
          </div>
          <div className="p-6">
            <div className="mt-4">
              <p className="text-md font-semibold">
                Question {currentQuestionIndex + 1}
              </p>
              <p className="mt-2">{question}</p>
              <div className="mt-4">
                {options.map((option, index) => (
                  <label
                    key={index}
                    className={`block p-2 rounded mt-2 ${
                      selectedOptions[currentQuestionIndex] === index
                        ? "bg-gray-600"
                        : "bg-gray-700 hover:bg-gray-800"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question${currentQuestionIndex}`}
                      className="mr-2"
                      checked={selectedOptions[currentQuestionIndex] === index}
                      onChange={() => handleOptionChange(index)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-center space-x-2 items-center mt-6">
              <button
                onClick={handlePrevious}
                className="bg-gray-700 text-white py-2 px-4 rounded"
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="bg-gray-700 py-2 px-4 rounded"
                disabled={selectedOptions[currentQuestionIndex] === undefined}
              >
                Next
              </button>
            </div>
            {isFinished && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleFinish}
                  className="bg-green-600 text-white py-2 px-8 rounded font-bold"
                >
                  Finish
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
