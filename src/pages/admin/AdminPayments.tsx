import { FilterArray } from '@/components/admin/FilterArray';
import { SearchBar } from '@/components/admin/SearchBar';
import { useTheme } from '@/components/ui/theme-provider'
import {FC, useState} from 'react'
import { BsCaretRightFill } from 'react-icons/bs';

const AdminPayments:FC = () => {
  const {theme} =useTheme();
  const [search, setSearch] = useState("");
  const handleFilter=()=>{

  }
  return (
    <div className="p-5 w-full overflow-y-auto text-sm">
       <SearchBar
          handleClick={handleFilter}
          search={search}
          setSearch={setSearch}
        />
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold mt-4 text-2xl">Manage Payments</h1>
            <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
              <p className="text-green-500 font-semibold">admin</p>
              <span>
                <BsCaretRightFill />
              </span>
              <p className="font-semibold">Payment List</p>
            </div>
          </div>
        </div>
        <div className="lg:flex justify-between items-center font-semibold">
          <FilterArray
            list={["all", "successful", "unsuccessful"]}
            handleClick={handleFilter}
          />
        </div>
    <div className={`overflow-x-auto lg:overflow-hidden ${
      theme === "light" ? "bg-gray-100" : "bg-gray-900"
    } p-3 rounded-lg`}>
  <table className="table w-full min-w-max table-auto">
    <thead  className={`font-normal ${
                  theme === "light" ? "bg-gray-200" : "bg-gray-800"
                } rounded-sm`}>
      <tr>
        <th className='text-center'>Student Name</th>
        <th className='text-center'>Course</th>
        <th className='text-center'>Created By</th>
        <th className='text-center'>Price</th>
        <th className='text-center'>status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
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
          <br/>
          <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
        <td>Karthik</td>
        <th>
          <button className="btn btn-ghost btn-xs">₹ 1999</button>
        </th>
        <td>successful</td>
      </tr>
     
    </tbody>
    
  </table>
</div>
</div>
  )
}

export default AdminPayments