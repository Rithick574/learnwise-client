import {FC} from 'react'
import { BsCaretRightFill } from 'react-icons/bs'
import MuxUploader from "@mux/mux-uploader-react"; 

export const InstructorAddTrailer:FC = () => {
  return (
    <div className="p-5 w-full overflow-y-auto text-sm">
    <div className="flex justify-between items-center font-semibold">
      <div>
        <h1 className="font-bold mt-4 text-2xl">Create Course</h1>
        <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
          <p className="text-green-500 font-semibold">My Course</p>
          <span>
            <BsCaretRightFill />
          </span>
          <p className="font-semibold">Create Course</p>
          <span>
            <BsCaretRightFill />
          </span>
          <p className="font-semibold">Add Trailer</p>
        </div>
      </div>
    </div>
    <div className='w-[50%] mt-10'>
      <MuxUploader endpoint="https://httpbin.org/put" />
    </div>
  </div>
  )
}

