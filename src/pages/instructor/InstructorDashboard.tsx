import { FC, useEffect, useState } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import EnrollmentChart from "./dashboard/EnrollmentChart";
import TopCourseChart from "./dashboard/TopCourseChart";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { motion } from "framer-motion";
import { URL } from "@/Common/api";
import TopSelledCourseTable from "./dashboard/TopSelledCourseTable";

interface Enrollment {
  _id: { year: number; month: number; day: number };
  count: number;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructorRef: string;
  categoryRef: string;
  language: string;
  pricing: { type: string; amount: number };
  isBlocked: boolean;
  attachments: string;
  isPublished: boolean;
  lessons: {
    title: string;
    subLessons: {
      title: string;
      video: string;
      description: string;
      _id: string;
    }[];
    _id: string;
  }[];
  trial: {
    title: string;
    description: string[];
    thumbnail: string;
    video: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

 export interface TopCourse {
  _id: string;
  totalEnrollments: number;
  course: Course;
}

export interface DashboardData {
  enrollments: Enrollment[];
  totalCourses: number;
  totalStudents: number;
  topCourse: TopCourse[];
}

export const InstructorDashboard: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [enrollmentsData, setEnrollmentsData] = useState<Enrollment[]>([]);
  const [totalCourses, setTotalCourses] = useState<number>(0);
  const [totalEnrollments, setTotalEnrollments] = useState<number>(0);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [topCourses, setTopCourses] = useState<TopCourse[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (user) {
        try {
          const res = await axios.get<{ data: DashboardData }>(
            `${URL}/course/instructor/dashboard/${user._id}`
          );
          const { enrollments, totalCourses, totalStudents, topCourse } =
            res.data.data;
          setEnrollmentsData(enrollments);
          setTotalCourses(totalCourses);
          setTotalStudents(totalStudents);
          setTopCourses(topCourse);

          const total = enrollments.reduce(
            (acc, enrollment) => acc + enrollment.count,
            0
          );
          setTotalEnrollments(total);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        }
      } else {
        console.log("user not found ❌❌❗❗❗");
      }
    };

    fetchDashboardData();
  }, [user]);

  const transformedEnrollmentData: [string, number][] = enrollmentsData.map(
    ({ _id, count }) => {
      const { year, month, day } = _id;
      const dateString = `${year}-${month}-${day}`;
      return [dateString, count];
    }
  );

  return (
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
      </div>
      <div className="flex justify-between gap-6 mt-4">
        <motion.div
            className="border border-gray-300 border-x-2 p-4 rounded shadow w-1/3 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          > 
          <h2 className="text-xl font-bold">Total Enrollment</h2>
          <p className="text-2xl">{totalEnrollments}</p>
          </motion.div>
          <motion.div
            className="border border-gray-300 border-x-2 p-4 rounded shadow w-1/3 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          > 
           <h2 className="text-xl font-bold">Total Students Enrolled</h2>
           <p className="text-2xl">{totalStudents}</p>
           </motion.div>
         
           <motion.div
            className="border border-gray-300 border-x-2 p-4 rounded shadow w-1/3 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          > 
          <h2 className="text-xl font-bold">Total Courses</h2>
          <p className="text-2xl">{totalCourses}</p>
          </motion.div>
      </div>
      <motion.div  className="flex gap-4 mt-8 w-full" >
        <div className="flex-1 w-[50%]">
          <EnrollmentChart enrollmentsData={transformedEnrollmentData} />
        </div>
        <div className="flex-1 w-[50%]">
          <TopCourseChart topCoursesData={topCourses} />
        </div>
        </motion.div>
      <div className="mt-8">
        <h1 className="p-4 text-lg font-bold">Top 5 Selling course</h1>
      <TopSelledCourseTable topCourses={topCourses} />
      </div>
    </div>
  );
};
