import { URL, commonRequest } from '@/Common/api';
import { appJson } from '@/Common/configurations';
import { TeacherData } from '@/pages/public/InstructorDetails';
import { IUser } from '@/types/common';
import { FC, useEffect, useState } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

interface ProfileCardProps {
  instructordInformations: TeacherData;
}

const ProfileCard: FC<ProfileCardProps> = ({ instructordInformations }) => {
  const [instructorData, setInstructorData] = useState<TeacherData>(instructordInformations);
  const [instructorProfile, setInstructorProfile] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (instructordInformations.email) {
          const detailsOfInstructors = await commonRequest(
            "get",
            `${URL}/auth/find/${instructordInformations.email}`,
            appJson
          );
          setInstructorData(instructordInformations); 
          setInstructorProfile(detailsOfInstructors.data); 
        } else {
          console.log('Cannot find the instructor data');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [instructordInformations]);

  return (
    <div className="border border-gray-200 p-6 rounded-lg shadow-md h-full">
      <div className="flex justify-center">
        <img
          src={instructorProfile?.profile?.avatar || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'}
          alt="Profile"
          className="rounded-full w-24 h-24 object-cover"
        />
      </div>
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold">{instructorProfile?.firstName}</h2>
        <p className="text-gray-600">{instructorData.profession}</p>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        {instructorProfile?.contact?.socialMedia?.github && <a href={instructorProfile?.contact?.socialMedia?.github} className="text-gray-200"><FaGithub /></a>}
        {instructorProfile?.contact?.socialMedia?.linkedIn && <a href={instructorProfile?.contact?.socialMedia?.linkedIn} className="text-blue-700"><FaLinkedinIn /></a>}
      </div>
      <div className="mt-4 text-center">
        <div className="flex justify-center items-center space-x-2">
          <span className="text-orange-500"><i className="fas fa-book"></i></span>
          <span> Courses : {instructorData.totalCourses}</span>
        </div>
        <div className="flex justify-center items-center space-x-2 mt-2">
          <span className="text-orange-500"><i className="fas fa-users"></i></span>
          <span>Students Enrolled : {instructorData.totalStudents} </span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">About Me</h3>
        <p className="text-gray-600 text-sm">{instructorData.profileDescription}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
