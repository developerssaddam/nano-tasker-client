import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="px-4 divide-y bg-gray-800 text-gray-100">
        <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          <div className="w-full text-center md:text-start lg:w-1/3">
            <Link to="/">
              <h1 className="text-3xl font-bold text-primary_color">
                Nano<span className="text-gray-300">Tasker</span>
              </h1>
            </Link>
          </div>

          <div className="grid grid-cols-2 text-center md:text-start md:grid-cols-3 text-sm gap-x-3 gap-y-8 md:w-full">
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase text-gray-50">
                About Company
              </h3>
              <ul className="space-y-1">
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Jobs
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Blogs
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="uppercase text-gray-50">Policy Pages</h3>
              <ul className="space-y-1">
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Working Policy
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="uppercase text-gray-50">
                Contact us
              </div>
              <div className="flex justify-center md:justify-start space-x-3">
                <Link
                  target="blank"
                  to="https://web.facebook.com/profile.php?id=100015157110543"
                >
                  <FaFacebookF className="text-xl" />
                </Link>

                <Link target="blank" to="https://x.com/Saddam4505">
                  <FaTwitter className="text-xl" />
                </Link>

                <Link
                  target="blank"
                  to="https://linkedin.com/in/developer-saddam"
                >
                  <FaLinkedinIn className="text-xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 text-sm text-center text-gray-400">
          © 2024 NanoTasker. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
