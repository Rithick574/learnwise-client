import { URL } from "@/Common/api";
import { appJson } from "@/Common/configurations";
import { SearchBar } from "@/components/admin/SearchBar";
import { RootState } from "@/redux/store";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const StudentSubscriptions: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any>({});

  const handleFilter = () => {};

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await axios.get(`${URL}/payment/subscriptions/${user.email}`, appJson);
        const { data } = response.data;

        setSubscriptions(data);

        const instructorDetailsPromises = data.map(async (subscription: any) => {
          const instructorResponse = await axios.get(`${URL}/auth/find/${subscription.instructorId}`, appJson);
          return { [subscription.instructorId]: instructorResponse.data };
        });

        const instructorsArray = await Promise.all(instructorDetailsPromises);
        const instructorsData = instructorsArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        console.log("🚀 ~ file: StudentSubscriptions.tsx:34 ~ fetchSubscription ~ instructorsData:", instructorsData)

        setInstructors(instructorsData);
      } catch (error) {
        console.error("Error fetching subscription or instructor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  const handleSocialMediaClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    window.open(url, "_blank");
  };

  return (
    <div className="p-5 w-full overflow-y-auto text-sm">
      <SearchBar
        handleClick={handleFilter}
        search={search}
        setSearch={setSearch}
      />
      <div className="flex justify-between items-center font-semibold">
        <div>
          <h1 className="font-bold mt-4 text-2xl">Manage Subscription</h1>
          <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
            <p className="text-green-500 font-semibold">student</p>
            <span>
              <BsCaretRightFill />
            </span>
            <p className="font-semibold">Subscriptions</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          subscriptions.map(subscription => {
            const instructor = instructors[subscription.instructorId]?.data;
            return (
              <div key={subscription._id} className="p-4 border  rounded">
                {/* <p>Instructor: {instructor ? instructor.firstName : "Loading..."}</p> */}
                {instructor && (
                  <div className="flex flex-col items-center">
                    <img
                      className="rounded-lg w-48 h-48 object-cover"
                      src={instructor.profile?.avatar || "/ui/empty-profile.webp"}
                      alt={instructor.firstName}
                    />
                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-medium text-gray-400">
                        {instructor.firstName}
                      </h3>
                      <p className="text-indigo-600">{instructor.role}</p>
                      <div className="mt-2 flex justify-center space-x-4">
                        {instructor.contact?.socialMedia?.linkedIn && (
                          <span
                            onClick={(e) =>
                              handleSocialMediaClick(e, instructor.contact?.socialMedia?.linkedIn)
                            }
                            className="text-gray-400 hover:text-gray-500 cursor-pointer"
                          >
                            <span className="sr-only">LinkedIn</span>
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11 20h-3v-11h3v11zm-1.5-12.3c-1 0-1.7-.8-1.7-1.7s.8-1.7 1.7-1.7 1.7.8 1.7 1.7-.8 1.7-1.7 1.7zm13.5 12.3h-3v-5.6c0-1.3 0-3-1.8-3s-2.2 1.4-2.2 2.9v5.7h-3v-11h3v1.5c.6-.9 1.7-1.5 2.9-1.5 3.1 0 3.7 2 3.7 4.5v6.5z" />
                            </svg>
                          </span>
                        )}
                        {instructor.contact?.socialMedia?.github && (
                          <span
                            onClick={(e) =>
                              handleSocialMediaClick(e, instructor.contact?.socialMedia?.github)
                            }
                            className="text-gray-400 hover:text-gray-500 cursor-pointer"
                          >
                            <span className="sr-only">GitHub</span>
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 0C5.4 0 0 5.4 0 12c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.2.8-.5v-2c-3.3.7-4-1.5-4-1.5-.5-1.1-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.6 1.1 1.6 1.1 1 .1 2-.5 2-.5.2-.7.5-1.2.8-1.5-2.7-.3-5.5-1.3-5.5-6 0-1.4.5-2.5 1.3-3.4-.1-.3-.6-1.4.1-3 0 0 1-.3 3.4 1.3.9-.2 1.8-.3 2.7-.3.9 0 1.8.1 2.7.3 2.3-1.6 3.4-1.3 3.4-1.3.7 1.6.2 2.7.1 3 .8.9 1.3 2 1.3 3.4 0 4.7-2.8 5.6-5.5 6 .5.4.9 1.2.9 2.3v3.5c0 .3.2.6.8.5C20.6 21.8 24 17.3 24 12c0-6.6-5.4-12-12-12z" />
                            </svg>
                          </span>
                        )}
                        {instructor.contact?.socialMedia?.instagram && (
                          <span
                            onClick={(e) =>
                              handleSocialMediaClick(e, instructor.contact?.socialMedia?.instagram)
                            }
                            className="text-gray-400 hover:text-gray-500 cursor-pointer"
                          >
                            <span className="sr-only">Instagram</span>
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 0C8.7 0 8.3 0 7.1 0H7c-1.1 0-2.2.4-3 .9C3.4 1.4 2.6 2.2 2.1 3c-.5.8-.9 1.9-.9 3v.1c0 1.2 0 1.6 0 4.9s0 3.7 0 4.9c0 1.2.4 2.2.9 3 .5.8 1.3 1.6 2.1 2.1.8.5 1.9.9 3 .9h.1c1.2 0 1.6 0 4.9 0s3.7 0 4.9 0h.1c1.2 0 2.2-.4 3-.9.8-.5 1.6-1.3 2.1-2.1.5-.8.9-1.9.9-3v-.1c0-1.2 0-1.6 0-4.9s0-3.7 0-4.9v-.1c0-1.1-.4-2.2-.9-3-.5-.8-1.3-1.6-2.1-2.1-.8-.5-1.9-.9-3-.9H16.9C15.7 0 15.3 0 12 0zm0 5.8c1.7 0 1.9 0 2.6 0h.1c.7 0 1.3.1 1.8.3.4.2.7.4 1 .7.3.3.5.6.7 1 .2.4.3.9.3 1.8 0 .7 0 .9 0 2.6 0 1.7 0 1.9 0 2.6 0 .7-.1 1.3-.3 1.8-.2.4-.4.7-.7 1-.3.3-.6.5-1 .7-.4.2-.9.3-1.8.3-.7 0-.9 0-2.6 0-1.7 0-1.9 0-2.6 0-.7 0-.9 0-1.8-.3-.4-.2-.7-.4-1-.7-.3-.3-.5-.6-.7-1-.2-.4-.3-.9-.3-1.8 0-.7 0-.9 0-2.6 0-1.7 0-1.9 0-2.6 0-.7.1-1.3.3-1.8.2-.4.4-.7.7-1 .3-.3.6-.5 1-.7.4-.2.9-.3 1.8-.3h.1c.7 0 .9 0 2.6 0zm0 2.4c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2 3.2-1.4 3.2-3.2-1.4-3.2-3.2-3.2zm0 5.2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm4.5-5.6c-.5 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
                            </svg>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <p className="text-center p-1 mt-4">Status: {subscription.status}</p>
                <p className="text-center p-1">Amount: ₹{subscription.amount}</p>
                <p className="text-center p-1">Current Period End: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default StudentSubscriptions;
