import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Course } from "@/pages/public/InstructorDetails";
import { FaRupeeSign } from "react-icons/fa6";

interface CourseCardProps {
  course: Course;
}

const CourseCard: FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/courses/${course._id}`);
  };

  return (
    <div className="card bg-base-300 shadow-xl">
      <figure>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-32 sm:h-40 object-cover"
        />
      </figure>
      <div className="p-4">
        <h2 className="card-title text-lg sm:text-xl">{course.title}</h2>
        <p className="text-gray-500 text-sm sm:text-base">{course.description}</p>
      </div>
      <div className="p-2 card-actions flex flex-col sm:flex-row justify-between items-center">
        <span className="text-sm bg-gray-700 rounded-md p-2 flex items-center">
          <FaRupeeSign className="mt-[3px] mr-1" />
          {course?.pricing?.amount || "free"}
        </span>
        <button
          onClick={handleReadMore}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg focus:outline-none bg-blue-600 hover:bg-blue-700 mt-2 sm:mt-0"
        >
          View Details
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
