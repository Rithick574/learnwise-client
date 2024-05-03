import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplyToTeachSchema } from "@/lib/validations/ApplytoTeach";
import { useTheme } from "@/components/ui/theme-provider";
import applyasInstructorLogo from "@/assets/transform-img-2.png";
import { ApplyToTeachFormData } from "@/types/forms";
import { useNavigate } from "react-router-dom";
import { applyToTeachAction } from "@/redux/actions/user/userActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import toast from "react-hot-toast";

export const ApplyToTeach = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const [error, setError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof ApplyToTeachSchema>>({
    resolver: zodResolver(ApplyToTeachSchema),
  });

  const onSubmit = async (data: ApplyToTeachFormData) => {
    try {
      console.log(data, "@@@@@@@@");
      const response = await dispatch(
        applyToTeachAction(data as ApplyToTeachFormData)
      );
      console.log(
        "🚀 ~ file: ApplyToTeach.tsx:31 ~ onSubmit ~ response:",
        response
      );
      if(response.meta.requestStatus === "fulfilled"){
        toast.success(
          "check your mail for confirmation"
        );
        navigate("/");
      }else{
        toast.error(response.payload as string)
      }
     
    } catch (error: any) {
      console.log("🚀 ~ file: ApplyToTeach.tsx:48 ~ onSubmit ~ error:", error)
      toast.error(error?.response?.data?.message || "please try again later");
      console.error(error);
      setError(error?.message || "Something went wrong, Try again!");
    }
  };

  return (
    <div className="min-h-screen flex justify-around items-center md:px-24">
      <div className="justify-center items-center z-10 md:flex hidden">
        <img
          src={applyasInstructorLogo}
          alt="transform"
          className="object-contain 1100px:max-w-[80%] w-[70%] 1500px:max-w-[75%] h-[auto] "
        />
        <div className="absolute bg-gradient-to-br from-blue-900 to-black rounded-full -z-10  w-[540px] h-[540px] top-40 md:block"></div>
      </div>
      <div className="w-full max-w-lg p-4  mb-20 shadow-lg rounded">
        <h2 className="text-3xl font-bold mb-6">
          Become an <span className="text-green-500">Instructor</span>?
        </h2>
        <h2 className="text-lg font-light mb-6">
          Provide some basic information about yourself!
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}

          <div>
            <select
              {...register("profession")}
              className={`w-full p-2 border ${
                theme === "light" ? "bg-white" : "bg-gray-900"
              } rounded`}
            >
              <option value="">Choose profession</option>
              <option value="Software developer">Full stack developer</option>
              <option value="Teacher">Front-end developer</option>
              <option value="Teacher">Back-end developer</option>
              <option value="Teacher">python developer</option>
            </select>
            {errors.profession && (
              <p className="text-red-500">{errors.profession.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register("profileDescription")}
              name="profileDescription"
              className={`w-full p-2 border rounded ${
                theme === "light" ? "bg-white" : "bg-gray-900"
              }`}
              placeholder="Profile description"
            ></textarea>
            {errors.profileDescription && (
              <p className="text-red-500">
                {errors.profileDescription.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="url"
              placeholder="Linked In (Optional)"
              className={`w-full p-2 border ${
                theme === "light" ? "bg-white" : "bg-gray-900"
              } rounded`}
              {...register("linkedIn")}
            />
            {errors.linkedIn && (
              <p className="text-red-500">{errors.linkedIn.message}</p>
            )}
          </div>

          <div>
            <input
              type="url"
              placeholder="GitHub (Optional)"
              className={`w-full p-2 border ${
                theme === "light" ? "bg-white" : "bg-gray-900"
              } rounded`}
              {...register("github")}
            />
            {errors.github && (
              <p className="text-red-500">{errors.github.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-br font-Josefin from-blue-500 to-black rounded-sm"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};
