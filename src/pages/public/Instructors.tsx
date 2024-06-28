import MentorSectionCardLoading from "@/components/home/MentorSectionCardLoading";
import { AppDispatch, RootState } from "@/redux/store";
import { useState, FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import notFoundLogo from "@/assets/3828537-removebg-preview.png";
import notFoundLogoInDark from "@/assets/6358482-removebg-preview.png";
import { useTheme } from "@/components/ui/theme-provider";
import { getInstructors } from "@/redux/actions/admin/adminAction";

export const Instructors: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [loading, setLoading] = useState<boolean>(true);
  const [mentors, setMentors] = useState<any>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchParams(params.toString() ? "?" + params.toString() : "");
    dispatch(getInstructors(searchParams))
      .then((res) => {
        if (res.payload.instructors) setMentors(res.payload.instructors);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, searchParams]);

  const handleInstructorClick = (
    e: React.MouseEvent,
    _id: string,
    email: string
  ) => {
    e.stopPropagation();
    if (user) {
      navigate(`/student/instructors/${_id}`, { state: { email } })
    } else {
      navigate(`/instructors/${_id}`, { state: { email } });
    }
  };

  const handleSocialMediaClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-500 font-semibold tracking-wide uppercase">
            Our Team
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-200 sm:text-4xl">
            We're a dynamic group of individuals who are passionate about what
            we do and dedicated to delivering the best results for our clients.
          </p>
        </div>
      </div>
      {!loading && (!mentors || mentors?.length === 0) && (
        <div className="w-full pt-6 flex flex-col gap-2 items-center justify-center">
          <h2 className="font-bold text-3xl pb-6">
            Unfortunately, there are no instructors available!
          </h2>
          <img
            src={`${theme === "light" ? notFoundLogo : notFoundLogoInDark}`}
            alt=""
            className="h-100"
          />
        </div>
      )}
      {loading && (
        <div className="flex flex-wrap -mx-4">
          <>
            <MentorSectionCardLoading />
            <MentorSectionCardLoading />
            <MentorSectionCardLoading />
            <MentorSectionCardLoading />
          </>
          <>
            <MentorSectionCardLoading />
            <MentorSectionCardLoading />
            <MentorSectionCardLoading />
            <MentorSectionCardLoading />
          </>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mentors?.map(
          (item: {
            _id: string;
            profile?: { avatar?: string };
            firstName: string;
            email: string;
            role: string;
            contact?: {
              socialMedia?: {
                linkedIn?: string | any;
                github?: string | any;
                instgram?: string | any;
              };
            };
          }) => (
            <div
              key={item._id}
              onClick={(e) => handleInstructorClick(e, item._id, item.email)}
              className={`w-full rounded-lg p-12 flex flex-col justify-center items-center`}
            >
              <li key={item.firstName} className="flex flex-col items-center">
                <img
                  className="rounded-lg w-48 h-48 object-cover"
                  src={item.profile?.avatar || "/ui/empty-profile.webp"}
                  alt={item.firstName}
                />
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium text-gray-400">
                    {item.firstName}
                  </h3>
                  <p className="text-indigo-600">{item.role}</p>
                  <div className="mt-2 flex justify-center space-x-4">
                    {item.contact?.socialMedia?.linkedIn && (
                      <span
                        onClick={(e) =>
                          handleSocialMediaClick(
                            e,
                            item.contact?.socialMedia?.linkedIn
                          )
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
                    {item.contact?.socialMedia?.github && (
                      <span
                        onClick={(e) =>
                          handleSocialMediaClick(
                            e,
                            item.contact?.socialMedia?.github
                          )
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
                    {item.contact?.socialMedia?.instgram && (
                      <span
                        onClick={(e) =>
                          handleSocialMediaClick(
                            e,
                            item.contact?.socialMedia?.instgram
                          )
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
              </li>
            </div>
          )
        )}
      </div>
    </div>
  );
};
