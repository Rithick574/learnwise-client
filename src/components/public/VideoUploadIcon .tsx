import {FC} from "react";
import { BsCameraVideo } from "react-icons/bs";

export const VideoUploadIcon:FC = () => {
  return (
    <span className="text-lg bg-blue-700 text-white p-3 rounded-lg">
      <BsCameraVideo />
    </span>
  );
};

