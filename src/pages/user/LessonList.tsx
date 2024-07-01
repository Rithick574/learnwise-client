import { URL } from "@/Common/api";
import { Lesson } from "@/types/common";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


type CompletedLesson = {
  _id?:string;
  lessonId: string;
  subLessonId: string;
};

type LessonListProps = {
  lessons: Lesson[];
  onSubLessonClick: (videoUrl: string) => void;
  courseId: string;
  userId: string;
};

const LessonList: React.FC<LessonListProps> = ({
  lessons,
  onSubLessonClick,
  courseId,
  userId,
}) => {
  const navigate = useNavigate();
  const [expandedLessons, setExpandedLessons] = useState<boolean[]>([]);
  const [completedLessons, setCompletedLessons] = useState<CompletedLesson[]>([]);
  const [allLessonsCompleted, setAllLessonsCompleted] = useState(false);

  useEffect(() => {
    checkAllLessonsCompleted();
    console.log(allLessonsCompleted, "all lesson completed");
  }, [completedLessons, lessons]);

  const checkAllLessonsCompleted = () => {
    const totalSubLessons = lessons.flatMap(
      (lesson) => lesson.subLessons || []
    ).length;
    const completedSubLessons = completedLessons.length;
    console.log(totalSubLessons, "0000", completedLessons, "lessons list");
    setAllLessonsCompleted(totalSubLessons === completedSubLessons);
  };

  const toggleLesson = (index: number) => {
    setExpandedLessons((prev) => {
      const updatedExpandedLessons = [...prev];
      updatedExpandedLessons[index] = !prev[index];
      return updatedExpandedLessons;
    });
  };

  useEffect(() => {
    setExpandedLessons(lessons.map(() => false));
    fetchCompletedLessons();
  }, [lessons]);

  if (!lessons) return null;

  const fetchCompletedLessons = async () => {
    try {
      const response = await axios.get(`${URL}/course/enrollment`, {
        params: { userId, courseId },
      });
      console.log(response.data, "--");
      setCompletedLessons(
        response.data.data?.progress?.completedLessons || []
      );
    } catch (error) {
      console.error("Failed to fetch completed lessons", error);
    }
  };

  const handleExamClick = () => {
    navigate(`/student/exam/${courseId}`);
  };

  const handleSubLessonClick = async (lessonId: string, subLessonId: string, videoUrl: string) => {
    try {
      if (userId && courseId) {
        await axios.put(`${URL}/course/enrollment`, {
          userId,
          courseId,
          progress: {
            lessonId,
            subLessonId,
          },
        });

        setCompletedLessons((prev) => [...prev, { lessonId, subLessonId }]);
        onSubLessonClick(videoUrl);
      } else {
        console.log('User ID and Course ID not found');
      }
    } catch (error) {
      console.error('Failed to update progress', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      {lessons.map((lesson, index) => (
        <div key={index} className="mb-4 shadow-md rounded-lg">
          <div
            className="p-4 flex justify-between items-center cursor-pointer"
            onClick={() => toggleLesson(index)}
          >
            <div>
              <h2 className="text-lg font-semibold">
                {lesson.title}
              </h2>
              <p className="text-sm text-gray-500">
                {lesson.subLessons?.length} Lectures
              </p>
            </div>
            <div className="p-4">
              {expandedLessons[index] ? (
                <span className="text-xl font-bold">-</span>
              ) : (
                <span className="text-xl font-bold">+</span>
              )}
            </div>
          </div>
          <div
            className={`overflow-hidden transition-height duration-500 ease-in-out ${
              expandedLessons[index] ? "max-h-screen" : "max-h-0"
            }`}
          >
            {lesson.subLessons?.map((subLesson, subIndex) => (
              <div
                key={subIndex}
                className="p-4 flex justify-between items-center"
                onClick={() => handleSubLessonClick(lesson._id, subLesson._id, subLesson.video)}
              >
                <div className="border p-5 rounded-lg w-full hover:bg-gray-800 cursor-pointer">
                  <h3 className="text-sm">{subLesson.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
       {allLessonsCompleted && (
                <div className="mt-10">
                    <button onClick={handleExamClick} className="px-4 py-2 bg-gray-800 text-white rounded-lg w-full">
                        Take Exam
                    </button>
                </div>
            )}
    </div>
  );
};

export default LessonList;
