import { URL } from "@/Common/api";
import { SearchBar } from "@/components/admin/SearchBar";
import { RootState } from "@/redux/store";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import { MdLanguage } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Define interfaces for the API response data
interface Course {
  _id: string;
  userId: string;
  courseId: CourseDetails;
  progress: Progress;
  instructorRef: string;
  enrolledAt: string;
  __v: number;
}

interface CourseDetails {
  pricing: Pricing;
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructorRef: string;
  categoryRef: string;
  language: string;
  isBlocked: boolean;
  attachments: string;
  isPublished: boolean;
  lessons: Lesson[];
  trial: Trial;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Pricing {
  type: string;
  amount: number;
}

interface Lesson {
  title: string;
  subLessons: SubLesson[];
  _id: string;
}

interface SubLesson {
  title: string;
  video: string;
  description: string;
  _id: string;
}

interface Trial {
  title: string;
  description: string[];
  thumbnail: string;
  video: string;
  _id: string;
}

interface Progress {
  currentLesson: string | null;
  currentSubLesson: string | null;
  totalTimeWatched: number;
  completedLessons: string[];
  completedAssessments: string[];
  lessonProgress: any[];
}

export const Enrollments: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleFilter = () => {};
  
  const showCourseDetailPage = (courseId: string) => {
    navigate(`/student/courses/${courseId}`);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get<{ success: boolean; data: Course[]; message: string }>(
          `${URL}/course/enrollment/${user._id}`
        );
        setCourses(data.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };
    fetchCourses();
  }, [user._id]);

  return (
    <div className="p-5 w-full overflow-y-auto text-sm">
      <SearchBar handleClick={handleFilter} search={search} setSearch={setSearch} />
      <div className="flex justify-between items-center font-semibold">
        <div>
          <h1 className="font-bold mt-4 text-2xl">Manage Enrollment</h1>
          <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
            <p className="text-green-500 font-semibold">student</p>
            <span>
              <BsCaretRightFill />
            </span>
            <p className="font-semibold">Enrolled Courses</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              className="border p-4 rounded-lg shadow-lg"
              onClick={() => showCourseDetailPage(course.courseId._id)}
            >
              <img
                src={course.courseId.thumbnail}
                alt={course.courseId.title}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="p-2">
                <h3 className="text-lg font-bold">{course.courseId.title}</h3>
                <p className="text-gray-600">{course.courseId.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="flex justify-center items-center gap-2">
                    <MdLanguage />
                    {course.courseId.language}
                  </span>
                  <span>{course.courseId.lessons.length} Lessons</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
