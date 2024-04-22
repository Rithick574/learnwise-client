import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { InputWithIconProps } from "@/interface/IUserLogin";

const PasswordInputWithIcon: React.FC<InputWithIconProps> = ({
  title,
  name,
  icon,
  placeholder,
  as,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <p>
        <label htmlFor="username">{title}</label>
      </p>
      <div className="flex items-center">
        <div className="bg-gray-900  border border-white rounded flex items-center gap-3">
          <div className="ml-2 sign-up-icon">{icon}</div>
          <Field
            className="sign-up-input bg-gray-900  w-80 py-2 rounded"
            name={name}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            disabled={as || false}
          />

          <div className="sign-up-icon-rev mr-2" onClick={togglePassword}>
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </div>
        </div>
      </div>
      <ErrorMessage
        className="text-sm text-red-500"
        name={name}
        component="span"
      />
    </div>
  );
};

export default PasswordInputWithIcon;
