import {FC} from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";


export const ImageUploadIcon:FC = () => {
  return (
    <span className="text-lg bg-blue-700 text-white p-3 rounded-lg">
      <AiOutlineCloudUpload />
    </span>
  );
};

