import { FC, useState, useRef, ChangeEvent } from "react";
import { ImageUploadIcon } from "./ImageUploadIcon";
import ImageUpload from "@lib/utils/ImageUpload";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

interface CustomSingleFileInputProps {
  onChange: (file: File | null | string) => void;
  theme: string;
}

export const CustomSingleFileInput: FC<CustomSingleFileInputProps> = ({
  onChange,
  theme,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
    onChange(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const imgUrl = await ImageUpload(file);
      if (!imgUrl) {
        setLoading(false);
        toast.error("Image upload failed");
        return;
      }
      setLoading(false);
      onChange(imgUrl);
    } else {
      setLoading(false);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    onChange(null);
  };

  return (
    <div
      className={`lg:h-80 border-dashed border-2 p-8 rounded-lg text-center ${
        isDragging
          ? `bg-blue-100 border-blue-500`
          : theme === "light"
          ? "bg-gray-100 border-gray-200"
          : "bg-gray-800 border-gray-700"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {selectedFile ? (
        <div className="mt-4 lg:mt-0 relative">
          <div className="bg-white p-2 h-52 rounded-lg shadow-lg mb-2 ">
            {selectedFile.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt={selectedFile.name}
                className="object-contain w-full h-full rounded"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-100"></div>
            )}
            <p className="truncate text-xs mt-3">{selectedFile.name}</p>
          </div>
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 rounded-lg">
              <ClipLoader color={theme === "light" ? "#000000" : "#ffffff"} />
            </div>
          )}
          <button
            className="mt-4 bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClearFile}
            type="button"
          >
            Clear File
          </button>
        </div>
      ) : (
        <div className="lg:mt-16">
          <div className="flex justify-center">
            <ImageUploadIcon />
          </div>
          <p className="text-sm text-gray-400 my-2">
            Drag and drop an image here, or click to upload
          </p>
          <button
            type="button"
            className="bg-zinc-200 text-blue-600 text-sm font-semibold py-2 px-4 rounded"
            onClick={handleButtonClick}
          >
            Upload Image
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <p className="text-xs leading-5 p-1 text-gray-400">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      )}
    </div>
  );
};
