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
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchBar } from "@/components/admin/SearchBar";
import SortButton from "./course/SortButton";
import Pagination from "@/components/public/Pagination";
import FilterUserDashboard from "./course/FilterUserDashboard";

const Courses = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { courses, loading, totalAvailableCourses } = useSelector(
    (state: RootState) => state.courses
  );
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string[]>([]);
  const [price, setPrice] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const priceParam = searchParams.get("price");
    const searchParam = searchParams.get("search");
    const sortParam = searchParams.get("sort");
    const page = searchParams.get("page");

    setCategory(categoryParam ? categoryParam.split(",") : []);
    setPrice(priceParam || "");
    setSort(sortParam || "");
    setPage(page ? parseInt(page, 10) : 1);
    setSearch(searchParam || "");
  }, []);

  const handleClick = (param: string, value: string | number) => {
    const params = new URLSearchParams(window.location.search);

    if (value === "" || (param === "page" && value === 1)) {
      params.delete(param);
      if (param === "price") {
        setPrice("");
      }
      if (param === "sort") {
        setSort("");
        params.delete("page");
        setPage(1);
      }
    } else {
      if (param === "category" && value) {
        let cat = params.get("category");
        if (!cat) {
          params.append("category", value as string);
          setCategory([value as string]);
        } else {
          let temp = cat.split(",");
          if (temp.length > 0) {
            if (temp.includes(value as string)) {
              temp = temp.filter((item) => item !== value);
            } else {
              temp.push(value as string);
            }

            if (temp.length > 0) {
              params.set("category", temp.join(","));
              setCategory(temp);
            } else {
              params.delete("category");
              setCategory([]);
            }
          } else {
            params.delete("category");
            setCategory([]);
          }
        }
      } else {
        params.set(param, value as string);
        if (param === "price") {
          setPrice(value as string);
          params.delete("page");
          setPage(1);
        }
        if (param === "sort") {
          setSort(value as string);
          params.delete("page");
          setPage(1);
        }
        if (param === "search") {
          params.delete("page");
          setPage(1);
        }
      }
    }

    setSearchParams(params.toString() ? "?" + params.toString() : "");
  };
  // Clear all filters
  const clearFilters = () => {
    const params = new URLSearchParams();

    params.delete("category");
    params.delete("price");
    params.delete("search");
    params.delete("sort");
    params.delete("page");

    setSearchParams(params);

    setSearch("");
    setPrice("");
    setCategory([]);
    setPage(1);
  };

  useEffect(() => {
    const fetchPublishedCourses = async () => {
      await dispatch(publishedCourses(searchParams));
      setInitialLoading(false);
      const params = new URLSearchParams(window.location.search);
      const pageNumber = params.get("page");
      setPage(pageNumber ? parseInt(pageNumber, 10) : 1);
    };

    fetchPublishedCourses();
  }, [searchParams]);

  const showCourseDetailsPage = (
    courseId: string,
    cost: number,
    thumbnail: string,
    courseName: string,
    instructorRef: string
  ) => {
    if (user.role === "student") {
      navigate(`/student/courses/${courseId}`, {
        state: { courseId, cost, thumbnail, courseName, instructorRef },
      });
    } else {
      navigate(`/courses/${courseId}`, {
        state: { courseId, cost, thumbnail, courseName, instructorRef },
      });
    }
  };

  return (
    <>
      <div className="w-full flex pt-20 px-5 lg:p-20 text-gray-500  gap-4 overflow-x-auto">
        {/* Category */}
        <FilterUserDashboard
          clearFilters={clearFilters}
          filters={category}
          handleClick={handleClick}
          price={price}
        />
        <div className="w-full lg:w-4/5 pb-5">
          <div className="flex flex-col lg:flex-row gap-5 items-center justify-between">
            <SearchBar
              handleClick={handleClick}
              search={search}
              setSearch={setSearch}
            />
            <SortButton handleClick={handleClick} sort={sort} />
            <div className="shrink-0 hidden lg:block">
              {courses.length}/{totalAvailableCourses} Results Loaded
            </div>
          </div>
          {/* <div className="mt-5">
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
            </div> */}

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
                {courses.map((course: Course) => (
                  <div
                    key={course._id}
                    className={`w-full mt-4 flex items-center justify-center ${
                      theme === "light" ? "bg-gray-100" : "bg-gray-900"
                    } rounded-md overflow-hidden px-2 py-3`}
                    onClick={() =>
                      showCourseDetailsPage(
                        course._id,
                        course.pricing.amount,
                        course.thumbnail,
                        course.title,
                        course.instructorRef._id
                      )
                    }
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
                    <div className="w-7/12 ps-4 flex flex-col gap-1 ml-8">
                      <h3 className="text-lg font-bold">{course.title}</h3>
                      <p className="text-gray-400">{course.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-blue-600 flex justify-center items-center gap-2">
                          <BiCategory />
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
                        <span className="text-xl font-bold text-green-500 mr-14">
                          ₹{course.pricing.amount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="mt-6">
            <Pagination
              handleClick={handleClick}
              number={4}
              page={page}
              totalNumber={totalAvailableCourses}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
