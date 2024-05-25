import { FC, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { blockOrUnBlock, getInstructors } from "@/redux/actions/admin/adminAction";
import { AppDispatch } from "@/redux/store";
import { useTheme } from "../ui/theme-provider";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

interface BlockOrUnBlockProps {
  toggleModal: (data: any) => void; 
  data: { id: string; status: string };
}

const BlockOrUnBlock: FC<BlockOrUnBlockProps> = ({ toggleModal, data }) => {
  const { theme } = useTheme();
  const { id, status } = data;
  const dispatch = useDispatch<AppDispatch>();
  const [selectedStatus, setSelectedStatus] = useState(status ? "active" : "blocked");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSave = () => {
    if (selectedStatus === "") {
      return;
    }
    const params = new URLSearchParams(window.location.search);
    setSearchParams(params.toString() ? "?" + params.toString() : "");
    const isBlocked = selectedStatus !== "active";

    dispatch(blockOrUnBlock({ id, isBlocked }))
      .unwrap()
      .then(() => {
        toast.success("status changed")
        toggleModal("id");
        dispatch(getInstructors(searchParams))
      })
      .catch((error:any) => {
        console.error('Failed to update status:', error);
        toast.error('Failed to update status');
      });
  };

  return (
    <div className={`w-2/6  ${
      theme === "light" ? "bg-white" : "bg-gray-900"
    } p-5 rounded-lg`}>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Block User</h1>
        <AiOutlineClose
          className="text-2xl cursor-pointer hover:text-gray-500"
          onClick={() => toggleModal("id")}
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
  );
};

export default BlockOrUnBlock;
