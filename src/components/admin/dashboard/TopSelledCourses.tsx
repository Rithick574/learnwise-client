import { TopCourse } from "@/pages/admin/AdminHome";
import { FC } from "react";
import { GiSellCard } from "react-icons/gi";

interface TopSelledCoursesProps {
  topCourses: TopCourse[];
}

const TopSelledCourses: FC<TopSelledCoursesProps> = ({ topCourses }) => {
  return (
    <div>
      <h1 className="text-xl font-bold mt-8 flex gap-4">
        {" "}
        Top Selled Courses <GiSellCard className="mt-1" />
      </h1>
      <div className="overflow-x-auto border mt-9">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">Course Name</th>
              <th className="text-center">Total Enrollment</th>
              <th className="text-center">Instructor</th>
              <th className="text-center">Price</th>
            </tr>
          </thead>
          <tbody>
            {topCourses.map((topCourse, index) => (
              <tr key={index}>
                <td>
                  <div className="flex justify-center items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-half-1 rounded-lg w-32 h-16">
                        <img
                          src={topCourse.course.thumbnail}
                          alt="Instructor Avatar"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="font-bold">{topCourse.course?.title}</div>
                  </div>
                </td>
                <td className="text-center">{topCourse.totalEnrollments}</td>
                <td>
                  <div className="flex justify-center items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={
                            topCourse.instructors?.profile?.avatar ||
                            "../ui/empty-profile.webp"
                          }
                          alt="Instructor Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {`${topCourse.instructors.firstName} ${topCourse.instructors.lastName}`}
                      </div>

                      <div className="text-sm opacity-50">
                        {topCourse.instructors.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <button className="bg-transparent border rounded-lg border-gray-300 hover:btn-ghost  btn-xs">
                    ₹{topCourse.course?.pricing?.amount}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSelledCourses;
