import { URL, commonRequest } from "@/Common/api";
import { config } from "@/Common/configurations";
import { SearchBar } from "@/components/admin/SearchBar";
import { useTheme } from "@/components/ui/theme-provider";
import { RootState } from "@/redux/store";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsCaretRightFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import date from "date-and-time";
import { useSearchParams } from "react-router-dom";
import Pagination from "@/components/public/Pagination";

interface StudentData {
  _id: string;
  enrolledAt: string;
  userDetails: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profile: {
      avatar: string;
    };
  };
  courseDetails: {
    _id: string;
    title: string;
    thumbnail: string;
    description:string;
  };
}


const InstructorMyStudents: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<StudentData[]>([]);
  const { theme } = useTheme();
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
 

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
    const fetchStudents = async () => {
      try {
        const response = await commonRequest(
          "get",
          `${URL}/course/mystudents/${user._id}?${searchParams}`,
          config
        );
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students data:", error);
        toast.error("Error fetching students data");
        setLoading(false);
      }
    };
    fetchStudents();
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber ?? "1", 10));
  }, [searchParams]);
  

  return (
    <div className="p-5 w-full overflow-y-auto text-sm">
      <SearchBar
        handleClick={handleFilter}
        search={search}
        setSearch={setSearch}
      />

      <div className="flex justify-between items-center font-semibold">
        <div>
          <h1 className="font-bold mt-4 text-2xl">My Students</h1>
          <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
            <p className="text-green-500 font-semibold">Instructor</p>
            <span>
              <BsCaretRightFill />
            </span>
            <p className="font-semibold">My Students</p>
          </div>
        </div>
      </div>

      <div
        className={`overflow-x-auto lg:overflow-hidden ${
          theme === "light" ? "bg-gray-100" : "bg-gray-900"
        } p-3 rounded-lg`}
      >
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader size={50} color={theme === "light" ? "#000" : "#fff"} />
          </div>
        ) : (
        <table className="table">
          <thead
            className={`font-normal ${
              theme === "light" ? "bg-gray-200" : "bg-gray-800"
            } rounded-sm`}
          >
            <tr>
              <th className="text-center py-3">No.</th>
              <th className="text-center py-3">Student Name</th>
              <th className="text-center py-3">Course Purchased</th>
              <th className="text-center py-3">Purchased At</th>
              <th className="text-center py-3">Progress Status</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student, index) => (
              <tr key={student._id}>
                <td className="text-center py-3">{index + 1}</td>
                <td className="py-3">
                  <div className="flex items-center justify-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={student?.userDetails?.profile?.avatar || "../ui/empty-profile.webp"}
                          alt={`${student?.userDetails?.firstName} ${student?.userDetails?.lastName} Avatar`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{`${student?.userDetails?.firstName} ${student?.userDetails?.lastName}`}</div>
                      <div className="text-sm opacity-50">{student?.userDetails?.email}</div>
                    </div>
                  </div>
                </td>
                <td className="text-center py-3">
                  {student.courseDetails.title}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Course Description
                  </span>
                </td>
                <td className="text-center py-3">  {student?.enrolledAt ? date.format(new Date(student?.enrolledAt), "MMM DD YYYY") : "No Data"}</td>
                <td className="text-center py-3">
                  <button className="btn btn-ghost btn-xs">pending</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         )}
      </div>
      <div className="py-5">
          {students?.length > 10 && (
            <Pagination
              handleClick={handleFilter}
              page={page}
              number={10}
              totalNumber={students?.length}
            />
          )}
        </div>
    </div>
  );
};

export default InstructorMyStudents;