import { SearchBar } from '@/components/admin/SearchBar'
import {FC, useState} from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsCaretRightFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

export const InstructorMyCourses:FC = () => {
    const handleFilter = () => {};
  const [search, setSearch] = useState("");
  const navigate = useNavigate()
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
            <h1 className="font-bold mt-4 text-2xl">My Courses</h1>
            <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
              <p className="text-green-500 font-semibold">Dashboard</p>
              <span>
                <BsCaretRightFill />
              </span>
              <p className="font-semibold">Course List</p>
            </div>
          </div>
          <div 
          className="flex gap-3 p-[6px] cursor-pointer bg-blue-600 rounded-lg"
          onClick={() => navigate('/instructor/courses/addcourse')}
          >
            <button
              className="admin-button-fl rounded text-white"
            >
              <AiOutlinePlusCircle />
            </button>
            <h1 className="text-md text-white">Add Course</h1>
          </div>
        </div>



      </div>
    </>
  )
}

 