import { FC, useState } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useTheme } from "@/components/ui/theme-provider";
import { TiTick } from "react-icons/ti";
import { Formik, Form, Field } from "formik";
import { AiOutlineCalendar, AiOutlineCheckCircle, AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { VscGithubAlt } from "react-icons/vsc";
import { PiInstagramLogo } from "react-icons/pi";
import { RiLinkedinLine } from "react-icons/ri";

export const Profile: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    additionalEmail: user.additionalEmail || "",
    phoneNumber: user.phoneNumber || "",
    github: user.contact?.socialMedia?.github || "",
    linkedIn: user.contact?.socialMedia?.linkedIn || "",
    instagram: user.contact?.socialMedia?.instagram || "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const initialValues = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    additionalEmail: user.additionalEmail || "",
    phoneNumber: user.phoneNumber || "",
    github: user.contact?.socialMedia?.github || "",
    linkedIn: user.contact?.socialMedia?.linkedIn || "",
    instagram: user.contact?.socialMedia?.instagram || "",
    profileImage: null,
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    toggleModal();
  };

  const textStyle = "text-white-600";
  const notAvailableStyle = "text-red-500";

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const displayContent = (content: string | undefined) => {
    return content ? (
      <span className={textStyle}>{content}</span>
    ) : (
      <span className={notAvailableStyle}>Not Given</span>
    );
  };

  return (
    <div className="p-5 w-full overflow-y-auto text-sm">
      <div className="cover-photo-container h-52 w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg overflow-hidden"></div>
      <div className="profile-info-container relative -mt-16 px-4">
        <div className="profile-pic-container w-32 h-32 bg-white p-1 rounded-full overflow-hidden border-4 border-white">
          <img
            src={user.profilePicture || "../ui/empty-profile.webp"}
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
            <p><AiOutlineMail className="inline mr-2" />
              <strong>Email:</strong> {displayContent(user.email)}
            </p>
            <p><AiOutlineUser className="inline mr-2" />
              <strong>First Name:</strong> {displayContent(user.firstName)}
            </p>
            <p><AiOutlineUser className="inline mr-2" />
              <strong>Last Name:</strong> {displayContent(user.lastName)}
            </p>
            <p><AiOutlineUser className="inline mr-2" />
              <strong>Role:</strong> {displayContent(user.role)}
            </p>
            <p><AiOutlineMail className="inline mr-2" />
              <strong>Additional Email:</strong>{" "}
              {displayContent(user.additionalEmail)}
            </p>
            <p><AiOutlinePhone className="inline mr-2" />
              <strong>Phone Number:</strong> {displayContent(user.phoneNumber)}
            </p>
            <p className="flex items-center">
            <AiOutlineCheckCircle className="inline mr-2" />
              <strong>Account Verified:</strong>{" "}
              {/* {user.isVerified ? ( */}
                <TiTick className="text-green-600 text-2xl ml-2" />
              {/* ) : (
                "Not Verified"
              )} */}
            </p>
            <p><AiOutlineUser className="inline mr-2" />
              <strong>Gender:</strong> {displayContent(user.gender)}
            </p>
            <p><AiOutlineCalendar className="inline mr-2" />
              <strong>Date of Birth:</strong> {displayContent(user.dob)}
            </p>
            <p><VscGithubAlt  className="inline mr-2" />
              <strong>GitHub:</strong>{" "}
              {user.contact?.socialMedia?.github ? (
                <a
                  href={user.contact.socialMedia.github}
                  className="text-blue-500 hover:text-blue-700 line-clamp-3 "
                >
                  {user.contact.socialMedia.github}
                </a>
              ) : (
                "Not Given"
              )}
            </p>
            <p><RiLinkedinLine className="inline mr-2 mb-1" />
              <strong>LinkedIn:</strong>{" "}
              {user.contact?.socialMedia?.linkedIn ? (
                <a
                  href={`https://www.linkedin.com/in/${user.contact.socialMedia.linkedIn}`}
                  className="text-blue-500 hover:text-blue-700 line-clamp-3"
                >
                  {user.contact.socialMedia.linkedIn}
                </a>
              ) : (
                "Not Given"
              )}
            </p>
            <p><PiInstagramLogo className="inline mr-2" />
              <strong>Instagram:</strong>{" "}
              {user.contact?.socialMedia?.instagram ? (
                <a
                  href={`https://www.instagram.com/${user.contact.socialMedia.instagram}`}
                  className="text-pink-500 hover:text-pink-700"
                >
                  {user.contact.socialMedia.instagram}
                </a>
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
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Reset Password
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center`}
        >
          <div className={`bg-white p-4 rounded-lg shadow-lg w-1/2`}>
            <h2 className="text-xl font-semibold">Update Profile</h2>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ setFieldValue }) => (
                <Form>
                  <Field
                    name="firstName"
                    placeholder="First Name"
                    className="block p-2 m-2 w-full rounded-md"
                  />
                  <Field
                    name="lastName"
                    placeholder="Last Name"
                    className="block p-2 m-2 w-full rounded-md"
                  />
                  <Field
                    name="additionalEmail"
                    type="email"
                    placeholder="Additional Email"
                    className="block p-2 m-2 w-full rounded-md"
                  />
                  <Field
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="block p-2 m-2 w-full rounded-md"
                  />
                  <Field
                    name="github"
                    placeholder="GitHub"
                    className="block p-2 m-2 w-full rounded-md"
                  />
                  <Field
                    name="linkedIn"
                    placeholder="LinkedIn"
                    className="block p-2 m-2 w-full rounded-md"
                  />
                  <Field
                    name="instagram"
                    placeholder="Instagram"
                    className="block p-2 m-2 w-full rounded-md"
                  />
                  <input
                    id="file"
                    name="profileImage"
                    type="file"
                    onChange={(event) => {
                      if (
                        event.currentTarget.files &&
                        event.currentTarget.files.length > 0
                      ) {
                        setFieldValue(
                          "profileImage",
                          event.currentTarget.files[0]
                        );
                      }
                    }}
                    className="block p-2 m-2 w-full rounded-md"
                  />

                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
                  >
                    Submit Changes
                  </button>
                  <button
                    onClick={toggleModal}
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 ml-4"
                  >
                    Close
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};
