import { AddCategory } from '@/components/admin/category/AddCategory';
import { CategoryTable } from '@/components/admin/category/CategoryTable';
import { EditCategory } from '@/components/admin/category/EditCategory';
import { FilterArray } from '@/components/admin/FilterArray';
import { Modal } from '@/components/admin/Modal';
import { SearchBar } from '@/components/admin/SearchBar'
import { useTheme } from '@/components/ui/theme-provider';
import { getAllCategories } from '@/redux/actions/admin/categoriesAction';
import { AppDispatch, RootState } from '@/redux/store';
import {FC, useEffect, useState} from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsCaretRightFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

export const AdminCategories:FC = () => {
  const {categories} = useSelector((state:RootState)=>state.category)
  console.log("🚀 ~ file: AdminCategories.tsx:16 ~ categories:", categories)
  const {theme} = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const [showModal, setShowModal] = useState(false)
  const [blockUnBlockModal, setBlockUnBlockModal] = useState(false);
  const [search, setSearch] = useState("");
  const [showTable,setShowTable] = useState(true)
  const [selectedOrderToUpdate, setSelectedOrderToUpdate] = useState({});
  const handleFilter = () => {
    
  };
  useEffect(() => {
    dispatch(getAllCategories())
}, [dispatch,showTable]);

const handleModalClose=async()=>{
  setShowModal(false)
}
const toggleBlockUnBlockModal = (data: any) => {
  setBlockUnBlockModal(!blockUnBlockModal);
  setSelectedOrderToUpdate(data);
};

  return (
   <>
{blockUnBlockModal && (
        <Modal
          tab={
            <EditCategory
              toggleModal={toggleBlockUnBlockModal}
              data={selectedOrderToUpdate as { id: string; status: boolean;title:string }}
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
            <h1 className="font-bold mt-4 text-2xl">Manage Categories</h1>
            <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
              <p className="text-green-500 font-semibold">Dashboard</p>
              <span>
                <BsCaretRightFill />
              </span>
              <p className="font-semibold">Category List</p>
            </div>
          </div>
          <div 
          className="flex gap-3 p-1 cursor-pointer bg-blue-600 rounded-md"
          onClick={() => setShowModal(!showModal)}
          >
            <button
              className="admin-button-fl rounded text-white"
            >
              <AiOutlinePlusCircle />
            </button>
            <h1 className="text-md text-white"> Add Category</h1>
          </div>
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
          {categories && (
            <table className="w-full min-w-max table-auto">
              <thead
                className={`font-normal ${
                  theme === "light" ? "bg-gray-200" : "bg-gray-800"
                } rounded-sm`}
              >
                <tr className="">
                <th className="admin-table-head text-center py-3">No.</th>
                  <th className="admin-table-head text-center py-3">Category Name</th>
                  <th className="admin-table-head text-center py-3">Created By</th>
                  <th className="admin-table-head text-center py-3">Status</th>
                  <th className="admin-table-head text-center py-3">Action</th>
                </tr>
              </thead>
              <tbody>
              {categories && categories.length>0 && categories.map((category, index) => {
                const isLast = index === categories.length - 1;
                return (
                  <CategoryTable
                    key={category._id}
                    isLast={isLast}
                    index={index+1}
                    category={category}
                    toggleBlockUnBlockModal={toggleBlockUnBlockModal}
                  />
                ); 
              })}
              </tbody>
            </table>
           )} 
        </div>
        {showModal && <Modal tab={<AddCategory closeToggle={handleModalClose} />} />}
     </div>
   </>
  )
}
