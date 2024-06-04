import { MdOutlineMailOutline } from "react-icons/md";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./TopHeader.css";

const TopHeader = () => {
  return (
    <div className="bg-gray-200 py-2 hidden lg:block px-4">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex gap-10 items-center">
          <div className="flex gap-2 items-center text-gray-400 hover:text-primary_color">
            <MdOutlineMailOutline />
            <p>support@nanotasker.com</p>
          </div>

          <div className="flex gap-2 items-center text-gray-400 hover:text-primary_color">
            <FaMoneyBill1Wave />
            <p>Join here and get 10 to 50 coin bonus!</p>
          </div>
        </div>

        <div>
          <ul id="social_top" className="flex items-center gap-4">
            <Link
              target="blank"
              to="https://web.facebook.com/profile.php?id=100015157110543"
            >
              <li>
                <FaFacebookF />
              </li>
            </Link>

            <Link target="blank" to="https://x.com/Saddam4505">
              <li>
                <FaTwitter />
              </li>
            </Link>

            <Link target="blank" to="https://linkedin.com/in/developer-saddam">
              <li>
                <FaLinkedinIn />
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
