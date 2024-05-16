import { getPassedDateOnwardDateForInput } from "@/Common/functions";
import { AppDispatch, RootState } from "@/redux/store";
import { Formik, Form, ErrorMessage } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import {
  AiOutlineClose,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import InputWithIcon from "../auth/InputWithIcon";
import { RiCalendarEventFill, RiLinkedinLine } from "react-icons/ri";
import { useTheme } from "../ui/theme-provider";
import { CustomSingleFileInput } from "../public/CustomSingleFileInput";
import { GenderDropdown } from "../auth/GenderDropdown";
import { SocialMediaInput } from "../public/SocialMediaInput";
import { VscGithubAlt } from "react-icons/vsc";
import { PiInstagramLogo } from "react-icons/pi";
import { editUserProfile } from "@/redux/actions/user/userActions";

interface EditProfileProps {
  closeToggle: () => void;
}

export const EditProfile: FC<EditProfileProps> = ({ closeToggle }) => {
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const initialValues = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phoneNumber: user.phoneNumber || "",
    profile: {
      avatar: user?.profile?.avatar || "",
      dob: getPassedDateOnwardDateForInput(user?.profile?.dob) || "",
      gender: user?.profile?.gender || "",
    },
    contact: {
      socialMedia: {
        instagram: user?.contact?.socialMedia?.instagram || "",
        github: user?.contact?.socialMedia?.github || "",
        linkedIn: user?.contact?.socialMedia?.linkedIn || "",
      },
      additionalEmail: user.contact?.additionalEmail || "",
    },
  };

  const handleSubmit = async (value: any) => {
    const formData = new FormData();
    formData.append("firstName", value.firstName);
    formData.append("lastName", value.lastName);
    formData.append("phoneNumber", value.phoneNumber);
    formData.append("profile.dob", value.profile.dob);
    formData.append("profile.gender", value.profile.gender);
    formData.append(
      "contact.socialMedia.instagram",
      value.contact.socialMedia.instagram
    );
    formData.append(
      "contact.socialMedia.github",
      value.contact.socialMedia.github
    );
    formData.append(
      "contact.socialMedia.linkedIn",
      value.contact.socialMedia.linkedIn
    );
    formData.append("contact.additionalEmail", value.contact.additionalEmail);
    formData.append("email", user.email);
    if (value.profile.avatar && value.profile.avatar !== "null") {
      formData.append("profile.avatar", value.profile.avatar);
    }
    dispatch(editUserProfile(formData));
    closeToggle();
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.number()
      .typeError("Phone number should be digits")
      .moreThan(999999999, "Not valid phone number"),
    profile: Yup.object().shape({
      dob: Yup.date().required("Date of birth is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    contact: Yup.object().shape({
      additionalEmail: Yup.string().email("Invalid email format"),
      socialMedia: Yup.object().shape({
        instagram: Yup.string().url("Invalid URL"),
        github: Yup.string().url("Invalid URL"),
        linkedIn: Yup.string().url("Invalid URL"),
      }),
    }),
  });

  return (
    <div
      className={`${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      } w-4/6 shadow-2xl overflow-y-auto h-screen lg:h-auto rounded-lg`}
    >
      <div
        className={`${
          theme === "light" ? "bg-white" : "bg-gray-800"
        } pt-5 pb-3 px-5 flex items-center justify-between`}
      >
        <h1 className="font-bold text-lg ">Edit Contact Details</h1>
        <AiOutlineClose
          className="text-xl cursor-pointer"
          onClick={closeToggle}
        />
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form className="lg:flex items-start gap-5 p-5">
            <div>
              {values.profile.avatar &&
              typeof values.profile.avatar === "string" ? (
                <div
                  className={`${
                    theme === "light" ? "bg-gray-100" : "bg-gray-900"
                  } py-5 rounded-lg text-center h-80`}
                >
                  <div className="h-56 w-56">
                    <img
                      src={values.profile?.avatar}
                      alt="profile"
                      className="h-full w-full object-cover rounded-full"
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setFieldValue("profile.avatar", null)}
                  >
                    Delete this
                  </button>
                </div>
              ) : (
                <CustomSingleFileInput
                  onChange={(file) => {
                    setFieldValue("profile.avatar", file);
                  }}
                  theme={theme}
                />
              )}
              <ErrorMessage
                className="text-sm text-red-500"
                name="profile.avatar"
                component="span"
              />
            </div>

            <div className="w-full">
              <div className="lg:grid grid-cols-2 gap-3 ">
                <InputWithIcon
                  icon={<AiOutlineUser />}
                  title="First Name"
                  name="firstName"
                  placeholder="Enter here"
                  as="text"
                  theme={theme}
                />
                <InputWithIcon
                  icon={<AiOutlineUser />}
                  title="Last Name"
                  name="lastName"
                  placeholder="Enter here"
                  as="text"
                  theme={theme}
                />

                <InputWithIcon
                  icon={<AiOutlinePhone />}
                  title="Phone Number"
                  name="phoneNumber"
                  placeholder="Enter here"
                  as="number"
                  theme={theme}
                />
                <InputWithIcon
                  icon={<RiCalendarEventFill />}
                  title="Date of birth"
                  name="profile.dob"
                  as="date"
                  placeholder="Enter here"
                  theme={theme}
                />
                <InputWithIcon
                  icon={<AiOutlineMail />}
                  title="Additional Email"
                  name="contact.additionalEmail"
                  placeholder="Enter here"
                  as="text"
                  theme={theme}
                />
                <GenderDropdown name="profile.gender" theme={theme} />
                <SocialMediaInput
                  title="GitHub"
                  name="contact.socialMedia.github"
                  icon={<VscGithubAlt />}
                  placeholder="Enter your GitHub URL"
                  theme={theme}
                />

                <SocialMediaInput
                  title="LinkedIn"
                  name="contact.socialMedia.linkedIn"
                  icon={<RiLinkedinLine />}
                  placeholder="Enter your LinkedIn URL"
                  theme={theme}
                />
                <SocialMediaInput
                  title="Instagram"
                  name="contact.socialMedia.instagram"
                  icon={<PiInstagramLogo />}
                  placeholder="Enter your Instagram URL"
                  theme={theme}
                />
              </div>

              <button
                type="submit"
                className="bg-blue-700 text-white rounded-lg p-2 w-full my-3"
                disabled={loading}
              >
                {loading ? "Loading..." : "Edit Profile"}
              </button>
              {error && <p className="my-2 text-red-400">{error}</p>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
