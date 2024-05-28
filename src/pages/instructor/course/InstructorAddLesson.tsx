import { useState, FC, ChangeEvent } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import {
  AiOutlineDelete,
  AiOutlineMenu,
  AiOutlinePlus,
} from "react-icons/ai";
import toast from "react-hot-toast";
import { MdOutlinePlayLesson, MdOutlineDescription } from "react-icons/md";
import { useTheme } from "@/components/ui/theme-provider";
import { useNavigate } from "react-router-dom";
import {
  clearStoredCourseData,
  setStoredCourseData,
  getStoredCourseData,
} from "@lib/utility/localStorage";
import { CourseUploader } from "@/components/public/CourseUploader";
import { createCourse } from "@/redux/actions/instructor/courseAction";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {transformCourseData} from "@lib/validations/TransformCourseData"




type SubLesson = {
  title: string;
  videoUrl: string | null;
  description: string;
};

type Section = {
  title: string;
  subLessons: SubLesson[];
};

const InstructorAddLesson: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [sections, setSections] = useState<Section[]>([{ title: "", subLessons: [] }]);

  const handleAddSection = () => {
    const newSection: Section = { title: "", subLessons: [] };
    setSections([...sections, newSection]);
  };

  const handleAddLecture = (sectionIndex: number) => {
    const updatedSections = [...sections];
    const newSubLesson: SubLesson = {
      title: `Lecture ${updatedSections[sectionIndex].subLessons.length + 1}`,
      videoUrl: null,
      description: "",
    };
    updatedSections[sectionIndex].subLessons.push(newSubLesson);
    setSections(updatedSections);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>, sectionIndex: number, subLessonIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].subLessons[subLessonIndex].title = e.target.value;
    setSections(updatedSections);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>, sectionIndex: number, subLessonIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].subLessons[subLessonIndex].description = e.target.value;
    setSections(updatedSections);
  };

  const handleDeleteLastLecture = (sectionIndex: number) => {
    const updatedSections = [...sections];
    if (updatedSections[sectionIndex].subLessons.length > 0) {
      updatedSections[sectionIndex].subLessons.pop();
      setSections(updatedSections);
    } else {
      updatedSections.splice(sectionIndex, 1);
    }
    setSections(updatedSections);
  };

  const handleSectionNameChange = (e: ChangeEvent<HTMLInputElement>, sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].title = e.target.value;
    setSections(updatedSections);
  };

  const handleVideoChange = (fileUrl: string | null, sectionIndex: number, subLessonIndex: number) => {
    if (fileUrl) {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].subLessons[subLessonIndex].videoUrl = fileUrl;
        setSections(updatedSections);
    }
};


  const handleCourseUpload = async () => {
    setStoredCourseData(sections);
    let isValid = true;
    sections.forEach((section) => {
      if (!section.title) {
        toast.error("Section name is required");
        isValid = false;
      }
      section.subLessons.forEach((subLesson) => {
        if (!subLesson.title) {
          toast.error("Lecture title is required");
          isValid = false;
        }
        if (!subLesson.videoUrl) {
          toast.error("Video is required for each lecture");
          isValid = false;
        }
      });
    });

    if (isValid) {
      const storedData = getStoredCourseData();
      const fullCourseData = { ...storedData, sections };
      const structuredCourseData = transformCourseData(fullCourseData,user._id);
      if(structuredCourseData){
        try {
          const response =await dispatch(createCourse(structuredCourseData));
          if (response.meta.requestStatus === "fulfilled") {
            console.log("Uploaded sections:", sections);
            toast.success("Course uploaded");
            clearStoredCourseData();
            navigate("/instructor/courses");
          } else {
            toast.error("Failed to upload the course");
          }
        } catch (error) {
          console.error("Error uploading the course:", error);
          toast.error("An error occurred while uploading the course");
        }
      }else{
        toast.error("error while creating the course")
      }
    }
  };

  return (
    <div className="p-5 w-full overflow-y-auto text-sm">
      <div className="flex justify-between items-center font-semibold">
        <div>
          <h1 className="font-bold mt-4 text-2xl">Create Course</h1>
          <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
            <p className="text-green-500 font-semibold">My Course</p>
            <span><BsCaretRightFill /></span>
            <p className="font-semibold">Create Course</p>
            <span><BsCaretRightFill /></span>
            <p className="font-semibold">Add Trailer</p>
            <span><BsCaretRightFill /></span>
            <p className="font-semibold">Add Lessons</p>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-end -mt-10">
        <button
          type="button"
          className="p-2 bg-blue-600 mt-6 rounded-md"
          onClick={handleCourseUpload}
        >
          Create Course
        </button>
      </div>
      {sections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="flex flex-col border rounded-lg mt-10"
        >
          <div className="flex justify-between">
            <div className="pt-6 flex space-x-4">
              <span className="ps-10 flex items-center">
                <MdOutlinePlayLesson /> Lesson {sectionIndex + 1}:
              </span>
              <input
                type="text"
                value={section.title}
                onChange={(e) => handleSectionNameChange(e, sectionIndex)}
                placeholder="Enter Lesson name"
                required
                className={`border rounded-md p-2 mb-2 ${
                  theme === "light" ? "bg-white" : "bg-gray-900"
                } `}
              />
            </div>
            <div className="flex pt-6 px-10 space-x-5">
              <AiOutlinePlus
                className="text-xl cursor-pointer"
                onClick={() => handleAddLecture(sectionIndex)}
              />
              <AiOutlineDelete
                className="text-xl cursor-pointer"
                onClick={() => handleDeleteLastLecture(sectionIndex)}
              />
            </div>
          </div>
          <div className="border p-5">
            {section.subLessons.map((lecture, lectureIndex) => (
              <div
                key={lectureIndex}
                className="ps-10 p-4 flex flex-col space-y-4"
              >
                <div className="flex space-x-8">
                  <div className="flex flex-col gap-6 w-[70%]">
                    <div className="w-full flex justify-center items-center gap-3">
                      <AiOutlineMenu />
                      <input
                        type="text"
                        value={lecture.title}
                        onChange={(e) => handleTitleChange(e, sectionIndex, lectureIndex)}
                        placeholder="Enter title"
                        required
                        className={`border rounded-md p-2 flex-1 w-full ${
                          theme === "light" ? "bg-white" : "bg-gray-900"
                        } `}
                      />
                    </div>
                    <div className="w-full flex gap-3">
                      <MdOutlineDescription className="mt-3" />
                      <textarea
                        value={lecture.description}
                        onChange={(e) => handleDescriptionChange(e, sectionIndex, lectureIndex)}
                        placeholder="Enter description"
                        className={`border rounded-md p-2 flex-1 w-full h-64 ${
                          theme === "light" ? "bg-white" : "bg-gray-900"
                        } `}
                      />
                    </div>
                  </div>
                  <CourseUploader
                    onChange={(fileurl) => handleVideoChange(fileurl, sectionIndex, lectureIndex)}
                    theme={theme}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <button
          type="button"
          className={`p-2 mt-8 ${
            theme === "light" ? "bg-gray-200" : "bg-gray-900"
          }  w-full rounded-md`}
          onClick={handleAddSection}
        >
          Add Lesson
        </button>
      </div>
    </div>
  );
};

export default InstructorAddLesson;
