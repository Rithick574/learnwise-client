import {FC} from "react";
import { BsFileEarmarkPdf } from "react-icons/bs";


export const PdfUploadIcon:FC = () => {
  return (
    <span className="text-lg bg-blue-700 text-white p-3 rounded-lg">
      <BsFileEarmarkPdf />
    </span>
  );
};

