import Skeleton from "@/components/ui/Skeleton";
import { useTheme } from "@/components/ui/theme-provider";
import { useState } from "react";

const Courses = () => {
  const [initialLoading, _setIntialLoading] = useState<boolean>(true);
  const { theme } = useTheme();

  return (
    <>
      <div className="w-full mt-[10px] mr-40">
        <div className="container">
          <div className="row">
            <div className="mt-5">
              <div className="flex justify-center">
                <span className="text-green-500 top-title text-2xl font-semibold mt-4">
                  Courses
                </span>
              </div>
              <br />
              <h4 className="text-center font-semibold text-4xl mt-5">
                Expand Your Career Opportunity
                <br />
                With Our Courses
              </h4>
            </div>

            <div className="mt-14">
              {initialLoading && (
                <>
                  <div
                    className={`w-full flex items-center justify-center ${
                      theme === "light" ? "bg-gray-100" : "bg-gray-800"
                    } rounded-md overflow-hidden px-2 py-3`}
                  >
                    <div
                      className={`w-5/12 ${
                        theme === "light" ? "bg-white" : "bg-gray-800"
                      } shadow`}
                    >
                      <Skeleton width={"100%"} height={"220px"} />
                    </div>
                    <div className="w-7/12 ps-4 flex flex-col gap-1">
                      <Skeleton width={"40%"} height={"10px"} />
                      <Skeleton width={"90%"} height={"14px"} />
                      <Skeleton width={"100%"} height={"14px"} />
                      <Skeleton width={"70%"} height={"14px"} />
                      <Skeleton width={"40%"} height={"14px"} />
                      <Skeleton width={"20%"} height={"20px"} />
                    </div>
                  </div>
                  <div className={`w-full mt-4 flex items-center justify-center ${
                      theme === "light" ? "bg-gray-100" : "bg-gray-800"
                    } rounded-md overflow-hidden px-2 py-3`}
                    >
                    <div
                      className={`w-5/12 ${
                        theme === "light" ? "bg-white" : "bg-gray-800"
                      } shadow`}
                    >
                      <Skeleton width={"100%"} height={"220px"} />
                    </div>
                    <div className="w-7/12 ps-4 flex flex-col gap-1">
                      <Skeleton width={"40%"} height={"10px"} />
                      <Skeleton width={"90%"} height={"14px"} />
                      <Skeleton width={"100%"} height={"14px"} />
                      <Skeleton width={"70%"} height={"14px"} />
                      <Skeleton width={"40%"} height={"14px"} />
                      <Skeleton width={"20%"} height={"20px"} />
                    </div>
                  </div>
                  <div className={`w-full mt-4 flex items-center justify-center ${
                      theme === "light" ? "bg-gray-100" : "bg-gray-800"
                    } rounded-md overflow-hidden px-2 py-3`}
                    >
                    <div
                      className={`w-5/12 ${
                        theme === "light" ? "bg-white" : "bg-gray-800"
                      } shadow`}
                    >
                      <Skeleton width={"100%"} height={"220px"} />
                    </div>
                    <div className="w-7/12 ps-4 flex flex-col gap-1">
                      <Skeleton width={"40%"} height={"10px"} />
                      <Skeleton width={"90%"} height={"14px"} />
                      <Skeleton width={"100%"} height={"14px"} />
                      <Skeleton width={"70%"} height={"14px"} />
                      <Skeleton width={"40%"} height={"14px"} />
                      <Skeleton width={"20%"} height={"20px"} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
