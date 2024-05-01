import MentorSectionCardLoading from "@/components/home/MentorSectionCardLoading";
import { AppDispatch } from "@/redux/store";
import { useState, FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import notFoundLogo from "@/assets/3828537-removebg-preview.png"
import notFoundLogoInDark from "@/assets/6358482-removebg-preview.png"
import { useTheme } from "@/components/ui/theme-provider";

export const Instructors: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const { theme } = useTheme();
  const [loading, setLoading] = useState<boolean>(true);
  const [mentors, setMentors] = useState<any>(null);

  useEffect(()=>{
  //   dispatch(getInstructorsAction({})).then((res) => {
  //     if (res.payload?.success) setMentors(res.payload?.data);
  // }).finally(() => {
  //     setLoading(false);
  // });
  },[])

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      {!loading && (!mentors || mentors?.length === 0) && (
        <div className="w-full pt-6 flex flex-col gap-2 items-center justify-center">
          <h2 className="font-bold text-3xl pb-6">
            Unfortunately, there are no instructors available!
          </h2>
          <img src={`${theme === "light" ? notFoundLogo  : notFoundLogoInDark }`} alt="" className="h-100" />
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
            username: string;
            email: string;
          }) => (
            <div
              onClick={() => {
              navigate(`/instructors/${item.username}`);
              }}
              className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center"
            >
              <div className="mb-8">
                <img
                  className="object-center object-cover rounded-full h-36 w-36"
                  src={`${item.profile?.avatar || "/ui/empty-profile.webp"}`}
                  alt="photo"
                />
              </div>
              <div className="text-center">
                <p className="text-xl text-gray-700 font-bold mb-2">
                  {item.username}
                </p>
                <p className="text-base text-gray-400 font-normal">
                  {item.email}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
