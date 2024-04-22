import {InputWithIconProps} from "@/interface/IUserLogin"
import { Field, ErrorMessage } from "formik";

const InputWithIcon: React.FC<InputWithIconProps> = ({ title, name, icon, placeholder, as }) => {
  return (
    <div>
      <p>
        <label htmlFor="username">{title}</label>
      </p>
      <div className="flex items-center">
        
        <div className="bg-gray-900  border border-white rounded flex items-center gap-3">
        
        <div className="ml-2 sign-up-icon">{icon}</div>
        <Field
        className="sign-up-input bg-gray-900  w-[22rem] py-2 rounded"
        name={name}
        type={as}
        placeholder={placeholder}
      />
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

export default InputWithIcon;
