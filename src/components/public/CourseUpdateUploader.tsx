import { ChangeEvent, FC, useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';
import ClipLoader from 'react-spinners/ClipLoader';
import { AiOutlineClose } from 'react-icons/ai';
import videoUpload from '@lib/utility/videoUploadCloudinay';
import toast from 'react-hot-toast';
import { VideoUploadIcon } from './VideoUploadIcon ';

interface CustomVideoFileInputProps {
    onChange: (fileUrl: string | null) => void;
    value?: string | null;
    theme: string;
}

export const CourseUpdateUploader: FC<CustomVideoFileInputProps> = ({ onChange, value, theme }) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(value || null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (value) {
            setVideoUrl(value);
        }
    }, [value]);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleClearFile = () => {
        setVideoUrl(null);
        onChange(null);
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setUploading(true);
            setProgress(0);
            try {
                const url = await videoUpload(file, (progress) => {
                    setProgress(progress);
                });
                if (url) {
                    setVideoUrl(url);
                    onChange(url);
                } else {
                    toast.error('Upload failed. Unsupported file format.');
                }
            } catch (error) {
                console.error('Error uploading video:', error);
                toast.error('An error occurred during upload.');
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <div className={`lg:h-80 lg:w-80 border-dashed border-2 rounded-lg text-center ${theme === "light" ? "bg-gray-100 border-gray-200" : "bg-gray-800 border-gray-700"}`}>
            {uploading ? (
                <div className="relative h-full w-full flex flex-col justify-center items-center">
                    <ClipLoader color={theme === "light" ? "#000000" : "#ffffff"} size={50} loading={uploading} />
                    <p className="text-white mt-2">{progress}%</p>
                </div>
            ) : videoUrl ? (
                <div className="relative h-full w-full">
                    <ReactPlayer url={videoUrl || ""} controls width="100%" height="100%" />
                    <button 
                        className="absolute top-2 right-2 bg-gray-700 text-white rounded-full p-1"
                        onClick={handleClearFile} 
                        type="button"
                        aria-label="Clear File"
                    >
                        <AiOutlineClose className="text-white" />
                    </button>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center h-full w-full">
                    <div className="flex justify-center">
                        <VideoUploadIcon />
                    </div>
                    <p className="text-sm text-gray-400 my-2">Drag and drop a video file here, or click to upload</p>
                    <button type="button" className="bg-zinc-200 text-blue-600 text-sm font-semibold py-2 px-4 rounded" onClick={handleButtonClick}>
                        Upload Video
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="video/*" className="hidden" disabled={uploading} />
                    <p className="text-xs leading-5 p-1 text-gray-400">Video up to 500MB</p>
                </div>
            )}
        </div>
    );
};

export default CourseUpdateUploader;
