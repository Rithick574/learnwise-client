import { useTheme } from '@/components/ui/theme-provider';
import { editCategory } from '@/redux/actions/admin/categoriesAction';
import { AppDispatch } from '@/redux/store';
import {FC, useState} from 'react'
import toast from 'react-hot-toast';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';


interface EditCategoryprops {
    toggleModal: (data: any) => void; 
    data: { id: string; status: boolean; title:string; };
  }

export const  EditCategory:FC<EditCategoryprops> = ({ toggleModal, data }) => {
    const { theme } = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const { id, status,title } = data;
    const [selectedStatus, setSelectedStatus] = useState(status ? "active" : "blocked");
    const [newTitle, setNewTitle] = useState(title);
    const handleSave = async() => {
        if (selectedStatus === "") {
          return;
        }
       const FormData={
          _id:id,
          isBlocked: selectedStatus === "blocked",
          title:newTitle
        }
       
        const response = await dispatch(editCategory({ categoryData: FormData }));
        if(response.meta.requestStatus === "rejected"){
          toast.error(response.payload)
          return;
        }
        toast.success("category added");
        toggleModal(null);
       
    }    
    
  return (
    <div className={`w-2/6  ${
        theme === "light" ? "bg-white" : "bg-gray-900"
      } p-5 rounded-lg`}>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Edit Category</h1>
          <AiOutlineClose
            className="text-2xl cursor-pointer hover:text-gray-500"
            onClick={() => toggleModal("id")}
          />
        </div>
        <div className="flex flex-col gap-3 my-2">
                <label htmlFor="title" className="py-2">Title</label>
                <input
                    type="text"
                    id="title"
                    className={`px-5 py-2 w-full ${theme === "light" ? "bg-gray-300" : "bg-gray-700"} rounded-lg`}
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
            </div>
        <div className="flex gap-3 items-center my-2">
          <p className="py-5 shrink-0">Choose a Status</p>
          <select
            name="status"
            id="status"
            className={`capitalize px-5 py-2 w-full  ${
              theme === "light" ? "bg-gray-300" : "bg-gray-700"
            } rounded-lg`}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
             <option value="active" className="capitalize">
              active
            </option>
            <option value="blocked" className="capitalize">
              blocked
            </option>
          </select>
        </div>
        <button
          className={`btn-blue  ${
            theme === "light" ? "bg-gray-300" : "bg-gray-800"
          } uppercase w-full text-md p-2 rounded-sm`}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
  )
}

