import { useEffect, useState } from "react";
import { useTheme } from "@/components/ui/theme-provider";


interface FilterArrayProps {
  list: string[];
  handleClick: (action: string, value: string) => void; 
}

export const FilterArray = ({ list, handleClick }: FilterArrayProps) => {
  const { theme } = useTheme();
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>(list[0]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stat = params.get("status");
    if (stat) {
      setActiveStatusFilter(stat);
    }
  }, []);

  return (
    <div className={`flex justify-between gap-2 font-semibold ${theme === "light" ? "bg-white" : "bg-gray-900"}  text-gray-500  my-2 p-1 cursor-pointer shadow rounded-md text-sm`}>
      {list.map((status) => (
        <p
          key={status}
          className={
            activeStatusFilter === status
              ? `${theme === "light" ? "bg-gray-100" : "bg-gray-800"} rounded px-2 py-1 text-green-600 cursor-pointer`
              : "admin-status"
          }
          onClick={() => {
            setActiveStatusFilter(status);
            handleClick("page", "");

            if (status === "all") {
              handleClick("status", "");
            } else {
              handleClick("status", status);
            }
          }}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </p>
      ))}
    </div>
  );
};
