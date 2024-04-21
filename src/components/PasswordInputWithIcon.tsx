import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {InputWithIconProps} from "@/interface/IUserLogin"


const PasswordInputWithIcon: React.FC<InputWithIconProps> = ({ title, name, icon, placeholder, as }) => {
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
        <div className="sign-up-icon">{icon}</div>
        <Field
          className="sign-up-input-y w-full"
          name={name}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          disabled={as || false}
        />
        <div className="sign-up-icon-rev" onClick={togglePassword}>
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
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
