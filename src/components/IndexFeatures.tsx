import Card from "./Card";

const IndexFeatures = () => {
  return (
    <div className="footer-area w-full mt-[120px] mr-40">
      <div className="container">
        <div className="row">
          <div className="mt-5">
            <div className="flex justify-center">
              <span className="top-title text-2xl font-semibold mt-4">
                Our Features
              </span>
            </div>
            <h4 className="text-center text-4xl mt-5">
              Why You Should Choose LearnWise
            </h4>
          </div>

          <div className="row justify-center flex mt-14">
            <div className="w-[25%]">
              <div className="single-widget">
                <Card
                  title="Expert-Led Video Courses"
                  description="Instructors from around the world teach millions of students on Edmy through video."
                  image="https://edmy-react.hibootstrap.com/images/features/feature-1.svg"
                />
              </div>
            </div>
            <div className="w-[25%]">
              <div className="single-widget">
                <Card
                  title="In-Demand Trendy Topics"
                  description="Instructors from around the world teach millions of students on Edmy through video."
                  image="https://edmy-react.hibootstrap.com/images/features/feature-2.svg"
                />
              </div>
            </div>
            <div className="w-[25%]">
              <div className="single-widget">
                <Card
                  title="Segment Your Learning"
                  description="Instructors from around the world teach millions of students on Edmy through video."
                  image="https://edmy-react.hibootstrap.com/images/features/feature-3.svg"
                />
              </div>
            </div>
            <div className="w-[25%]">
              <div className="single-widget">
                <Card
                  title="Always Interactive Learning"
                  description="Instructors from around the world teach millions of students on Edmy through video."
                  image="https://edmy-react.hibootstrap.com/images/features/feature-4.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexFeatures;
