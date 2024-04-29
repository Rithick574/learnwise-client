import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom"


const IndexHeader = () => {

  return (
    <div className="w-full 1000px:flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-lg ">
          <div className="flex items-center justify-end pt-[70px] z-10 relative">
            <img
              src="https://edmy-react.hibootstrap.com/images/banner/banner-img-1.png"
              alt="banner img"
              className="object-contain 1100px:max-w-[90%] w-[80%] 1500px:max-w-[85%] h-[auto] z-[10] "
            />
            <div className="absolute bg-gradient-to-br from-blue-900 to-black rounded-full w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] top-20 right-8"></div>
          </div>
          <div className="flex flex-col ml-9 mt-[150px]">
            <h2 className="text-[50px] font-Josefin px-3w-full font-[700]">
              Improve Your Online
              <br/>
               Learning Experience
               <br/>
                Better Instantly
            </h2>
            <br />
            <p className="font-Josefin font-[600] text-[18px]">
              We have 40k+ Online Courses & 500k+ Online registered student.
              <br/>
              Find Your desired Courses from them.
            </p>
            <br />
            <br />
            <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative ">
              <input
                type="search"
                placeholder="Search Courses..."
                className="bg-transparent border bg-[#212020] font-bold rounded-[5px] p-2 w-full h-full outline-none "
              />
              <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
                <BiSearch className="text-white" size={30} />
              </div>
            </div>
            <br />
            <br />
            <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
              <img
                src="https://edmy-react.hibootstrap.com/images/banner/client-3.jpg"
                alt=""
                className="rounded-full"
              />
              <img
                src="https://edmy-react.hibootstrap.com/images/banner/client-1.jpg"
                alt=""
                className="rounded-full ml-[-20px]"
              />
              <img
                src="https://edmy-react.hibootstrap.com/images/banner/client-2.jpg"
                alt=""
                className="rounded-full ml-[-20px]"
              />
              <p className="font-Josefin font-[600] text-[18px] ml-2">
                 500k+ People already trusted us.
                 <Link to="/courses" className="text-[#46e256] ml-2">View Courses</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default IndexHeader