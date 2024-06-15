import Skeleton from "@/components/ui/Skeleton";
import { useTheme } from "@/components/ui/theme-provider";
import { publishedCourses } from "@/redux/actions/instructor/courseAction";
import { AppDispatch, RootState } from "@/redux/store";
import { Course } from "@/types/common";
import { useEffect, useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BiCategory } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const { courses, loading } = useSelector((state: RootState) => state.courses);
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const navigate = useNavigate()
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPublishedCourses = async () => {
      await dispatch(publishedCourses());
      setInitialLoading(false);
    };

    fetchPublishedCourses();
  }, [dispatch]);

  const showCourseDetailsPage=(courseId: string,cost:number,thumbnail:string,courseName:string,instructorRef:string)=>{
    navigate(`/courses/${courseId}`,{state:{courseId,cost,thumbnail,courseName,instructorRef}})
  }

  return (
    <>
      <div className="w-full mt-[10px] mr-40 h-screen">
        <div className="container">
          <div className="row">
            <div className="mt-5">
              <div className="flex justify-center">
                <span className="text-green-500 top-title text-2xl font-semibold mt-4">
                  Courses
                </span>
              </div>
              <br />
              <h4 className="text-center font-semibold text-4xl mt-5">
                Expand Your Career Opportunity
                <br />
                With Our Courses
              </h4>
            </div>

            <div className="mt-14">
              {initialLoading || loading ? (
                <>
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className={`w-full mt-4 flex items-center justify-center ${
                        theme === "light" ? "bg-gray-100" : "bg-gray-800"
                      } rounded-md overflow-hidden px-2 py-3`}
                    >
                      <div
                        className={`w-5/12 ${
                          theme === "light" ? "bg-white" : "bg-gray-800"
                        } shadow`}
                      >
                        <Skeleton width={"100%"} height={"220px"} />
                      </div>
                      <div className="w-7/12 ps-4 flex flex-col gap-1">
                        <Skeleton width={"40%"} height={"10px"} />
                        <Skeleton width={"90%"} height={"14px"} />
                        <Skeleton width={"100%"} height={"14px"} />
                        <Skeleton width={"70%"} height={"14px"} />
                        <Skeleton width={"40%"} height={"14px"} />
                        <Skeleton width={"20%"} height={"20px"} />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {courses.map((course:Course) => (
                    <div
                      key={course._id}
                      className={`w-full mt-4 flex items-center justify-center ${
                        theme === "light" ? "bg-gray-100" : "bg-gray-800"
                      } rounded-md overflow-hidden px-2 py-3`}
                      onClick={()=>showCourseDetailsPage(course._id,course.pricing.amount,course.thumbnail,course.title,course.instructorRef._id)}
                    >
                      <div
                        className={`w-5/12 ${
                          theme === "light" ? "bg-white" : "bg-gray-800"
                        } shadow`}
                      >
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-56 object-cover rounded-t-lg"
                        />
                      </div>
                      <div className="w-7/12 ps-4 flex flex-col gap-1">
                        <h3 className="text-lg font-bold">{course.title}</h3>
                        <p className="text-gray-400">{course.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-blue-600 flex justify-center items-center gap-2"><BiCategory />
                            {course.categoryRef?.title}
                          </span>
                          <span className="flex justify-center items-center gap-2">
                            <FaChalkboardTeacher />
                            {course.instructorRef?.firstName}
                          </span>
                          <span className="flex justify-center items-center gap-2">
                            <MdLanguage />
                            {course.language}
                          </span>
                          <span>{course.lessons.length} Lessons</span>
                          <span className="text-xl font-bold text-green-500">
                          ₹{course.pricing.amount}
                        </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
