import {FC} from "react";
import date from "date-and-time";
import { StatusComponent } from "./StatusComponent";
import { useTheme } from "@/components/ui/theme-provider";
import { FcEditImage } from "react-icons/fc";

interface Admin {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isBlocked: boolean;
    createdAt?: string;  
    _id: string;
}

interface TableRowProps {
    isLast: boolean;
    admin: Admin;
    toggleBlockUnBlockModal: (data: { id: string; status: boolean }) => void;
    fetchInstructors:()=>void;
}

export const TableRow: FC<TableRowProps> = ({ isLast, admin, toggleBlockUnBlockModal,fetchInstructors }) => {
    const { theme } = useTheme();
    const classes = isLast ? "p-4" : "p-4 border-b border-gray-200 ";

    const bgClasses = theme === "light" ? "hover:bg-gray-200 active:bg-gray-300" : "hover:bg-gray-800 active:bg-gray-900";

    return (
        <tr className={`${classes} ${bgClasses} hover:bg-gray-200 active:bg-gray-300 cursor-pointer`}>
            <td className="admin-table-row text-center gap-2">
                
                {admin.firstName} {admin.lastName}
            </td>
            <td className="admin-table-row text-center py-3">{admin.email}</td>
            <td className="admin-table-row text-center py-3">{admin.phoneNumber}</td>
            <td className="admin-table-row text-center py-3">
                <StatusComponent status={admin.isBlocked ? "Blocked" : "Active"} />
            </td>
            <td className="admin-table-row text-center py-3">
                {admin.createdAt ? date.format(new Date(admin.createdAt), "MMM DD YYYY") : "No Data"}
            </td>
            <td className="admin-table-row">
                <div className="flex items-center justify-center gap-2 text-lg">
                    <span
                          className={`${theme === "light" ? "hover:text-gray-500" : "hover:text-gray-900"}`}
                          onClick={(e) => {
                              e.stopPropagation();
                              toggleBlockUnBlockModal({
                                  id: admin._id,
                                  status: admin.isBlocked,
                              });
                              fetchInstructors()
                          }}
                      >
                          <FcEditImage/>
                    </span>
                </div>
            </td>
        </tr>
    );
};
