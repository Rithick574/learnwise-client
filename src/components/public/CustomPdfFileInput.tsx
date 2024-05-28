import { FC, useState, useRef, ChangeEvent } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { PdfUploadIcon } from "./PdfUploadIcon";
import toast from "react-hot-toast";
import { PdfUpload } from "@lib/utility/PdfUpload";

interface CustomPdfFileInputProps {
  onChange: (file: File | null | string) => void;
  theme: string;
}

export const CustomPdfFileInput: FC<CustomPdfFileInputProps> = ({
  onChange,
  theme,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0];
      setLoading(true);
      setSelectedFile(file);
  
    if (file) {
      const pdfurl = await PdfUpload(file);
      if (!pdfurl) {
        setLoading(false);
        toast.error("PDF upload failed");
        return;
      }
      setPdfUrl(pdfurl);
      onChange(pdfurl);
    }
    setLoading(false);  
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setPdfUrl(null);
    onChange(null);
  };

  return (
    <div
      className={`lg:h-80 border-dashed border-2 rounded-lg text-center ${
        theme === "light"
          ? "bg-gray-100 border-gray-200"
          : "bg-gray-800 border-gray-700"
      }`}
    >
      {selectedFile ? (
        <div className="mt-4 lg:h-80 lg:mt-0 relative">
          <iframe
            src={pdfUrl || ""}
            className="w-full h-full "
          />
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 rounded-lg">
              <ClipLoader color={theme === "light" ? "#000000" : "#ffffff"} />
            </div>
          )}
          <button
            className="z-50 mt-4 bg-gray-700 text-white font-bold py-1 px-2 rounded"
            onClick={handleClearFile}
            type="button"
          >
            Clear File
          </button>
        </div>
      ) : (
        <div className="lg:mt-24">
          <div className="flex justify-center">
            <PdfUploadIcon />
          </div>
          <p className="text-sm text-gray-400 my-2">
            Drag and drop a PDF file here, or click to upload
          </p>
          <button
            type="button"
            className="bg-zinc-200 text-blue-600 text-sm font-semibold py-2 px-4 rounded"
            onClick={handleButtonClick}
          >
            Upload PDF
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="application/pdf"
            className="hidden"
          />
          <p className="text-xs leading-5 p-1 text-gray-400">PDF up to 10MB</p>
        </div>
      )}
    </div>
  );
};
