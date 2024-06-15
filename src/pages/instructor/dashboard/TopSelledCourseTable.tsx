import { FC } from "react";
import { TopCourse } from "../InstructorDashboard";



interface TopCourseChartProps {
    topCourses: TopCourse[];
}

const TopSelledCourseTable: FC<TopCourseChartProps> = ({ topCourses }) => {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">Total Enrollments</th>
            <th className="text-center">Course Name</th>
            <th className="text-center">Created At</th>
            <th className="text-center">Price</th>
          </tr>
        </thead>
        <tbody>
          {topCourses.map((topCourse, index) => (
            <tr key={index}>
              
              <td className="text-center">{topCourse.totalEnrollments}</td>
              <td>
                <div className="flex justify-center items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-half-1 rounded-lg w-36 h-20">
                      <img
                        src={topCourse.course.thumbnail  || "../ui/empty-profile.webp"}
                        alt={topCourse.course.title}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{topCourse.course.title}</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td className="text-center">{new Date(topCourse.course.createdAt).toLocaleDateString()}</td>
              <td className="text-center">₹ {topCourse.course.pricing.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopSelledCourseTable;
