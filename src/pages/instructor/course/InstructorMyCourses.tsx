import { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { publishCourse } from "@/redux/actions/instructor/courseAction";
import { BsCaretRightFill } from "react-icons/bs";
import { Course } from "@/types/common";
import { FilterArray } from "@/components/admin/FilterArray";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "@/components/public/Pagination";
import { MdLanguage } from "react-icons/md";
import { FaChalkboardTeacher, FaRegEdit } from "react-icons/fa";
import { Modal } from "@/components/admin/Modal";
import { SearchBar } from "@/components/admin/SearchBar";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { URL } from "@/Common/api";
import { PublishCourse } from "@/components/admin/course/PublishCourse";

export const InstructorMyCourses: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { loading } = useSelector((state: RootState) => state.courses);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [blockUnBlockModal, setBlockUnBlockModal] = useState(false);
  const [selectedOrderToUpdate, setSelectedOrderToUpdate] = useState({ id: "", status: "" });
  const [courses, setCourses] = useState<Course[]>([]);

  const handleFilter = (type: string, value: any) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "") {
      if (type === "page") {
        setPage(1);
      }
      params.delete(type);
    } else {
      if (type === "page" && value === 1) {
        params.delete(type);
        setPage(1);
      } else {
        params.set(type, value);
        if (type === "page") {
          setPage(value);
        }
      }
    }
    setSearchParams(params.toString() ? "?" + params.toString() : "");
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(`${URL}/course/mycourse/${user._id}`);
        setCourses(data.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
        toast.error("Error fetching course data");
      }
    };
    fetchCourses();
  }, [user._id, searchParams]);

  const toggleBlockUnBlockModal = (data: { id: string; status: string }) => {
    setBlockUnBlockModal(!blockUnBlockModal);
    setSelectedOrderToUpdate(data);
  };

  const handleSave = (id: string, action: string) => {
    dispatch(publishCourse({ id, action }));
  };

  const showCourseDetailPage = (courseId: string) => {
    navigate(`/instructor/courses/course-detail/${courseId}`);
  };

  return (
    <>
      {blockUnBlockModal && (
        <Modal
          tab={
            <PublishCourse
              toggleModal={toggleBlockUnBlockModal}
              data={selectedOrderToUpdate}
              handleSave={handleSave}
            />
          }
        />
      )}
      <div className="p-5 w-full overflow-y-auto text-sm">
        <SearchBar
          handleClick={handleFilter}
          search={search}
          setSearch={setSearch}
        />
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold mt-4 text-2xl">My Courses</h1>
            <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
              <p className="text-green-500 font-semibold">Dashboard</p>
              <span>
                <BsCaretRightFill />
              </span>
              <p className="font-semibold">Course List</p>
            </div>
          </div>
          <div
            className="flex gap-3 p-[6px] cursor-pointer bg-blue-600 rounded-lg"
            onClick={() => navigate("/instructor/courses/addcourse")}
          >
            <button className="admin-button-fl rounded text-white">
              <AiOutlinePlusCircle />
            </button>
            <h1 className="text-md text-white">Add Course</h1>
          </div>
        </div>
        <div className="lg:flex justify-between items-center font-semibold">
          <FilterArray
            list={["all", "active", "blocked", "published", "non-published"]}
            handleClick={handleFilter}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            courses.map((course: Course) => (
              <div
                key={course._id}
                className="border p-4 rounded-lg shadow-lg"
                onClick={() => showCourseDetailPage(course._id)}
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="p-2">
                  <h3 className="text-lg font-bold">{course.title}</h3>
                  <p className="text-gray-600">{course.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-blue-600">
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
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBlockUnBlockModal({
                          id: course._id,
                          status: course.isBlocked ? "blocked" : "active",
                        });
                      }}
                    >
                      <FaRegEdit />
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="py-5">
          {courses.length > 10 && (
            <Pagination
              handleClick={handleFilter}
              page={page}
              number={10}
              totalNumber={courses.length}
            />
          )}
        </div>
      </div>
    </>
  );
};
