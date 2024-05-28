import { FC, useState, useRef, ChangeEvent } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { VideoUploadIcon } from "./VideoUploadIcon ";
import toast from "react-hot-toast";
import { getPlaybackId, getUploadUrl } from "@lib/utility/VideoUpload";
import * as UpChunk from "@mux/upchunk";
import MuxPlayer from '@mux/mux-player-react';

interface CustomVideoFileInputProps {
  onChange: (file: File | null | string) => void;
  theme: string;
}

export const CustomVideoFileInput: FC<CustomVideoFileInputProps> = ({
  onChange,
  theme,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [playbackId, setPlaybackId] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setLoading(true);
    setSelectedFile(file);

    if (file) {
      const videoUrl = await getUploadUrl();
      if (!videoUrl) {
        setLoading(false);
        toast.error("Video upload failed");
        return;
      }
      const upload = UpChunk.createUpload({
        endpoint: videoUrl.data.url,
        file: file,
        chunkSize: 5120,
      });
      upload.on("error", (err) => {
        console.error("💥", err.detail);
        toast.error("Upload error");
        setLoading(false);
      });
      upload.on("progress", (progress) => {
        setUploadProgress(Math.floor(progress.detail));
        console.log("Uploaded", progress.detail, "percent of this file.");
      });
      upload.on("success", async (err) => {
        console.log("Wrap it up, we're done here. 👋", err);
        const response = await getPlaybackId(videoUrl.data.id);
        console.log("🚀 ~ file: CustomVideoFileInput.tsx:52 ~ upload.on ~ response:", response.data.playbackId)
        const playbackId = response.data.playbackId;
        onChange(playbackId);
        setPlaybackId(playbackId);
        setLoading(false);
      });
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
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
          <MuxPlayer
            playbackId={playbackId}
            streamType="on-demand"
            autoPlay
            className="w-full h-full"
          />
          {loading && (
            <div className="absolute inset-0 flex flex-col justify-center mt-32 items-center bg-opacity-50 rounded-lg">
              <ClipLoader  color={theme === "light" ? "#000000" : "#ffffff"} />
              <p className="text-white mt-2">{uploadProgress}%</p>
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
            <VideoUploadIcon />
          </div>
          <p className="text-sm text-gray-400 my-2">
            Drag and drop a video file here, or click to upload
          </p>
          <button
            type="button"
            className="bg-zinc-200 text-blue-600 text-sm font-semibold py-2 px-4 rounded"
            onClick={handleButtonClick}
          >
            Upload Video
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/*"
            className="hidden"
          />
          <p className="text-xs leading-5 p-1 text-gray-400">
            Video up to 500MB
          </p>
        </div>
      )}
    </div>
  );
};
