import { FC, useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import axios from "axios";
import { config } from "@/Common/configurations";
import { URL } from "@/Common/api";
import { BiSolidCategory } from "react-icons/bi";
import { IoPricetags } from "react-icons/io5";

interface FilterUserDashboardProps {
  filters: string[];
  price: string;
  handleClick: (param: string, value: string | number) => void;
  clearFilters: () => void;
}

const FilterUserDashboard: FC<FilterUserDashboardProps> = ({ filters, price, handleClick, clearFilters }) => {
  const [categories, setCategories] = useState<{ _id: string; title: string }[]>([]);

  const loadCategories = async () => {
    const { data } = await axios.get(`${URL}/course/category/available`, config);
    setCategories(data.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="lg:w-1/5  text-lg p-4">
      <ul className="hidden lg:block space-y-3">
        <li className="uppercase flex gap-2">Category
            <BiSolidCategory className="mt-1 text-xl"/>
        </li>

        {categories.map((item) => {
          return (
            <li className="category-li" key={item?._id}>
              <input
                type="checkbox"
                name="category"
                value={item._id}
                checked={filters.includes(item?._id)}
                onChange={(e) => handleClick("category", e.target.value)}
              />{" "}
              {item.title}
            </li>
          );
        })}

        <li className="uppercase flex gap-2">Price Range
        <IoPricetags className="mt-1 text-lg" />
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value=""
            checked={price === ""}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          All Price
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value="Under 1000"
            checked={price === "Under 1000"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          Under 1000₹
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value="1000-2000"
            checked={price === "1000-2000"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          1000₹ - 2000₹
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value="2000-5000"
            checked={price === "2000-5000"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          2000₹ - 5000₹
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value="5000-10000"
            checked={price === "5000-10000"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          5000₹ - 10000₹
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value="Above 10000"
            checked={price === "Above 10000"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          Above 10000{" "}
        </li>
        <li>
          <button
            onClick={clearFilters}
            className="bg-gray-800  outline-none px-4 py-1 rounded-lg font-semibold flex items-center gap-2"
          >
            <BiTrash />
            <p className="text-xs">Clear filters</p>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default FilterUserDashboard;
