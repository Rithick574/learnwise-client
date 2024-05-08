import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { SearchBar } from "@/components/admin/SearchBar";
import { useTheme } from "@/components/ui/theme-provider";
import { BsCaretRightFill } from "react-icons/bs";
import Skeleton from "@/components/ui/Skeleton";
import { acceptApplicationAction, getAllApplicationsAction } from "@/redux/actions/admin/adminAction";
import date from "date-and-time";
import toast from "react-hot-toast";

export const AdminRequests: FC = () => {
  const { data, loading, error } = useSelector((state: RootState) => state.application);
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllApplicationsAction());
  }, [dispatch]);

  const handleApplicationAccept = (id: string, email: string) => {
    dispatch(acceptApplicationAction({
      id,
      email
  })).then(() => dispatch(getAllApplicationsAction())).finally(() => {
    toast.success("Application accepted")
  });
  };

  return (
    <div className="p-5 w-full overflow-y-auto text-sm">
      <SearchBar handleClick={() => {}} search={search} setSearch={setSearch} />
      <div className="flex justify-between items-center font-semibold">
        <div>
          <h1 className="font-bold mt-4 text-2xl">Manage Instructors</h1>
          <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
            <p className="text-green-500 font-semibold">Dashboard</p>
            <BsCaretRightFill />
            <p className="font-semibold">Instructor Application List</p>
          </div>
        </div>
      </div>
      {loading ? <Skeleton width="100%" height="550px" /> : error ? (
        <p className="text-red-500">Error loading data: {error}</p>
      ) : (
        <div className={`overflow-x-scroll lg:overflow-hidden text-[16px] ${theme === "light" ? "bg-gray-100" : "bg-gray-900"} p-3 rounded-xl`}>
          <table className="w-full min-w-max table-auto">
            <thead className={`font-normal  ${theme === "light" ? "bg-gray-200" : "bg-gray-800"} rounded-sm`}>
              <tr>
                <th className="admin-table-head py-2">Email</th>
                <th className="admin-table-head py-2">Profession</th>
                <th className="admin-table-head py-2">Joined</th>
                <th className="admin-table-head py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="cursor-pointer">
                  <td className="admin-table-row text-center py-3">{item.email}</td>
                  <td className="admin-table-row text-center py-3">{item.profession}</td>
                  <td className="admin-table-row text-center py-3">
                    {item.createdAt ? date.format(new Date(item.createdAt), "MMM DD YYYY") : "No Data"}
                  </td>
                  <td className="admin-table-row py-3 flex justify-center">
                    <button onClick={() => handleApplicationAccept(item._id, item.email)} className="px-3 py-1 rounded-lg capitalize w-fit text-sm font-semibold bg-green-100 text-green-600">
                      {item.accepted ? "Accepted!" : "Accept"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
