import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [state, setState] = useState(false);
  const navRef = useRef();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  // Observe auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Scroll and sticky nav
  useEffect(() => {
    const body = document.body;
    if (state) body.classList.add("overflow-hidden");
    else body.classList.remove("overflow-hidden");

    const customStyle = ["sticky-nav", "fixed", "border-b", "border-gray-700"];
    const handleScroll = () => {
      if (window.scrollY > 80) navRef.current.classList.add(...customStyle);
      else navRef.current.classList.remove(...customStyle);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [state]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/Login");
  };

  const navigation = [
    { title: "Home", path: "/" },
    { title: "Course List", path: "/CourseList" },
    { title: "Verified Institutes", path: "/BranchesList" },
    { title: "ALL-Students", path: "/ALLStudents" },
    { title: "ADD-Students", path: "/StudentsList" },
    { title: "Student Result", path: "/StudentResult" },
    { title: "Online Exam", path: "/OnlineExam" },
    // { title: "Verified Institutes", path: "/Institutes" },
    { title: "DashBoard", path: "/dashBoard/addCourse" },
  ];

  return (
    <nav
      ref={navRef}
      className={`w-full top-0 z-20 transition-all duration-300 ease-in-out bg-gradient-to-br rounded-2xl from-gray-950 via-gray-900 to-indigo-950`}
    >
      <div className="items-center  max-w-screen-2xl mx-auto  lg:flex lg:justify-around">
        {/* Logo and Hamburger */}
        <div className="flex items-center justify-between py-3 lg:py-4 w-full lg:w-auto">
          <div className="flex items-center space-x-2 p-1">
            <img
              src="https://i.ibb.co.com/WvZp7vvB/logo.png"
              className="h-12 w-38 rounded-2xl border-2 border-indigo-500"
              alt="Artifacts Logo"
            />
          </div>

          {/* Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setState(!state)}
              className="p-2 rounded-md text-gray-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={state ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Navbar content */}
        <div
          className={`flex-1 lg:flex lg:items-center lg:space-x-1 ${
            state ? "block" : "hidden"
          }`}
        >
          {/* Navigation Links */}
          <ul className="flex-1 flex flex-col lg:flex-row items-center justify-end space-y-2 lg:space-y-0 lg:space-x-2 mt-2 lg:mt-0">
            {navigation.map((item, idx) => (
              <li key={idx} className="rounded-lg">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md block btn border bg-black border-blue-700 text-gray-100 transition duration-200 ${
                      isActive
                        ? "text-indigo-400 bg-gray-400 font-bold"
                        : "hover:text-indigo-400"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Auth Buttons */}
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 mt-6 lg:mt-0 pb-4 lg:pb-0">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="px-6 py-2 rounded-lg font-semibold text-gray-100 hover:text-indigo-400 transition"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-6 py-2 rounded-full font-semibold bg-indigo-600 text-gray-100 hover:bg-indigo-700 transition"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-full font-semibold bg-pink-500 text-gray-100 hover:bg-pink-400 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
