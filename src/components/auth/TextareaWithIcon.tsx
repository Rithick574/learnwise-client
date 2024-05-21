import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { InputWithIconProps } from "@/types/IUserLogin";

const TextareaWithIcon: React.FC<InputWithIconProps> = ({
  title,
  name,
  icon,
  placeholder,
  theme,
}) => {
  return (
    <div className="relative mt-4 mb-4">
      <label htmlFor={name} className="block text-sm font-medium mb-2">{title}</label>
      <div className="relative flex items-start">
        <div className="absolute left-3 top-3 text-gray-500">
          {icon}
        </div>
        <Field
          id={name}
          as="textarea"
          className={`form-input w-full pl-10 pt-2 ${theme === 'light' ? "bg-white" : "bg-gray-900"} rounded-md border shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
          name={name}
          placeholder={placeholder}
          rows="5"
        />
      </div>
      <ErrorMessage
        className="text-sm text-red-500 mt-1"
        name={name}
        component="span"
      />
    </div>
  );
};

export default TextareaWithIcon;
