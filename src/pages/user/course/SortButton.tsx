import { FC } from "react";

interface SortButtonProps {
  sort: string;
  handleClick: (param: string, value: string | number) => void;
}

const SortButton: FC<SortButtonProps> = ({ sort, handleClick }) => {
  const handleChange = (sort: string, value: string | number) => {
    handleClick(sort, value);
  };

  return (
    <div className={`shrink-0 flex gap-2 items-center`}>
      <p className="shrink-0"> Sort By:</p>
      <select
        className="rounded-lg outline-none px-2 py-1 border-"
        value={sort}
        onChange={(e) => {
          handleChange("sort", e.target.value);
        }}
      >
        <option className="hover:bg-gray-200 py-2 px-3 rounded-lg" value="">
          Newest to Oldest
        </option>
        <option
          className="hover:bg-gray-200 py-2 px-3 rounded-lg"
          value="created-desc"
        >
          Oldest to newest
        </option>
        <option
          className="hover:bg-gray-200 py-2 px-3 rounded-lg"
          value="price-asc"
        >
          Price Low to High
        </option>
        <option
          className="hover:bg-gray-200 py-2 px-3 rounded-lg"
          value="price-desc"
        >
          Price High to Low
        </option>
      </select>
    </div>
  );
};

export default SortButton;
