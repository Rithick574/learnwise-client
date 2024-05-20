import { FC, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { TbCategory2 } from "react-icons/tb";
import { useTheme } from "../ui/theme-provider";
import InputWithIcon from "../auth/InputWithIcon";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CustomSingleFileInput } from "../public/CustomSingleFileInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createCategories } from "@/redux/actions/admin/categoriesAction";
import toast from "react-hot-toast";

interface AddCategoryProps {
  closeToggle: () => void;
}

export const AddCategory: FC<AddCategoryProps> = ({ closeToggle }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();

  const validationSchema = Yup.object({
    categoryName: Yup.string()
      .required("Category Name is required")
      .test(
        "is-not-number",
        "Category should not be a number or empty",
        (value) => isNaN(Number(value))
      ),
  });

  const initialValues = {
    categoryName: "",
    profile: {
      avatar: "",
    },
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const formData = new FormData();
    formData.append("title", values.categoryName);
    formData.append("thumbnail", values.profile.avatar);
    const respose = await dispatch(createCategories(formData));
    console.log(
      "🚀 ~ file: AddCategory.tsx:41 ~ handleSubmit ~ respose:",
      respose
    );
    if (respose.payload.success) {
      toast.success("category added");
      closeToggle();
    } else if (!respose.payload.success) {
      toast.error(respose.payload.message);
    }
  };

  return (
    <div
      className={`${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      } w-1/2 shadow-2xl overflow-y-auto h-screen lg:h-auto rounded-lg`}
    >
      <div
        className={`${
          theme === "light" ? "bg-white" : "bg-gray-800"
        } pt-5 pb-3 px-5 flex items-center justify-between`}
      >
        <h1 className="font-bold text-lg ">Add Category</h1>
        <AiOutlineClose
          className="text-xl cursor-pointer"
          onClick={closeToggle}
        />
      </div>
      <div className="p-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="flex-row w-[80%] mx-auto ">
                <CustomSingleFileInput
                  onChange={(file) => {
                    setFieldValue("profile.avatar", file);
                  }}
                  theme={theme}
                />
                <div className="lg:grid grid-cols-2 gap-3 items-center">
                  <InputWithIcon
                    icon={<TbCategory2 />}
                    title="Category Name"
                    name="categoryName"
                    placeholder="Enter Category Name"
                    as="text"
                    theme={theme}
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-lg text-sm p-2 mt-7"
                    disabled={isSubmitting}
                  >
                    Add Category
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
