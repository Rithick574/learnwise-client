import { resetPasswordAction } from "@/redux/actions/user/userActions";
import { AppDispatch } from "@/redux/store";
import { FC, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import PasswordInputWithIcon from "./PasswordInputWithIcon";
import { AiOutlineLock } from "react-icons/ai";
import { useTheme } from "../ui/theme-provider";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const ResetPasswordEditProfile: FC<{ closeToggle: () => void }> = ({
  closeToggle,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const formikRef = useRef(null);
  const [error, setError] = useState<string>("");

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      )
      .notOneOf([Yup.ref('currentPassword')], "New password cannot be the same as the current password"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response: any = await dispatch(
        resetPasswordAction({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        })
      );
      console.log("🚀 ~ file: ResetPasswordEditProfile.tsx:63 ~ handleSubmit ~ response:", response)
      if (response?.error && response?.error?.message) {
        throw new Error(response?.payload);
      }
      if (!response.payload || !response.payload.success) {
        throw new Error("Something went wrong!");
      }
      setError("");
      toast.success("Password updated successfully!");
      closeToggle();
    } catch (error: any) {
      setError(error.message || "Something went wrong, Try again!");
    }
  };

  return (
    <div
      className={`mx-auto max-w-sm my-auto p-8 rounded-lg shadow-md ${theme === "light" ? "bg-gray-100" : "bg-gray-800"}`}
    >
      <h2 className="font-bold text-2xl mb-2">
        Reset your <span className="text-green-500">password</span>?
      </h2>
      <h2 className="font-light text-lg mb-6">
        Don't worry, we're here to help you!
      </h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        innerRef={formikRef}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} >
            <div className="flex flex-col items-center">
              <PasswordInputWithIcon
                name="currentPassword"
                title="Current Password"
                placeholder="Enter your password"
                icon={<AiOutlineLock />}
                as="password"
                theme={theme}
              />
              <PasswordInputWithIcon
                name="newPassword"
                title="New Password"
                placeholder="Enter your new password"
                icon={<AiOutlineLock />}
                as="password"
                theme={theme}
              />
              <PasswordInputWithIcon
                name="confirmPassword"
                title="Confirm Password"
                placeholder="Confirm your new password"
                icon={<AiOutlineLock />}
                as="password"
                theme={theme}
              />
            </div>
            {error && <p className="text-start text-red-500 my-1">{error}</p>}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                onClick={closeToggle}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordEditProfile;
