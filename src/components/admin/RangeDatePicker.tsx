import { FC, useState, useEffect, useRef } from "react";
import { format, isAfter } from "date-fns";
import { DayPicker,DateRange  } from "react-day-picker";
import { AiOutlineCalendar } from "react-icons/ai";
import { useTheme } from "@/components/ui/theme-provider";

interface RangeDatePickerProps {
  handleFilter: (field: string, value: string) => void;
  startingDate: string;
  setStartingDate: (date: string) => void;
  endingDate: string;
  setEndingDate: (date: string) => void;
}

export const RangeDatePicker: FC<RangeDatePickerProps> = ({
  handleFilter,
  startingDate,
  setStartingDate,
  endingDate,
  setEndingDate,
}) => {
  const { theme } = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  const today = new Date();
  const datePickerRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const startDate = params.get("startingDate");
    const endDate = params.get("endingDate");
    if (startDate) {
      setStartingDate(startDate);
      handleFilter("startingDate", startDate);
    }
    if (endDate) {
      setEndingDate(endDate);
      handleFilter("endingDate", endDate);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const themeClass = theme === "light" ? "theme-light" : "theme-dark";

  return (
    <div className={`relative ${themeClass}`} ref={datePickerRef}>
    <button
      onClick={toggleDatePicker}
      className={`cursor-pointer admin-button-fl ${theme === "light" ? "bg-white" : "bg-gray-900"}`}
    >
      <AiOutlineCalendar />
      {startingDate || endingDate
        ? `${startingDate || `-`} to ${endingDate || `-`}`
        : "Select Date"}
    </button>
    {showDatePicker && (
        <div className={`px-3 py-2 rounded-lg shadow-2xl absolute right-0 top-10 text-sm ${theme === "light" ? "bg-white" : "bg-gray-900 text-gray-200"}`}>
          <DayPicker
            defaultMonth={today}
            mode="range"
            selected={range}
            showOutsideDays
            disabled={(date) => isAfter(date, today)}
            onSelect={(pickedDate: any) => { 
              setRange(pickedDate);
              if (pickedDate && pickedDate.from) {
                setStartingDate(
                  format(new Date(pickedDate.from), "yyyy-MM-dd")
                );
              }
              if (pickedDate && pickedDate.to) {
                setEndingDate(format(new Date(pickedDate.to), "yyyy-MM-dd"));
              }
            }}
          />
          <div className="flex gap-2">
            <button
              className={`btn-blue w-full ${themeClass}`}
              onClick={() => {
                toggleDatePicker();
                handleFilter("startingDate", startingDate);
                handleFilter("endingDate", endingDate);
              }}
            >
              Save
            </button>
            <button
              className={`btn-red-borde ${themeClass}`}
              onClick={() => {
                setStartingDate("");
                setEndingDate("");
                toggleDatePicker();
                setRange(undefined);
                handleFilter("startingDate", "");
                handleFilter("endingDate", "");
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
