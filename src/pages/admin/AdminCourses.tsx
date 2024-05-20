import { SearchBar } from "@/components/admin/SearchBar";
import { FC, useState } from "react";
import { BsCaretRightFill } from "react-icons/bs";

export const AdminCourses: FC = () => {
  const handleFilter = () => {};
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="p-5 w-full overflow-y-auto text-sm">
        <SearchBar
          handleClick={handleFilter}
          search={search}
          setSearch={setSearch}
        />
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold mt-4 text-2xl">Manage Courses</h1>
            <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
              <p className="text-green-500 font-semibold">Dashboard</p>
              <span>
                <BsCaretRightFill />
              </span>
              <p className="font-semibold">Course List</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
