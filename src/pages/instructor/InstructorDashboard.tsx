import { FC } from "react";
import { BsCaretRightFill } from "react-icons/bs";

export const InstructorDashboard: FC = () => {
  const totalRevenue = 6;
  const totalStudentsEnrolled = 21;
  const CousesPublished = 35;
  return (
    <div className="p-5 w-full overflow-auto text-sm">
      <div className="flex justify-between items-center  font-semibold pb-5">
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
        <div className="border border-gray-300 border-x-2 p-4 rounded shadow w-1/3 text-center">
          <h2 className="text-xl font-bold">Total Enrollment</h2>
          <p className="text-2xl">{totalRevenue}</p>
        </div>
        <div className="border border-gray-300 border-x-2 p-4 rounded shadow w-1/3 text-center">
          <h2 className="text-xl font-bold">Total Students Enrolled</h2>
          <p className="text-2xl">{totalStudentsEnrolled}</p>
        </div>
        <div className="border border-gray-300 border-x-2 p-4 rounded shadow w-1/3 text-center">
          <h2 className="text-xl font-bold">Total Courses</h2>
          <p className="text-2xl">{CousesPublished}</p>
        </div>
      </div>
    
      <div className="mt-8">
       
      </div>
    </div>
  );
};
