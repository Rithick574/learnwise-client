import {FC} from "react";
import { AiOutlineDelete } from "react-icons/ai";

interface ClearFilterButtonProps {
    handleClick: () => void; 
  }

const ClearFilterButton:FC<ClearFilterButtonProps> = ({ handleClick }) => {
  return (
    <button
      className="admin-button-fl bg-white hover:bg-gray-200 active:bg-gray-300"
      onClick={handleClick}
    >
      <AiOutlineDelete />
      Clear Filters
    </button>
  );
};

export default ClearFilterButton;
