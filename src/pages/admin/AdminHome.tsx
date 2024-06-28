import { FC, useEffect, useState } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import { motion } from "framer-motion";   
import { URL, commonRequest } from "@/Common/api";
import { config } from "@/Common/configurations";
import CategoryEnrollmentChart from "@/components/admin/dashboard/CategoryEnrollmentChart";
import TotalEnrollmentChart from "@/components/admin/dashboard/TotalEnrollmentChart";
import TopSelledCourses from "@/components/admin/dashboard/TopSelledCourses";
import { Course, IUser } from "@/types/common";
import { IoCloudDownload } from "react-icons/io5";
import SalesReport from "@/components/admin/dashboard/SalesReport";
import DateRangepicker from "@/components/admin/dashboard/DateRangepicker";
import { Range } from 'react-date-range';

interface Courses {
  _id: {
    categoryName: string;
    day: number;
    month: number;
    year: number;
  };
  count: number;
}

interface Instructor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  isBlocked: boolean;
  isVerified: boolean;
  otp: string;
  profit: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  contact: {
    socialMedia: {
      instagram: string;
      linkedIn: string;
      github: string;
    };
    additionalEmail: string;
  };
  profile: {
    dob: string;
    gender: string;
    avatar: string;
  };
}

export interface TopCourse {
  _id: string;
  totalEnrollments: number;
  course: Course;
  instructors: Instructor;
}

interface GetTopCourse {
  topCourses: TopCourse[];
  totalCourseCount: number;
}

interface CourseResponse {
  EnrollmentData: Courses[];
  getTopCourse: GetTopCourse;
}

export const AdminHome: FC = () => {
  const [dashboardData, setDashboardData] = useState<Courses[]>([]);
  const [totalEnrollments, setTotalEnrollments] = useState<number>(0);
  const [totalCourse, setTotalCourses] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalInstructors, setTotalInstructors] = useState<number>(0);
  const [topCourses, setTopCourses] = useState<TopCourse[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const fetchData = async () => {
    try {
      const [courseResponse, userResponse] = await Promise.all([
        commonRequest("get", `${URL}/course/admindashboard`, config),
        commonRequest("get", `${URL}/auth/getallusers`, config),
      ]);
      if (!courseResponse.data || !userResponse.data) {
        throw new Error("Invalid response data");
      }

      const courseData: CourseResponse = courseResponse.data;
      const userData: IUser[] = userResponse.data;

      if (!courseData) {
        throw new Error("Invalid course data");
      }

      setDashboardData(courseData.EnrollmentData);
      setTotalCourses(courseData.getTopCourse?.totalCourseCount || 0);

      const totalEnrollmentsCount = courseData.EnrollmentData.reduce(
        (acc: number, enrollment: Courses) => acc + enrollment.count,
        0
      );
      setTotalEnrollments(totalEnrollmentsCount);
      setTopCourses(courseData.getTopCourse?.topCourses || []);

      const userRoles = userData.map((user: IUser) => user.role);
      const totalUsersCount = userRoles.filter(
        (role): role is "student" => role === "student"
      ).length;
      const totalInstructorsCount = userRoles.filter(
        (role): role is "instructor" => role === "instructor"
      ).length;
      setTotalUsers(totalUsersCount);
      setTotalInstructors(totalInstructorsCount);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const transformedDataForCategoryChart =
    dashboardData.length > 0
      ? dashboardData.reduce(
          (acc: Record<string, number>, enrollment: Courses) => {
            const categoryName = enrollment._id.categoryName;
            const count = enrollment.count;
            acc[categoryName] = (acc[categoryName] || 0) + count;
            return acc;
          },
          {}
        )
      : {};

  const transformedDataForDateChart: [string, number][] =
    dashboardData.length > 0
      ? Object.entries(
          dashboardData.reduce((acc: Record<string, number>, enrollment: Courses) => {
            const date = `${enrollment._id.year}-${enrollment._id.month}-${enrollment._id.day}`;
            acc[date] = (acc[date] || 0) + enrollment.count;
            return acc;
          }, {})
        ).map(([date, count]) => [date, count])
      : [];

  // const totalRevenue = "₹50,360";

  const handleApplyDateRange = () => {
    setShowReport(true);
  };
  
  return (
    <>
      <div className="p-5 w-full overflow-auto text-sm">
        <div className="flex justify-between items-center font-semibold pb-5">
          <div>
            <h1 className="font-bold mt-4 text-2xl">Dashboard</h1>
            <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
              <p className="text-green-500 font-semibold">Learnwise</p>
              <span>
                <BsCaretRightFill />
              </span>
              <p className="font-semibold">Dashboard</p>
            </div>
          </div>
          <div
            className="flex gap-3 p-1 cursor-pointer bg-blue-600 rounded-md"
            onClick={() => setShowModal(!showModal)}
          >
            <button className="admin-button-fl rounded text-white">
              <IoCloudDownload />
            </button>
            <h1 className="text-md text-white"> Sales Report</h1>
          </div>
        </div>
        {showReport && (
          <div className='mt-4'>
            <SalesReport
              startDate={dateRange[0].startDate as Date}
              endDate={dateRange[0].endDate as Date}
            />
          </div>
        )}
        <div className="flex justify-between gap-6 mt-4">
          <motion.div
            className="border border-gray-300 border-x-2 p-4 rounded shadow w-1/3 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold">Total Students</h2>
            <p className="text-2xl">{totalUsers}</p>
          </motion.div>
          <motion.div
            className="border border-gray-300 border-x-2 p-4 rounded shadow w-1/3 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold">Total Enrollments</h2>
            <p className="text-2xl">{totalEnrollments}</p>
          </motion.div>
          <motion.div
            className="border border-gray-300 border-x-2 p-4 rounded shadow w-1/3 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold">Total Courses</h2>
            <p className="text-2xl">{totalCourse}</p>
          </motion.div>
          <motion.div
            className="border border-gray-300 border-x-2 p-4 rounded shadow w-1/3 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold">Total Instructors</h2>
            <p className="text-2xl">{totalInstructors}</p>
          </motion.div>
        </div>
        <div className="mt-8 flex lg:h-[55%] md:h-[50%] gap-4 items-center justify-center">
          <motion.div
            className="w-1/2 h-full border shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <CategoryEnrollmentChart
              enrollmentsData={
                Object.entries(transformedDataForCategoryChart) as [
                  string,
                  number
                ][]
              }
            />
          </motion.div>
          <motion.div
            className="w-1/2 h-full border shadow-md"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TotalEnrollmentChart enrollmentsData={transformedDataForDateChart} />
          </motion.div>
        </div>
        <div>
          <TopSelledCourses topCourses={topCourses} />
        </div>
      </div>
      <DateRangepicker
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        dateRange={dateRange}
        setDateRange={setDateRange}
        onApply={handleApplyDateRange}
        maxDate={new Date()}
      />
    </>
  );
};
