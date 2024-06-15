import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  FaCertificate,
  FaChalkboardTeacher,
  FaClipboard,
  FaClosedCaptioning,
  FaDownload,
  FaFileAlt,
  FaMobileAlt,
} from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import axios from "axios";
import Skeleton from "@/components/ui/Skeleton";
import toast from "react-hot-toast";
import { Course } from "@/types/common";
import { URL, commonRequest } from "@/Common/api";
import ReactPlayer from "react-player";
import date from "date-and-time";
import { loadStripe } from "@stripe/stripe-js";
import { AiOutlineHeart } from "react-icons/ai";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { config } from "@/Common/configurations";
import LessonList from "../user/LessonList";
import { Reviews } from "@/components/student/Reviews";

export const DetailedCourse = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPurchased, setIsPurchased] = useState<boolean>(false);
  const [video, setVideo] = useState("");
  const { state } = useLocation();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${URL}/course/course/${courseId}`);
        setCourse(response.data.data);
        if (user && courseId) {
          await checkEnrollment(courseId, user._id);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
        toast.error("Error fetching course data");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId, user]);

  const checkEnrollment = async (courseId: string, userId: string) => {
    try {
      const response = await commonRequest(
        "get",
        `/course/enrollment/?courseId=${courseId}&userId=${userId}`,
        config
      );
      if (response?.success) {
        setIsPurchased(true);
      }
    } catch (error) {
      console.error("Error checking enrollment status", error);
    }
  };

  const makePayment = async () => {
    if (!user) {
      return toast.error("Please login and try again");
    }
    const stripe = await loadStripe(
      "pk_test_51PMSNzP4PKhJTaDCuHBaA4GXhueUVNp0yA05gvo0DdJu2tf1jCDkXdM5NQYMicYibgyZYxGwlOiZxItIMemHR2Ir00DNytgr8J"
    );
    const body = {
      courseId: state.courseId,
      amount: state.cost,
      userId: user._id,
      thumbnail: state.thumbnail,
      courseName: state.courseName,
      instructorRef: state.instructorRef,
    };
    const apiBody = { ...body };
    delete apiBody.instructorRef;
    const response = await commonRequest(
      "post",
      "/payment/create-checkout-session",
      apiBody,
      config
    );
    localStorage.setItem("paymentData", JSON.stringify(body));
    if (stripe && response?.id) {
      stripe.redirectToCheckout({
        sessionId: response.id,
      });
    }
  };

  return (
    <div className="container mx-auto my-10">
      {loading ? (
        <div className="flex flex-col items-center">
          <Skeleton width={"60%"} height={"30px"} />
          <Skeleton width={"40%"} height={"20px"} />
          <Skeleton width={"80%"} height={"200px"} />
        </div>
      ) : (
        course && (
          <>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="w-full md:w-8/12">
                <div className="p-1">
                  {video ? (
                    <div
                      className="video-container border"
                      style={{ width: "100%", height: "384px" }}
                    >
                      <ReactPlayer
                        url={video}
                        config={{
                          file: { attributes: { controlsList: "nodownload" } },
                        }}
                        onContextMenu={(e: any) => e.preventDefault()}
                        controls
                        playing
                        width="100%"
                        height="100%"
                      />
                    </div>
                  ) : (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-96 object-contain rounded-lg border"
                    />
                  )}
                </div>
                <h1 className="text-3xl font-bold p-4">{course.title}</h1>
                <p className="text-gray-700 mb-2">{course.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-yellow-500 font-semibold">
                    Bestseller
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Created by{" "}
                  <span className="text-blue-600">
                    {course.instructorRef?.firstName}
                  </span>
                </p>
                <div className="flex items-center gap-4 mt-2 text-gray-500">
                  <span className="flex items-center gap-2">
                    <FaChalkboardTeacher /> {course.instructorRef?.firstName}
                  </span>
                  <span className="flex items-center gap-2">
                    <MdLanguage /> {course.language}
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="fas fa-sync-alt"></i> Last updated:{" "}
                    {course.updatedAt
                      ? date.format(new Date(course.updatedAt), "MMM DD YYYY")
                      : "No Data"}
                  </span>
                </div>
              </div>
              <div className="w-full md:w-4/12 mb-52 border rounded-lg">
                {isPurchased ? (
                  <div className="hidden lg:block">
                    <h1 className="text-center font-bold text-2xl">contents</h1>
                    {course.lessons ? (
                      <LessonList
                        lessons={course.lessons}
                        onSubLessonClick={(videoUrl: string) =>
                          setVideo(videoUrl)
                        }
                      />
                    ) : (
                      <p>No lessons available</p>
                    )}
                  </div>
                ) : (
                  <div className="shadow-lg rounded-md overflow-hidden">
                    <ReactPlayer
                      config={{
                        file: { attributes: { controlsList: "nodownload" } },
                      }}
                      onContextMenu={(e: any) => e.preventDefault()}
                      url={course.trial?.video}
                      light={<img src={course.thumbnail} alt="Thumbnail" />}
                      controls
                      width="100%"
                      height="100%"
                    />
                    <div className="p-4 border-t">
                      <h2 className="text-2xl font-bold">
                        ₹{course.pricing.amount}
                      </h2>
                      <div className="flex items-center justify-between mt-2">
                        <button
                          className="w-full py-2 bg-green-700 text-white font-bold rounded"
                          onClick={makePayment}
                        >
                          Buy this Course
                        </button>
                        <button className="ml-2 bg-gray-500 rounded p-2">
                          <AiOutlineHeart className="text-xl" />
                        </button>
                      </div>
                      <div className="text-center mt-2">
                        <span className="block text-green-500">
                          Lifetime Access
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-[65%]">
              <div className="mt-10 border-2 border-gray-500 p-4 ">
                <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
                <ul className="list-disc list-inside">
                  {course.trial?.description?.map((lesson, index) => (
                    <li key={index} className="mb-2">
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">
                  This course includes:
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center mb-2">
                    <FaClipboard className="mr-2" />
                    <span>Assignments</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaFileAlt className="mr-2" />
                    <span>65 articles</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaDownload className="mr-2" />
                    <span>500 downloadable resources</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaMobileAlt className="mr-2" />
                    <span>Access on mobile and TV</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaClosedCaptioning className="mr-2" />
                    <span>Closed captions</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaCertificate className="mr-2" />
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-2 border-gray-500 p-4">
                <h2 className="text-2xl font-bold mb-4">
                  Top companies offer this course to their employees
                </h2>
                <p>
                  This course was selected for our collection of top-rated
                  courses trusted by businesses worldwide.
                </p>
                <div className="flex justify-between items-center mt-4">
                  <img
                    src="https://s.udemycdn.com/partner-logos/v4/nasdaq-dark.svg"
                    alt="Nasdaq"
                  />
                  <img
                    src="https://s.udemycdn.com/partner-logos/v4/volkswagen-dark.svg"
                    alt="Volkswagen"
                  />
                  <img
                    src="https://s.udemycdn.com/partner-logos/v4/box-dark.svg"
                    alt="Box"
                  />
                  <img
                    src="https://s.udemycdn.com/partner-logos/v4/netapp-dark.svg"
                    alt="NetApp"
                  />
                  <img
                    src="https://s.udemycdn.com/partner-logos/v4/eventbrite-dark.svg"
                    alt="Eventbrite"
                  />
                </div>
              </div>
              {user && (
                <Reviews
                  courseId={courseId}
                  userId={user._id}
                  enrolled={isPurchased}
                />
              )}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default DetailedCourse;
