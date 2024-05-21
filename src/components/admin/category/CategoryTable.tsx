import { FC } from "react";
import date from "date-and-time";
import { StatusComponent } from "../StatusComponent";
import { FcEditImage } from "react-icons/fc";

interface CategoryTableProps {
  isLast: boolean;
  index: number;
  category: any;
  toggleBlockUnBlockModal: (data: {
    id: string;
    status: boolean;
    title: string;
  }) => void;
}

export const CategoryTable: FC<CategoryTableProps> = ({
  isLast,
  index,
  category,
  toggleBlockUnBlockModal,
}) => {
  return (
    <tr className={isLast ? "last-row" : ""} key={index}>
      <td className="text-center py-3">{index}</td>
      <td className="text-center py-3">
        <span>{category.title}</span>
      </td>
      <td className="text-center py-3">
        {category.createdAt
          ? date.format(new Date(category.createdAt), "MMM DD YYYY")
          : "No Data"}
      </td>
      <td className="text-center py-3">
        <StatusComponent status={category.isBlocked ? "Blocked" : "Active"} />
      </td>
      <td className="text-center py-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBlockUnBlockModal({
              id: category._id,
              status: category.isBlocked,
              title: category.title,
            });
          }}
        >
          <FcEditImage style={{ fontSize: "20px" }} />
        </button>
      </td>
    </tr>
  );
};
