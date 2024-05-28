import InputWithIcon from "@/components/auth/InputWithIcon";
import { useTheme } from "@/components/ui/theme-provider";
import { Formik, Form, Field } from "formik";
import { FC, useEffect } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import * as Yup from "yup";
import { MdOutlineSubtitles, MdOutlineDescription } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAllAvailableCatgories } from "@/redux/actions/admin/categoriesAction";
import { CustomSingleFileInput } from "@/components/public/CustomSingleFileInput";
import { CustomPdfFileInput } from "@/components/public/CustomPdfFileInput";
import TextareaWithIcon from "@/components/auth/TextareaWithIcon";
import { useNavigate } from "react-router-dom";
import { getStoredCourseData, setStoredCourseData } from "@lib/utility/localStorage";

interface CourseValues {
  courseTitle: string;
  description: string;
  category: string;
  courseThumbnail: File | null;
  certification: boolean;
  pricingType: "free" | "paid";
  resources: File | null;
}

export const InstructorAddCourse: FC = () => {
  const { availableCategories } = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllAvailableCatgories());
  }, [dispatch]);

  const initialValues: CourseValues = {
    courseTitle: "",
    description: "",
    category: "",
    courseThumbnail: null,
    pricingType: "free",
    resources: null,
    ...getStoredCourseData(),
  };

  const handleSubmit = async (values: CourseValues) => {
    try {
      console.log("🚀 ~ handleSubmit ~ values:", values);
      setStoredCourseData(values);
      navigate("/instructor/courses/uploadtrailer");
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  const validationSchema = Yup.object().shape({
    courseTitle: Yup.string().required("Course title is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
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
          </div>
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, values }) => (
          <Form className="w-full">
            <div className="p-5 shadow-md rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block ${theme === "light" ? "text-gray-700" : "text-white"}`}>
                    Course Thumbnail
                  </label>
                  <CustomSingleFileInput
                    onChange={(file) => {
                      setFieldValue("courseThumbnail", file);
                    }}
                    theme={theme}
                  />
                </div>
                <div>
                  <label className={`block ${theme === "light" ? "text-gray-700" : "text-white"}`}>
                    Resources
                  </label>
                  <CustomPdfFileInput
                    onChange={(file) => {
                      setFieldValue("resources", file);
                    }}
                    theme={theme}
                  />
                  <div className="flex items-center mt-2">
                    <Field type="checkbox" id="resources" name="resources" className="mr-2" />
                    <label htmlFor="resources" className={`${theme === "light" ? "text-gray-500" : "text-white"}`}>
                      Material available
                    </label>
                  </div>
                </div>
              </div>
              <InputWithIcon
                name="courseTitle"
                title="Course Title"
                placeholder="Enter course title"
                icon={<MdOutlineSubtitles />}
                as="text"
                theme={theme}
              />
              <TextareaWithIcon
                name="description"
                title="Description"
                placeholder="Enter course description"
                icon={<MdOutlineDescription />}
                theme={theme}
                as="textarea"
              />
              <div className="relative mt-4 mb-4">
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Category
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <TbCategory />
                  </div>
                  <Field
                    as="select"
                    id="category"
                    name="category"
                    className={`form-input w-full pl-10 py-2 ${
                      theme === "light" ? "bg-white" : "bg-gray-900"
                    } rounded-md border shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
                  >
                    <option value="">Select a category</option>
                    {availableCategories?.map((category: any) => (
                      <option key={category._id} value={category._id}>
                        {category.title}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
              <div className="mt-4">
                <label className={`block ${theme === "light" ? "text-gray-700" : "text-white"}`}>
                  Pricing
                </label>
                <div className="flex gap-4 mt-2">
                  <button
                    type="button"
                    className={`border rounded-md py-2 px-4 ${
                      values.pricingType === "free" ? "bg-blue-600 text-white" : ""
                    }`}
                    onClick={() => setFieldValue("pricingType", "free")}
                  >
                    Free
                  </button>
                  <button
                    type="button"
                    className={`border rounded-md py-2 px-4 ${
                      values.pricingType === "paid" ? "bg-blue-600 text-white" : ""
                    }`}
                    onClick={() => setFieldValue("pricingType", "paid")}
                  >
                    Paid
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md">
                Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
