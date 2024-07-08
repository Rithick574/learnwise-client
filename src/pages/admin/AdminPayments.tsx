import { FilterArray } from "@/components/admin/FilterArray";
import { SearchBar } from "@/components/admin/SearchBar";
import CustomPagination from "@/components/public/Pagination";
import { useTheme } from "@/components/ui/theme-provider";
import { getPayments } from "@/redux/actions/admin/paymentAction";
import { AppDispatch, RootState } from "@/redux/store";
import { FC, useEffect, useState } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const AdminPayments: FC = () => {
  const { payments, totalAvailablePayments } = useSelector((state: RootState) => state.payments);
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  // Filtering
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilter = (type: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "") {
      if (type === "page") {
        setPage(1);
      }
      params.delete(type);
    } else {
      if (type === "page" && value === "1") {
        params.delete(type);
        setPage(1);
      } else {
        params.set(type, value);
        if (type === "page") {
          setPage(Number(value));
        }
      }
    }
    setSearchParams(params.toString() ? "?" + params.toString() : "");
  };

  useEffect(() => {
    dispatch(getPayments(searchParams));
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || "1"));
  }, [searchParams]);

  return (
    <>
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
        {payments && payments.length > 0 ? (
          <div
            className={`overflow-x-scroll  ${
              theme === "light" ? "bg-gray-100" : "bg-gray-900"
            } p-3 rounded-lg`}
          >
            <table className="table w-full min-w-max table-auto">
              <thead
                className={`font-normal ${
                  theme === "light" ? "bg-gray-200" : "bg-gray-800"
                } rounded-sm`}
              >
                <tr>
                  <th className="admin-table-head text-center">No:</th>
                  <th className="text-center">Student Name</th>
                  <th className="text-center">Course</th>
                  <th className="text-center">Created By</th>
                  <th className="text-center">Date</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Payment Mode</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((item, index) => {
                  const isLast = index === payments.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 ";
                  const adjustedIndex = (page - 1) * 10 + index + 1;
                  return (
                    <tr key={index}  className={`${classes} hover:bg-gray-800 active:bg-gray-300 cursor-pointer`}>
                      <td className="admin-table-row">{adjustedIndex}</td>
                      <td className="flex justify-center">
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={item?.studentAvatar ||  "../ui/empty-profile.webp"}
                                alt={`${item.studentName}'s Avatar`}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.studentName}</div>
                            <div className="text-sm opacity-50">{item.studentEmail}</div>
                          </div>
                        </div>
                      </td>


                      <td className="text-center">
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={item?.courseThumbnail}
                                alt={`${item.course}`}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.course}</div>
                          </div>
                        </div>
                      </td>

                      <td className="text-center">
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={item?.instructorAvatar ||  "../ui/empty-profile.webp"}
                                alt={`${item.createdBy}'s Avatar`}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.createdBy}</div>
                            <div className="text-sm opacity-50">{item.instructorEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">{new Date(item.date).toLocaleDateString()}</td>
                      <td className="text-center">{item.price}</td>
                      <td className="text-center">Card</td>
                      <td className="text-center capitalize">
                       <span className="bg-green-100 text-green-600 px-3 py-1 rounded-lg capitalize w-fit text-sm font-semibold">Success</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/3 lg:left-1/2 lg:right-1/2">
            <p className="w-44">No payments yet</p>
          </div>
        )}
        <div className="py-5">
          {totalAvailablePayments > 10 && (
            <CustomPagination
              handleClick={handleFilter}
              page={page}
              number={10}
              totalNumber={totalAvailablePayments}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPayments;
