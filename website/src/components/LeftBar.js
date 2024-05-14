import beeHive from "../assets/beeHive.png";
import { Link } from "react-router-dom";
import home from "../assets/home.png";
import profile from "../assets/profile.png";

const LeftBar = () => {
  return (
    <div className="w-2/12 h-screen bg-black2 rounded-3xl">
      <img src={beeHive} className="w-16 h-16 ml-6 mt-8" alt="Beehive"></img>
      <ul className="space-x-4">
        <li className="ml-4 mt-10 font-bold text-2xl text-white hover:underline cursor-pointer flex items-center">
          <Link to="/">
            <div className="flex items-center">
              <img src={home} className="w-8 h-8 mr-2" alt="Home"></img>
              <div>Home</div>
            </div>
          </Link>
        </li>
        <li className="mt-6 font-bold text-2xl text-white hover:underline cursor-pointer flex items-center">
          <Link to="/profile">
            <div className="flex items-center">
              <img src={profile} className="w-8 h-8 mr-2" alt="Profile"></img>
              <div>Profile</div>
            </div>
          </Link>
        </li>
      </ul>
      <Link
        to="/login"
        className="ml-4 bg-main font-bold text-lg w-60 h-10 rounded-3xl absolute bottom-0 mb-2 flex items-center justify-center"
      >
        Logout
      </Link>
    </div>
  );
};

export default LeftBar;