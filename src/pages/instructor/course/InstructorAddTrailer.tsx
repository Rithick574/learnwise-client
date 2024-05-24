import { CustomVideoFileInput } from "@/components/public/CustomVideoFileInput";
import { useTheme } from "@/components/ui/theme-provider";
import { Formik, Form, FieldArray, Field, useFormikContext } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import { BsCaretRightFill } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import InputWithIcon from "@/components/auth/InputWithIcon";
import { IoPricetagsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const InstructorAddTrailer: FC = () => {
  const { theme } = useTheme();
  const initialValues = {
    courseTrailer: null,
    price: "",
    whatYouWillLearn: [""],
  };
  const navigate = useNavigate()
  const handleSubmit = async (values: any) => {
    console.log("🚀 ~ file: InstructorAddTrailer.tsx:15 ~ values:", values);
    navigate("/instructor/courses/addlesson")
  };
  const validationSchema = Yup.object().shape({
    price: Yup.number()
    .required("Price is required")
      .typeError("Price must be a number")
      .positive("Price must be a positive number"),
    whatYouWillLearn: Yup.array().of(
      Yup.string().required("This field is required")
    ),
  });

  return (
    <div className="p-5 w-full overflow-y-auto text-sm">
      <div className="flex justify-between items-center font-semibold">
        <div>
          <h1 className="font-bold mt-4 text-2xl">Create Course</h1>
          <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
            <p className="text-green-500 font-semibold">My Course</p>
            <span>
              <BsCaretRightFill />
            </span>
            <p className="font-semibold">Create Course</p>
            <span>
              <BsCaretRightFill />
            </span>
            <p className="font-semibold">Add Trailer</p>
          </div>
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched, values }) => (
          <Form>
             <div className="mt-4 flex justify-end">
              <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md">
                Next
              </button>
            </div>
            <div className="flex gap-4">
              <div className="w-[50%] ">
                <div>
                  <label className="block text-sm mb-2" htmlFor="video">
                    Preview Video
                  </label>
                  <CustomVideoFileInputWrapper theme={theme} />
                </div>
                <div>
                  <InputWithIcon
                    name="price"
                    title="Price"
                    placeholder="Enter price"
                    icon={<IoPricetagsOutline />}
                    as="text"
                    theme={theme}
                  />
                 
                </div>
              </div>
              <div className="w-[50%]">
                <div>
                  <h2 className="font-bold text-lg mb-4">What you'll learn</h2>
                  <FieldArray name="whatYouWillLearn">
                    {({ remove, push }) => (
                      <div>
                        {values.whatYouWillLearn.map((point, index) => (
                          <div key={index} className="flex items-center mb-2">
                            <Field
                              name={`whatYouWillLearn.${index}`}
                              className={`w-full p-2 border rounded ${
                                theme === "light"
                                  ? "bg-gray-100 border-gray-300"
                                  : "bg-gray-800 border-gray-700 text-white"
                              }`}
                            />
                            {index > 0 && (
                              <button
                                type="button"
                                className="ml-2 text-blue-600"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          className="mt-2 bg-gray-600 text-white py-1 px-4 rounded"
                          onClick={() => push("")}
                        >
                          Add Point
                        </button>
                      </div>
                    )}
                  </FieldArray>
                  {errors.whatYouWillLearn && touched.whatYouWillLearn ? (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.whatYouWillLearn}
                    </div>
                  ) : null}
                </div>
                <div className="mt-10">
                  <h2 className="font-bold text-xl mb-4">
                    Preview of What You'll Learn
                  </h2>
                  <ul className="list-disc pl-5">
                    {values.whatYouWillLearn.map((point, index) => (
                      <li key={index} className="mb-2 flex items-start">
                        <AiOutlineCheck className="mt-1 mr-2 text-green-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const CustomVideoFileInputWrapper: FC<{ theme: string }> = ({ theme }) => {
  const { setFieldValue } = useFormikContext();

  return (
    <CustomVideoFileInput
      onChange={(file) => {
        setFieldValue("courseTrailer", file);
      }}
      theme={theme}
    />
  );
};
