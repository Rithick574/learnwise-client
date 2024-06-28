import { URL } from '@/Common/api';
import { SearchBar } from '@/components/admin/SearchBar';
import { RootState } from '@/redux/store';
import { Course } from '@/types/common';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsCaretRightFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const InstructorAssessments: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate= useNavigate()
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true); 

  const handleFilter = () => {};

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(`${URL}/course/mycourse/${user._id}`);
        setCourses(data.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
        toast.error("Error fetching course data");
      } finally {
        setLoading(false); 
      }
    };
    fetchCourses();
  }, [user._id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={150} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="p-5 w-full overflow-y-auto text-sm">
      <SearchBar
        handleClick={handleFilter}
        search={search}
        setSearch={setSearch}
      />
      <div className="flex justify-between items-center font-semibold">
        <div>
          <h1 className="font-bold mt-4 text-2xl">Exams</h1>
          <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
            <p className="text-green-500 font-semibold">Instructor</p>
            <span>
              <BsCaretRightFill />
            </span>
            <p className="font-semibold">Exam</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="card bg-gray-900 shadow-xl mb-4">
              <figure className="px-10 pt-10">
                <img src={course.thumbnail} alt="Course thumbnail" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{course.title}</h2>
                <p>{course.description}</p>
                <div className="card-actions items-center">
                  <p>Created At :  <span className='border border-gray-200 p-1 rounded-lg badge-ghost'> {new Date(course.createdAt).toLocaleDateString()}</span></p>
                  <button className="btn bg-gray-700 text-white" onClick={()=>navigate(`/instructor/assessments/${course._id}`)}>View Exam</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default InstructorAssessments;
