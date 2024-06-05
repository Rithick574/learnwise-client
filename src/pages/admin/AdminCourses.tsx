import { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAllCourse, updateCourseStatus } from "@/redux/actions/instructor/courseAction"; 
import { BsCaretRightFill } from "react-icons/bs";
import { Course } from "@/types/common";
import { FilterArray } from "@/components/admin/FilterArray";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "@/components/public/Pagination";
import { MdLanguage } from "react-icons/md";
import { FaChalkboardTeacher, FaRegEdit } from "react-icons/fa";
import { Modal } from "@/components/admin/Modal";
import { ChangeCourseStatus } from "@/components/admin/course/ChangeCourseStatus";
import { SearchBar } from "@/components/admin/SearchBar";

export const AdminCourses: FC = () => {
  const { courses, loading } = useSelector((state: RootState) => state.courses);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [blockUnBlockModal, setBlockUnBlockModal] = useState(false);
  const [selectedOrderToUpdate, setSelectedOrderToUpdate] = useState({ id: "", status: "" });

  const handleFilter = (type: any, value: any) => {
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
    dispatch(getAllCourse(searchParams));
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber ?? "1", 10));
  }, [searchParams]);

  const toggleBlockUnBlockModal = (data: any) => {
    setBlockUnBlockModal(!blockUnBlockModal);
    setSelectedOrderToUpdate(data);
  };

  const handleSave = (id: string, status: string) => {
    dispatch(updateCourseStatus({id,status}));
  };

  const showCourseDetailPage = (courseId: string) => {
    navigate(`/admin/courses/course-detail/${courseId}`);
  };

  return (
    <>
      {blockUnBlockModal && (
        <Modal
          tab={
            <ChangeCourseStatus
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
            <h1 className="font-bold mt-4 text-2xl">Manage Courses</h1>
            <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
              <p className="text-green-500 font-semibold">Dashboard</p>
              <span>
                <BsCaretRightFill />
              </span>
              <p className="font-semibold">Course List</p>
            </div>
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
                      {course.categoryRef.title}
                    </span>
                    <span className="flex justify-center items-center gap-2">
                      <FaChalkboardTeacher />
                      {course.instructorRef.firstName}
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
                      {" "}
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
