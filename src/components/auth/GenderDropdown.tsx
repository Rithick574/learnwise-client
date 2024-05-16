import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface GenderDropdownProps {
  name: string;
  theme: string;
}

export const GenderDropdown: React.FC<GenderDropdownProps> = ({ name, theme }) => {
  return (
    <div className="relative mt-4 mb-4">
      <label htmlFor={name} className="block text-sm font-medium mb-2">Gender</label>
      <div className="relative">
        <Field
          as="select"
          id={name}
          name={name}
          className={`form-select w-full pl-3 pr-10 py-2 ${theme === 'light' ? "bg-white" : "bg-gray-900"} rounded-md border shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Field>
      </div>
      <ErrorMessage
        className="text-sm text-red-500 mt-1"
        name={name}
        component="span"
      />
    </div>
  );
};
