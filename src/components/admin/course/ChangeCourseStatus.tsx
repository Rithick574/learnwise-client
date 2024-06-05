import { FC, useState } from "react";
import { useTheme } from "@/components/ui/theme-provider";
import { AiOutlineClose } from "react-icons/ai";

interface BlockOrUnBlockProps {
  toggleModal: (data: any) => void;
  data: { id: string; status: string };
  handleSave: (id: string, status: string) => void;
}

export const ChangeCourseStatus: FC<BlockOrUnBlockProps> = ({ toggleModal, data, handleSave }) => {
  const { theme } = useTheme();
  const [selectedStatus, setSelectedStatus] = useState(data.status);

  const handleSaveClick = () => {
    handleSave(data.id, selectedStatus);
    toggleModal(null);
  };

  return (
    <div className={`w-2/6 ${theme === "light" ? "bg-white" : "bg-gray-900"} p-5 rounded-lg`}>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Change Course Status</h1>
        <AiOutlineClose
          className="text-2xl cursor-pointer hover:text-gray-500"
          onClick={() => toggleModal(null)}
        />
      </div>
      <div className="flex gap-3 items-center my-2">
        <p className="py-5 shrink-0">Choose a Status</p>
        <select
          name="status"
          id="status"
          className={`capitalize px-5 py-2 w-full ${theme === "light" ? "bg-gray-300" : "bg-gray-700"} rounded-lg`}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="active" className="capitalize">active</option>
          <option value="blocked" className="capitalize">blocked</option>
        </select>
      </div>
      <button
        className={`btn-blue ${theme === "light" ? "bg-gray-300" : "bg-gray-800"} uppercase w-full text-md p-2 rounded-sm`}
        onClick={handleSaveClick}
      >
        Save
      </button>
    </div>
  );
};
