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
    <div className="card bg-base-100 w-[19rem] shadow-xl">
      <figure>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-32 sm:h-48 object-fill"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{course.title}</h2>
        <p className="text-gray-500">{course.description}</p>
      </div>
      <div className="p-2 card-actions justify-end">
          <span className="text-sm float-right bg-gray-700 rounded-md p-2 flex">
          <FaRupeeSign className="mt-[3px]" />. {course?.pricing?.amount || "free"}
          </span>
        <button
          onClick={handleReadMore}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
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
