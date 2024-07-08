import { useParams } from "react-router-dom";
import { URL } from "@/Common/api";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Course } from "@/types/common";
import toast from "react-hot-toast";
import ReactPlayer from "react-player/lazy";

export const CourseDetail: FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${URL}/course/course/${courseId}`);
        setCourse(response.data.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
        toast.error("Error fetching course data");
      }
    };
    fetchCourse();
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 flex flex-col md:flex-row">
      <div className="flex-grow md:w-2/3 md:pr-5">
        <div className="relative w-full h-64 mb-5">
          {course.trial?.video ? (
            <ReactPlayer
              url={course.trial.video}
              controls
              width="100%"
              height="100%"
              onError={(e) => {
                console.error("Error playing video:", e);
                toast.error("Error playing video");
              }}
            />
          ) : (
            <p>No trial video available.</p>
          )}
        </div>

        <div className="mb-5">
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <p className="text-gray-600 mt-2">{course.description}</p>
          <div className="flex items-center gap-2 mt-4 text-gray-500">
            <span>Category: {course.categoryRef?.title}</span>
            <span>Instructor: {course.instructorRef?.firstName}</span>
            <span>Language: {course.language}</span>
            <span>
              Price:{" "}
              {course.pricing?.type === "free"
                ? "Free"
                : `$${course.pricing.amount}`}
            </span>
          </div>
        </div>
      </div>

      <div className="md:w-1/3 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Course Content</h2>
        {course.lessons && course.lessons.length > 0 ? (
          <div>
            {course.lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex} className="border-b border-gray-200">
                <input type="checkbox" id={`accordion-${lessonIndex}`} className="hidden" />
                <label
                  htmlFor={`accordion-${lessonIndex}`}
                  className="cursor-pointer p-4 flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold">{lesson.title}</h3>
                </label>
                <div className="pl-4 pb-4 hidden peer-checked:block">
                  <ul className="list-disc">
                  {lesson.subLessons && lesson.subLessons.map((subLesson, subLessonIndex) => (
                      <li key={subLessonIndex} className="mt-2">
                        <span className="font-semibold">{subLesson.title}:</span>{" "}
                        {subLesson.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No lessons available for this course.</p>
        )}
      </div>
    </div>
  );
};
