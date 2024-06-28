import { URL, commonRequest } from "@/Common/api";
import { appJson } from "@/Common/configurations";
import CourseCard from "@/components/instructor/CourseCard";
import MemberShip from "@/components/instructor/MemberShip";
import ProfileCard from "@/components/instructor/ProfileCard";
import Tabs from "@/components/instructor/Tabs";
import { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export interface TeacherData {
  accepted: boolean;
  createdAt: string;
  email: string;
  github: string;
  linkedIn: string;
  profession: string;
  profileDescription: string;
  updatedAt: string;
  __v: number;
  _id: string;
  enrollments?: Enrollment[];
  totalCourses?: number;
  totalStudents?: number;
  topCourse?: TopCourse[];
}

interface Enrollment {
  _id: { year: number; month: number; day: number };
  count: number;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructorRef: {
    _id: string;
    firstName?: string;
  };
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

export const InstructorDetails: FC = () => {
  const { instructorId } = useParams<{ instructorId: string }>();
  const location = useLocation();
  const [teacherData, setTeacherData] = useState<TeacherData>({} as TeacherData);
  const [coursesData, setCourseData] = useState<TopCourse[]>([] as TopCourse[]);
  const email = location.state?.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await commonRequest(
          "get",
          `${URL}/user/instructor/${email}`,
          appJson
        );
        const res = await commonRequest(
          "get",
          `${URL}/course/instructor/dashboard/${instructorId}`,
          appJson
        );
        setTeacherData({ 
          ...response.data, 
          enrollments: res.data.enrollments,
          totalCourses: res.data.totalCourses,
          totalStudents: res.data.totalStudents,
          topCourse: res.data.topCourse
        });
        setCourseData(res.data.topCourse);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [email, instructorId]);

  const [activeTab, setActiveTab] = useState<string>('Courses');

  return (
    <div className="flex flex-wrap justify-center items-start w-full max-w-7xl mx-auto lg:mt-10">
      <div className="w-full lg:w-1/4 p-4">
        <ProfileCard instructordInformations={teacherData} />
      </div>
      <div className="w-full lg:w-3/4 p-4">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-4">
          {activeTab === 'Courses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesData.map((course) => (
                <CourseCard key={course._id} course={course.course} />
              ))}
            </div>
          )}
          {activeTab === 'Member Ship' && (
            <MemberShip instructorId={{ email: teacherData.email }} />
          )}
        </div>
      </div>
    </div>
  );
};
