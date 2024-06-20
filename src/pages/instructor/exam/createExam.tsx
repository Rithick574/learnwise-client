import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsCaretRightFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { URL } from "@/Common/api";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { appJson } from "@/Common/configurations";

const CreateExam: FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [questions, setQuestions] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const res = await axios.get(`${URL}/course/exam/${courseId}`,appJson);
        if (res.data.data.exams) {
          const formattedQuestions = res.data.data.exams.map((q: any) => ({
            question: q.question,
            option1: q.options.option1,
            option2: q.options.option2,
            option3: q.options.option3,
            option4: q.options.option4,
            correctOption: q.correctOption,
          }));
          setQuestions(formattedQuestions);
        }
      } catch (error) {
        console.error(error);
        // toast.error("please add exams");
      }
    };
    if (courseId) {
      fetchExamData();
    }
  }, [courseId]);

  const formik = useFormik({
    initialValues: {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctOption: "option1",
    },
    validationSchema: Yup.object({
      question: Yup.string().required("Question is required"),
      option1: Yup.string().required("Option 1 is required"),
      option2: Yup.string().required("Option 2 is required"),
      option3: Yup.string().required("Option 3 is required"),
      option4: Yup.string().required("Option 4 is required"),
    }),
    onSubmit: (values) => {
      if (editIndex !== null) {
        const updatedQuestions = questions.map((q, index) =>
          index === editIndex ? values : q
        );
        setQuestions(updatedQuestions);
        setEditIndex(null);
      } else {
        setQuestions([...questions, values]);
      }
      formik.resetForm();
    },
  });

  const editQuestion = (index: number) => {
    formik.setValues(questions[index]);
    setEditIndex(index);
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const submitExam = async () => {
    if (questions.length === 0) {
      toast.error("Please add at least one question");
      return;
    }
    try {
      const res = await axios.post(`${URL}/course/exam/${courseId}`, questions,appJson);
      console.log(res.data);
      toast.success("Exam created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error creating exam");
    }
  };

  return (
    <div className="p-5 w-full overflow-y-auto text-sm">
      <div className="flex justify-between items-center font-semibold">
        <div>
          <h1 className="font-bold mt-4 text-2xl">Exams</h1>
          <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
            <p className="text-green-500 font-semibold">Instructor</p>
            <span>
              <BsCaretRightFill />
            </span>
            <p className="font-semibold">Create Exams</p>
          </div>
        </div>
        <div className="flex gap-3 p-[6px] cursor-pointer bg-blue-600 rounded-lg">
          <button
            onClick={submitExam}
            className="admin-button-fl rounded-lg text-white"
          >
            Create Exam
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Question:</label>
            <textarea
              name="question"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.question}
              className="w-full p-4 border rounded-lg bg-gray-900"
              rows={4}
            />
            {formik.touched.question && formik.errors.question ? (
              <div className="text-red-500 text-sm">
                {formik.errors.question}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Option 1:</label>
            <input
              type="text"
              name="option1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.option1}
              className="w-full p-2 border rounded-lg bg-gray-900"
            />
            {formik.touched.option1 && formik.errors.option1 ? (
              <div className="text-red-500 text-sm">
                {formik.errors.option1}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Option 2:</label>
            <input
              type="text"
              name="option2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.option2}
              className="w-full p-2 border rounded-lg bg-gray-900"
            />
            {formik.touched.option2 && formik.errors.option2 ? (
              <div className="text-red-500 text-sm">
                {formik.errors.option2}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Option 3:</label>
            <input
              type="text"
              name="option3"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.option3}
              className="w-full p-2 border rounded-lg bg-gray-900"
            />
            {formik.touched.option3 && formik.errors.option3 ? (
              <div className="text-red-500 text-sm">
                {formik.errors.option3}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Option 4:</label>
            <input
              type="text"
              name="option4"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.option4}
              className="w-full p-2 border rounded-lg bg-gray-900"
            />
            {formik.touched.option4 && formik.errors.option4 ? (
              <div className="text-red-500 text-sm">
                {formik.errors.option4}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Correct Option:
            </label>
            <select
              name="correctOption"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.correctOption}
              className="w-full p-2 border rounded-lg bg-gray-900"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </select>
          </div>
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg "
            >
              {editIndex !== null ? "Save Question" : "Add Question"}
            </button>
          </div>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Questions Preview</h2>
          <ul className="list-disc pl-5">
            {questions.map((q, index) => (
              <li key={index} className="mb-2 border rounded-lg p-6 mt-2 ">
                <strong>Question {index + 1}:</strong> {q.question} <br />
                <strong>Options:</strong>
                <ul className="list-none pl-4">
                  <li>A. {q.option1}</li>
                  <li>B. {q.option2}</li>
                  <li>C. {q.option3}</li>
                  <li>D. {q.option4}</li>
                </ul>
                <strong>Correct Option:</strong> {q[q.correctOption]} <br />
                <button onClick={() => editQuestion(index)} className="pe-4">
                  <AiFillEdit className="text-2xl rounded mt-2" />
                </button>
                <button onClick={() => deleteQuestion(index)}>
                  <AiFillDelete className="text-2xl rounded mt-2" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
