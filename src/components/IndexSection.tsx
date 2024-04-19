const IndexSection = () => {
  return (
    <>
      <div className="w-full flex items-center">
        <div className="flex flex-col ml-16 mt-[280px]">
          <h2 className="text-[45px] font-Josefin px-3w-full font-[600]">
            Transform Your
            <span className="text-[#46e256]"> Life</span>
            Through
            <br />
            Online Education
            <br />
          </h2>
          <br />
          <p className="font-Josefin font-[500] text-[16px]">
            Instructors from around the world teach millions of students on
            Learnwise.We provide
            <br />
            the tools skills to teach what you love.And you can also achieve
            your goal.
          </p>
          <br />
          <br />
          <div className="flex justify-center items-center">
            <button className="bg-gradient-to-br font-Josefin from-blue-500 to-black font-bold text-white py-2 px-4 rounded w-[30%]">
              Find Out How
            </button>
          </div>
        </div>
        <div className="w-[50%] flex items-center justify-end pt-[50px] z-10 relative mt-[20px]">
          <img
            src="https://edmy-react.hibootstrap.com/images/transform-img.png"
            alt="transform"
            className="object-contain 1100px:max-w-[90%] w-[80%] 1500px:max-w-[85%] h-[auto] z-[10]"
          />
          <div className="absolute bg-gradient-to-br from-blue-900 to-black rounded-full w-[580px] h-[580px] top-40 right-14"></div>
        </div>
      </div>
    </>
  );
};

export default IndexSection;
