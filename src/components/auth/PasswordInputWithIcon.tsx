import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { InputWithIconProps } from "@/interface/IUserLogin";

const PasswordInputWithIcon: React.FC<InputWithIconProps> = ({
  title,
  name,
  icon,
  placeholder,
  theme
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative mt-4 mb-4">
      <label htmlFor={name} className="block text-sm font-medium mb-2">{title}</label>
      <div className="flex items-center relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">{icon}</div>}
        <Field
          className={`form-input w-full pl-10 pr-12 ${theme === 'light' ? "bg-white" : "bg-gray-900"} py-2 rounded-md border shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
          id={name}
          name={name}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={togglePassword}>
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </div>
      </div>
      <ErrorMessage
        className="text-sm text-red-500 mt-1"
        name={name}
        component="span"
      />
    </div>
  );
};

export default PasswordInputWithIcon;
