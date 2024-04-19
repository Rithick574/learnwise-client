const IndexReview = () => {
  return (
    <>
      <div className="flex items-center">
        <div className="w-[50%] mt-[200px] flex items-center justify-center pt-[50px] z-10 relative">
          <img
            src="https://edmy-react.hibootstrap.com/images/testimonials/testimonial-1.png"
            alt="transform"
            className="object-contain w-[30rem] h-auto z-[10]"
          />
        </div>

        <div className="flex w-[50%] flex-col ml-16 mt-[280px]">
          <h2 className="text-[45px] font-Josefin px-3w-full font-[600]">
            Our Students Are Our
            <span className="text-[#46e256]"> Strength</span>
            <br />
            See What They Say About Us
            <br />
          </h2>
          <br />
          <div className="card  rounded-lg shadow-lg p-6">
            <p className="font-Josefin font-[500] text-[16px]">
              There are many variations of passages of Lorem Ipsum available,but
              <br/>
               the majority have suffered alteration in some form, by
              injected humour,
              <br/>
               or randomised words which don't look even
              slightly believable. If you
              <br/>
               are going to use a passage of Lorem
              Ipsum, you need to be sure there
              <br/>
               isn't anything embarrassing
              hidden in the middle of text.
            </p>
          </div>
          <div className="w-[90%] flex items-center ml-5">
            <img
              src="https://res.cloudinary.com/dev-empty/image/upload/v1661319899/jesalmrfyvyjhnc4bn8w.jpg"
              className="rounded-full w-10 h-10"
              alt="student-avatar"
            />
            <h4 className="mb-0 ml-3">
              Jason Stathum, <span>Python Dev.</span>
            </h4>
          </div>
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default IndexReview;
