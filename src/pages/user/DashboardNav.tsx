import { BsCaretRightFill } from "react-icons/bs";
import { motion } from "framer-motion";

export const DashboardNav = () => {
  const totalStudents = 75;
  const totalCourses = "MERN";

  return (
    <div className="p-5 w-full overflow-auto text-sm">
      <div className="flex justify-between items-center font-semibold pb-5">
        <div>
          <h1 className="font-bold mt-4 text-2xl">Overview</h1>
          <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
            <p className="text-green-500 font-semibold">Learnwise</p>
            <span>
              <BsCaretRightFill />
            </span>
            <p className="font-semibold">overview</p>
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
          <h2 className="text-xl font-bold">Today's watch activity</h2>
          <p className="text-2xl">{"2"}+ Hrs</p>
        </motion.div>
        <motion.div
          className="border border-gray-300 border-x-2 p-4 rounded shadow w-1/3 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold">Exam success rate</h2>
          <p className="text-2xl">{totalStudents}</p>
        </motion.div>

        <motion.div
          className="border border-gray-300 border-x-2 p-4 rounded shadow w-1/3 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold">Focus Category</h2>
          <p className="text-2xl">{totalCourses}</p>
        </motion.div>
      </div>
      <h2 className="font-bold text-xl mt-10 ">Recent Enrollments</h2>
      <div className="overflow-x-auto mt-10">
        <table className="table">
          <thead className="border rounded-lg">
            <tr>
              <th>Course</th>
              <th>Pricing</th>
              <th>Progress</th>
              <th>Enrolled At</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
                <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span>
              </td>
              <td>Purple</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
