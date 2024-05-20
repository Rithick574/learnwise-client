import { FilterArray } from "@/components/admin/FilterArray";
import { SearchBar } from "@/components/admin/SearchBar";
import { TableRow } from "@/components/admin/TableRow";
import { AppDispatch, RootState } from "@/redux/store";
import { FC, useEffect, useState } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@/components/ui/theme-provider";
import { getInstructors } from "@/redux/actions/admin/adminAction";
import { Modal } from "@/components/admin/Modal";
import BlockOrUnBlock from "@/components/admin/BlockOrUnBlock";

interface Admin {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isBlocked: boolean;
  createdAt?: string;
}

export const AdminInstructorList: FC = () => {
  const { instructors } = useSelector((state: RootState) => state.instructors);
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getInstructors());
  }, [dispatch]);

  const [search, setSearch] = useState("");
  const handleFilter = () => {};

  const [selectedOrderToUpdate, setSelectedOrderToUpdate] = useState({});
  const [blockUnBlockModal, setBlockUnBlockModal] = useState(false);

  const toggleBlockUnBlockModal = (data: any) => {
    setBlockUnBlockModal(!blockUnBlockModal);
    setSelectedOrderToUpdate(data);
  };

  return (
    <>
      {blockUnBlockModal && (
        <Modal
          tab={
            <BlockOrUnBlock
              toggleModal={toggleBlockUnBlockModal}
              data={selectedOrderToUpdate as { id: string; status: string }}
            />
          }
        />
      )}

      <div className="p-5 w-full overflow-y-auto text-sm">
        <SearchBar
          handleClick={handleFilter}
          search={search}
          setSearch={setSearch}
        />
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold mt-4 text-2xl">Manage Instructors</h1>
            <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
              <p className="text-green-500 font-semibold">Dashboard</p>
              <span>
                <BsCaretRightFill />
              </span>
              <p className="font-semibold">Instructor List</p>
            </div>
          </div>
          {/* <div className="flex gap-3 p-1 cursor-pointer">
            <button
              className="admin-button-fl rounded"
              onClick={() => navigate("create")}
            >
              <AiOutlinePlus />
            </button>
            <h1 className="text-md text-bold"> Create New Instructor</h1>
          </div> */}
        </div>
        <div className="lg:flex justify-between items-center font-semibold">
          <FilterArray
            list={["all", "active", "blocked"]}
            handleClick={handleFilter}
          />
        </div>
        <div
          className={`overflow-x-scroll lg:overflow-hidden ${
            theme === "light" ? "bg-gray-100" : "bg-gray-900"
          } p-3 rounded-lg`}
        >
          {instructors && (
            <table className="w-full min-w-max table-auto">
              <thead
                className={`font-normal ${
                  theme === "light" ? "bg-gray-200" : "bg-gray-800"
                } rounded-sm`}
              >
                <tr className="">
                  <th className="admin-table-head text-center py-3">
                    Instructor Name
                  </th>
                  <th className="admin-table-head text-center py-3">Email</th>
                  <th className="admin-table-head text-center py-3">
                    Phone No
                  </th>
                  <th className="admin-table-head text-center py-3">Status</th>
                  <th className="admin-table-head text-center py-3">Joined</th>
                  <th className="admin-table-head text-center py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {instructors.map((admin: Admin, index: number) => {
                  const isLast = index === instructors.length - 1;

                  return (
                    <TableRow
                      isLast={isLast}
                      admin={admin}
                      key={index}
                      toggleBlockUnBlockModal={toggleBlockUnBlockModal}
                      fetchInstructors={()=>{dispatch(getInstructors())}}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
