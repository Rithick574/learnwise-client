import { FC, useState } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useTheme } from "@/components/ui/theme-provider";
import { TiTick } from "react-icons/ti";
import { AiOutlineCalendar, AiOutlineCheckCircle, AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { VscGithubAlt } from "react-icons/vsc";
import { PiInstagramLogo } from "react-icons/pi";
import { RiLinkedinLine } from "react-icons/ri";
import { Modal } from "@/components/admin/Modal";
import { EditProfile } from "@/components/student/EditProfile";
import ResetPasswordEditProfile from "@/components/auth/ResetPasswordEditProfile";

export const Profile: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const { theme } = useTheme();
  const textStyle = "text-white-600";
  const notAvailableStyle = "text-red-500";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const displayContent = (content: string | undefined) => {
    return content ? (
      <span className={textStyle}>{content}</span>
    ) : (
      <span className={notAvailableStyle}>Not Given</span>
    );
  };
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleResetPasswordModal = () => setIsResetPasswordModalOpen(!isResetPasswordModalOpen);


  return (
    <div className="p-5 mt-3 w-full overflow-y-auto text-sm">
      <div className="cover-photo-container h-52 w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg overflow-hidden"></div>
      <div className="profile-info-container relative -mt-16 px-4">
        <div className="profile-pic-container w-32 h-32 bg-white p-1 rounded-full overflow-hidden border-4 border-white">
          <img
            src={user.profile?.avatar || "../ui/empty-profile.webp"}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <div className="flex justify-between items-start">
          <div className="ml-36 -mt-16">
            <h1 className="font-bold mt-4 text-2xl">Profile Settings</h1>
            <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
              <p className="text-green-500 font-semibold">Dashboard</p>
              <span>
                <BsCaretRightFill />
              </span>
              <p className="font-semibold">Profile</p>
            </div>
          </div>
        </div>
        <div
          className={`mt-4 -ml-4 ${
            theme === "light" ? "bg-gray-100" : "bg-gray-900"
          } p-5 rounded-lg shadow`}
        >
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-[15px] gap-6">
            <p>
              <AiOutlineMail className="inline mr-2" />
              <strong>Email:</strong> {displayContent(user.email)}
            </p>
            <p>
              <AiOutlineUser className="inline mr-2" />
              <strong>First Name:</strong> {displayContent(user.firstName)}
            </p>
            <p>
              <AiOutlineUser className="inline mr-2" />
              <strong>Last Name:</strong> {displayContent(user.lastName)}
            </p>
            <p>
              <AiOutlineUser className="inline mr-2" />
              <strong>Role:</strong> {displayContent(user.role)}
            </p>
            <p>
              <AiOutlineMail className="inline mr-2" />
              <strong>Additional Email:</strong>{" "}
              {displayContent(user?.contact?.additionalEmail)}
            </p>
            <p>
              <AiOutlinePhone className="inline mr-2" />
              <strong>Phone Number:</strong> {displayContent(user.phoneNumber)}
            </p>
            <p className="flex items-center">
              <AiOutlineCheckCircle className="inline mr-2" />
              <strong>Account Verified:</strong> {/* {user.isVerified ? ( */}
              <TiTick className="text-green-600 text-2xl ml-2" />
              {/* ) : (
                "Not Verified"
              )} */}
            </p>
            <p>
              <AiOutlineUser className="inline mr-2" />
              <strong>Gender:</strong> {displayContent(user?.profile?.gender)}
            </p>
            <p>
              <AiOutlineCalendar className="inline mr-2" />
              <strong>Date of Birth:</strong>{" "}
              {displayContent(user?.profile?.dob)}
            </p>
            <p className="flex">
              <VscGithubAlt className="inline mr-2" />
              <strong>GitHub: </strong>{" "}
              {user.contact?.socialMedia?.github ? (
                <span
                  className="text-blue-500 hover:text-blue-700 line-clamp-3 cursor-pointer ps-2"
                  onClick={() =>
                    window.open(user.contact.socialMedia.github, "_blank")
                  }
                >
                  GitHub
                </span>
              ) : (
                "Not Given"
              )}
            </p>
            <p className="flex">
              <RiLinkedinLine className="inline mr-2 mb-1" />
              <strong>LinkedIn:</strong>{" "}
              {user.contact?.socialMedia?.linkedIn ? (
                <span
                  className="text-blue-500 hover:text-blue-700 line-clamp-3 cursor-pointer ps-2"
                  onClick={() =>
                    window.open(user.contact.socialMedia.linkedIn, "_blank")
                  }
                >
                  LinkedIn
                </span>
              ) : (
                "Not Given"
              )}
            </p>
            <p className="flex">
              <PiInstagramLogo className="inline mr-2" />
              <strong>Instagram:</strong>{" "}
              {user.contact?.socialMedia?.instagram ? (
                <span
                  className="text-blue-500 hover:text-blue-700 cursor-pointer ps-2"
                  onClick={() =>
                    window.open(user.contact.socialMedia.instagram, "_blank")
                  }
                >
                  Instagram
                </span>
              ) : (
                "Not Given"
              )}
            </p>
          </div>
        </div>
        <div className="flex mt-4 justify-start gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={toggleModal}
          >
            Update Profile
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={toggleResetPasswordModal}
          >
            Reset Password
          </button>
        </div>
      </div>
      {isModalOpen && <Modal tab={<EditProfile closeToggle={toggleModal} />} />}
      {isResetPasswordModalOpen && <Modal tab={<ResetPasswordEditProfile closeToggle={toggleResetPasswordModal} />} />}
    </div>
  );
};
