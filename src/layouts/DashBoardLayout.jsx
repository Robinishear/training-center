import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaHistory,
  FaUser,
  FaUserPlus,
  FaUsers,
  FaQuestionCircle,
  FaLightbulb,
  FaRegClipboard,
  FaLock,
} from "react-icons/fa";
import {
  FaHome,
  FaBox,
  FaMapMarkerAlt,
  FaUserEdit,
  FaUserCheck,
  FaUserClock,
  FaTrash,
} from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";

const DashBoardLayout = () => {
  const { user, loading, role } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
        <FaSpinner className="animate-spin text-indigo-400 text-5xl mr-3" />
        <p className="text-xl text-gray-200">Loading dashboard layout...</p>
      </div>
    );
  }

  const isAdmin = user && role === "admin";
  const isMember = user && role === "member";
  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen ">
        {/* Navbar for mobile view */}
        <div className="navbar bg-gray-900 w-full lg:hidden shadow-lg">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 text-gray-100 font-bold text-lg lg:hidden">
            Dashboard
          </div>
        </div>

        <div className="flex-1 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 md:p-8">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-gray-800 text-gray-200 min-h-full w-60 p-4 shadow-xl">
          <div className="mb-6 px-4">
            <NavLink to="/">LOGO</NavLink>
          </div>

          <li>
            <NavLink
              to="/dashBoard/profile"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-indigo-400 font-semibold bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                  : "flex items-center gap-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
              }
            >
              <FaHome className="text-gray-400 group-hover:text-indigo-400" />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashBoard/addCourse"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-indigo-400 font-semibold bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                  : "flex items-center gap-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
              }
            >
              <FaBox className="text-gray-400 group-hover:text-indigo-400" />
              Add Course
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashBoard/requestedBranches"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-indigo-400 font-semibold bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                  : "flex items-center gap-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
              }
            >
              <FaBox className="text-gray-400 group-hover:text-indigo-400" />
              Requested Branches
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashBoard/removeCourses"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-indigo-400 font-semibold bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                  : "flex items-center gap-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
              }
            >
              <FaTrash className="text-gray-400 group-hover:text-indigo-400" />
              Remove Course
            </NavLink>
          </li>
          <div className="font-bold text-xl mt-10 text-blue-600 ml-3">
            Branches-All-Page
          </div>

          <li>
            <NavLink
              to="/dashBoard/Profile"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-indigo-400 font-semibold bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                  : "flex items-center gap-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
              }
            >
              <FaUser className="text-gray-400 group-hover:text-indigo-400" />
              Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashBoard/NewStudent"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-indigo-400 font-semibold bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                  : "flex items-center gap-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
              }
            >
              <FaUserPlus className="text-gray-400 group-hover:text-indigo-400" />
              New Student
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashBoard/StudentsList"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-indigo-400 font-semibold bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                  : "flex items-center gap-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
              }
            >
              <FaUsers className="text-gray-400 group-hover:text-indigo-400" />
              Student List
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashBoard/ExamQuestion"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-indigo-400 font-semibold bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                  : "flex items-center gap-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
              }
            >
              <FaQuestionCircle className="text-gray-400 group-hover:text-indigo-400" />
              Exam Question
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashBoard/ExamSuggestion"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-indigo-400 font-semibold bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                  : "flex items-center gap-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
              }
            >
              <FaLightbulb className="text-gray-400 group-hover:text-indigo-400" />
              Exam Suggestion
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashBoard/OMRSheet"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-indigo-400 font-semibold bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                  : "flex items-center gap-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
              }
            >
              <FaRegClipboard className="text-gray-400 group-hover:text-indigo-400" />
              OMR Sheet
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashBoard/UpdatePassword"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-indigo-400 font-semibold bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                  : "flex items-center gap-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
              }
            >
              <FaLock className="text-gray-400 group-hover:text-indigo-400" />
              Update Password
            </NavLink>
          </li>

          {isMember && (
            <li>
              <NavLink
                to="/dashBoard/rentPaymentForm"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 text-indigo-400 font-semibold bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                    : "flex items-center gap-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                }
              >
                <FaMapMarkerAlt className="text-gray-400 group-hover:text-indigo-400" />
                Rent Payment Form
              </NavLink>
            </li>
          )}
          {isMember && (
            <li>
              <NavLink
                to="/dashBoard/paymentHistory"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 text-indigo-400 font-semibold bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                    : "flex items-center gap-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                }
              >
                <FaUserEdit className="text-gray-400 group-hover:text-indigo-400" />
                Payment History
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to="/dashBoard/adminDashBoard"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-indigo-400 font-semibold bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                  : "flex items-center gap-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
              }
            >
              <FaUserCheck className="text-gray-400 group-hover:text-indigo-400" />
              Stats
            </NavLink>
          </li>

          {isAdmin && (
            <li>
              <NavLink
                to="/dashBoard/makeAnnouncement"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 text-indigo-400 font-semibold bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                    : "flex items-center gap-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                }
              >
                <FaUserCheck className="text-gray-400 group-hover:text-indigo-400" />
                Make Announcement
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <li>
              <NavLink
                to="/dashBoard/membersManagement"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 text-indigo-400 font-semibold bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                    : "flex items-center gap-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                }
              >
                <FaUserClock className="text-gray-400 group-hover:text-indigo-400" />
                Members Management
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <li>
              <NavLink
                to="/dashBoard/couponManagement"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 text-indigo-400 font-semibold bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                    : "flex items-center gap-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                }
              >
                <FaUserClock className="text-gray-400 group-hover:text-indigo-400" />
                Coupon Management
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to="/dashBoard/announcements"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-indigo-400 font-semibold bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
                  : "flex items-center gap-2 text-gray-300 hover:text-indigo-400 hover:bg-gray-700 rounded-lg py-2 px-3 transition-colors duration-200"
              }
            >
              <FaUserClock className="text-gray-400 group-hover:text-indigo-400" />
              Announcements
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
