import { useEffect, useState, useRef, FC, ChangeEvent } from 'react';
import { BsCaretRightFill } from 'react-icons/bs';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMenu, AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { MdOutlinePlayLesson } from "react-icons/md";
import {useTheme } from '@/components/ui/theme-provider';
import { useNavigate } from 'react-router-dom';

type SubLesson = {
  title: string;
  videoUrl: string | null;
};

type Section = {
  title: string;
  subLessons: SubLesson[];
};

type UploadProgress = {
  [key: string]: boolean;
};

type VideoUrls = {
  [key: string]: string;
};

type CurrentUpload = {
  sectionIndex: number | null;
  subLessonIndex: number | null;
};

const VideoUpload = async (file: File): Promise<string> => {
  return new Promise((resolve) => setTimeout(() => resolve(URL.createObjectURL(file)), 2000));
};

const onNext = (sections: Section[]) => {
  // Handle the next step after uploading
  console.log('Next step with sections:', sections);
};

const InstructorAddLesson: FC = () => {
    const navigate = useNavigate()
    const {theme} = useTheme()
  const [sections, setSections] = useState<Section[]>([{ title: '', subLessons: [] }]);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const [videoUrls, setVideoUrls] = useState<VideoUrls>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentUpload, setCurrentUpload] = useState<CurrentUpload>({ sectionIndex: null, subLessonIndex: null });

  useEffect(() => {
    console.log('Updated sections:', sections);
  }, [sections]);

  const handleAddSection = () => {
    const newSection: Section = { title: '', subLessons: [] };
    setSections([...sections, newSection]);
  };

  const handleAddLecture = (sectionIndex: number) => {
    const updatedSections = [...sections];
    const newSubLesson: SubLesson = { title: `Lecture ${updatedSections[sectionIndex].subLessons.length + 1}`, videoUrl: null };
    updatedSections[sectionIndex].subLessons.push(newSubLesson);
    setSections(updatedSections);
  };

  const handleUploadVideo = async (file: File) => {
    if (currentUpload.sectionIndex === null || currentUpload.subLessonIndex === null) return;

    const { sectionIndex, subLessonIndex } = currentUpload;
    setUploadProgress(prev => ({ ...prev, [`${sectionIndex}_${subLessonIndex}`]: true }));
    const videoUrl = await VideoUpload(file);
    if (!videoUrl) {
      toast.error("Can't upload video");
      setUploadProgress(prev => ({ ...prev, [`${sectionIndex}_${subLessonIndex}`]: false }));
      return;
    }

    const updatedSections = [...sections];
    updatedSections[sectionIndex].subLessons[subLessonIndex].videoUrl = videoUrl;
    setSections(updatedSections);
    setVideoUrls(prev => ({ ...prev, [`${sectionIndex}_${subLessonIndex}`]: videoUrl }));
    toast.success('Video uploaded');
    setUploadProgress(prev => ({ ...prev, [`${sectionIndex}_${subLessonIndex}`]: false }));
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>, sectionIndex: number, subLessonIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].subLessons[subLessonIndex].title = e.target.value;
    setSections(updatedSections);
  };

  const handleSectionNameChange = (e: ChangeEvent<HTMLInputElement>, sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].title = e.target.value;
    setSections(updatedSections);
  };

  const handleVideoButtonClick = (sectionIndex: number, subLessonIndex: number) => {
    setCurrentUpload({ sectionIndex, subLessonIndex });
    fileInputRef.current?.click();
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleUploadVideo(file);
  };

  const handleUpload = () => {
    let isValid = true;
    sections.forEach((section) => {
      if (!section.title) {
        toast.error('Section name is required');
        isValid = false;
      }
      section.subLessons.forEach((subLesson) => {
        if (!subLesson.title) {
          toast.error('Lecture title is required');
          isValid = false;
        }
        if (!subLesson.videoUrl) {
          toast.error('Video is required for each lecture');
          isValid = false;
        }
      });
    });

    if (isValid) {
      console.log('Uploaded sections:', sections);
      toast.success("course uploaded")
      onNext(sections);
      navigate("/instructor/courses")
    }
  };

  return (
    <div className="p-5 w-full overflow-y-auto text-sm">
      <div className="flex justify-between items-center font-semibold">
        <div>
          <h1 className="font-bold mt-4 text-2xl">Create Course</h1>
          <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
            <p className="text-green-500 font-semibold">My Course</p>
            <span>
              <BsCaretRightFill />
            </span>
            <p className="font-semibold">Create Course</p>
            <span>
              <BsCaretRightFill />
            </span>
            <p className="font-semibold">Add Trailer</p>
            <span>
              <BsCaretRightFill />
            </span>
            <p className="font-semibold">Add Lessons</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-end justify-end  -mt-10">
        <button
          type="button"
          className="p-2 bg-blue-600 mt-6 rounded-md"
          onClick={handleUpload}
        >
          Create Course
        </button>
      </div>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="flex flex-col border rounded-lg mt-10">
            <div className="flex justify-between">
              <div className="pt-6 flex space-x-4">
                <span className="ps-10 flex items-center">
                  <MdOutlinePlayLesson />{" "}Lesson {sectionIndex + 1}:
                </span>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => handleSectionNameChange(e, sectionIndex)}
                  placeholder="Enter Lesson name"
                  required
                  className={`border rounded-md p-2 mb-2 ${theme === 'light' ? "bg-white" : "bg-gray-900"} `}
                />
              </div>
              <div className="flex pt-6 px-10 space-x-5">
                <AiOutlinePlus className="text-xl cursor-pointer" onClick={() => handleAddLecture(sectionIndex)} />
                <AiOutlineEdit className="text-xl cursor-pointer" />
                <AiOutlineDelete className="text-xl cursor-pointer" />
              </div>
            </div>
            <div className="border p-5">
              {section.subLessons.map((lecture, lectureIndex) => (
                <div key={lectureIndex} className="ps-10 p-4 flex items-center space-x-8">
                  <AiOutlineMenu />
                  <input
                    type="text"
                    value={lecture.title}
                    onChange={(e) => handleTitleChange(e, sectionIndex, lectureIndex)}
                    placeholder="Enter title"
                    required
                    className={`border rounded-md p-2 flex-1 ${theme === 'light' ? "bg-white" : "bg-gray-900"} `}
                  />
                  <button
                    type="button"
                    className="flex bg-gray-100 p-2 rounded-md"
                    onClick={() => handleVideoButtonClick(sectionIndex, lectureIndex)}
                  >
                    {uploadProgress[`${sectionIndex}_${lectureIndex}`] ? 'Uploading...' : 'Upload Video'}
                    <AiOutlineUpload className="ml-2 text-2xl" />
                  </button>
                  {videoUrls[`${sectionIndex}_${lectureIndex}`] && (
                    <video src={videoUrls[`${sectionIndex}_${lectureIndex}`]} controls width="200" className="rounded-md border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <button
            type="button"
            className={`p-2 mt-8 ${theme === 'light' ? "bg-gray-200" : "bg-gray-900"}  w-full rounded-md`}
            onClick={handleAddSection}
          >
            Add Lesson
          </button>
        </div>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleVideoChange}
        required
      />
    </div>
  );
};

export default InstructorAddLesson;
