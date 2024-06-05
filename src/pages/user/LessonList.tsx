import { useEffect, useState } from "react";

type SubLessons = {
  title: string;
  video: string;  
};

type Lesson = {
  title: string;
  subLessons?: SubLessons[];
};

type LessonListProps = {
  lessons: Lesson[];
  onSubLessonClick: (videoUrl: string) => void;
};

const LessonList: React.FC<LessonListProps> = ({ lessons, onSubLessonClick }) => {
  const [expandedLessons, setExpandedLessons] = useState<boolean[]>([]);
  const [lessonList, setLessons] = useState<Lesson[]>([]);

  const toggleLesson = (index: number) => {
    setExpandedLessons((prev) => {
      const updatedExpandedLessons = [...prev];
      updatedExpandedLessons[index] = !prev[index];
      return updatedExpandedLessons;
    });
  };

  useEffect(() => {
    if (lessons) {
      setExpandedLessons(lessons.map(() => false));
      setLessons(lessons);
    }
  }, [lessons]);

  if (!lessons) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      {expandedLessons.map((isExpanded, index) => (
        <div key={index} className="mb-4 shadow-md rounded-lg">
          <div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => toggleLesson(index)}>
            <div>
              <h2 className="text-lg font-semibold">{lessonList[index].title}</h2>
              <p className="text-sm text-gray-500">{lessonList[index].subLessons?.length} Lectures</p>
            </div>
            <div className='p-4'>
              {isExpanded ? (
                <span className="text-xl font-bold">-</span>
              ) : (
                <span className="text-xl font-bold">+</span>
              )}
            </div>
          </div>
          <div
            className={`overflow-hidden transition-height duration-500 ease-in-out ${isExpanded ? 'max-h-screen' : 'max-h-0'}`}
          >
            {lessonList[index].subLessons?.map((subLesson, subIndex) => (
              <div key={subIndex} className="p-4 flex justify-between items-center" onClick={() => onSubLessonClick(subLesson.video)}>
                <div className="border p-5 rounded-lg w-full hover:bg-gray-800 cursor-pointer">
                  <h3 className="text-sm">{subLesson.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonList;
