import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-area w-full mt-[120px] mr-40 border-t-2">

      <div className="container mt-10">
        <div className="row flex">
          {/* About */}
          <div className="w-[25%]">
            <div className="single-footer-widget">
              <h3 className="text-xl font-bold">About</h3>
              <br/>
              <ul className="import-link">
                <li>
                  <Link to="#">
                    Our Story
                  </Link>
                </li>
                <br/>
                <li>
                  <Link to="#">
                    Privacy Policy
                  </Link>
                </li>
                <br/>
                <li>
                  <Link to="#">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-[25%]">
            <div className="single-footer-widget">
              <h3 className="text-xl font-bold">Quick Links</h3>
              <br/>
              <ul className="import-link">
                <li>
                  <Link to="#">
                    Courses
                  </Link>
                </li>
                <br/>
                <li>
                  <Link to="#">
                    My Account
                  </Link>
                </li>
                <br/>
                <li>
                  <Link to="#">
                    Course Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Help Center */}
          <div className="w-[25%]">
            <div className="single-footer-widget">
              <h3 className="text-xl font-bold">Help Center</h3>
              <br/>
              <ul className="import-link">
                <li>
                  <Link to="#">
                    Support
                  </Link>
                </li>
                <br/>
                <li>
                  <Link to="#">
                    Get Help
                  </Link>
                </li>
                <br/>
                <li>
                  <Link to="#">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-[25%]">
            <div className="single-footer-widget">
              <h3 className="text-xl font-bold">Contact Info</h3>
              <br/>
              <ul className="import-link">
                <li>
                  <p>
                    <span>Call Us: </span>1-885-665-2022
                  </p>
                </li>
                <br/>
                <li>
                  <p>
                    <span>Address: </span>+7011 vermon Ave, Los Angeles, CA
                    90044
                  </p>
                </li>
                <br/>
                <li>
                  <p>
                    <span>Mail Us: </span>Hello@learnwise.com
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <br/>
        <div className="flex justify-center items-center mt-5 mb-7 ml-20">
          <p>Copyright @ 2024 LearnWise | All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
