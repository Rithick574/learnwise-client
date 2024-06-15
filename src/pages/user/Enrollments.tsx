import { SearchBar } from '@/components/admin/SearchBar'
import {FC, useState} from 'react'
import { BsCaretRightFill } from 'react-icons/bs'

export const Enrollments:FC = () => {
  const [search, setSearch] = useState("");
  const handleFilter=()=>{}
  return (
    <div className="p-5 w-full overflow-y-auto text-sm">
    <SearchBar
      handleClick={handleFilter}
      search={search}
      setSearch={setSearch}
    />
    <div className="flex justify-between items-center font-semibold">
      <div>
        <h1 className="font-bold mt-4 text-2xl">Manage Enrollment</h1>
        <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
          <p className="text-green-500 font-semibold">student</p>
          <span>
            <BsCaretRightFill />
          </span>
          <p className="font-semibold">Enrolled Courses</p>
        </div>
      </div>
      
    </div>
    </div>
  )
}

