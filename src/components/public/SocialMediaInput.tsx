import { FC } from 'react';
import { Field, ErrorMessage } from 'formik';

interface SocialMediaInputProps {
  title: string;
  name: string;
  icon: React.ReactNode;
  placeholder: string;
  theme: string;
  value?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
}

export const SocialMediaInput: FC<SocialMediaInputProps> = ({
  title,
  name,
  icon,
  placeholder,
  theme,
}) => {
  return (
    <div className="relative mt-4 mb-4">
      <label htmlFor={name} className="block text-sm font-medium mb-2">
        {title}
      </label>
      <div className="relative flex items-center">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {icon}
        </div>
        <Field
          id={name}
          className={`form-input w-full pl-10 py-2 ${
            theme === 'light' ? 'bg-white' : 'bg-gray-900'
          } rounded-md border shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
          name={name}
          type="text"
          placeholder={placeholder}
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
