import React from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiHome,
  FiMapPin,
  FiBook,
  FiClipboard,
} from "react-icons/fi";
import { MdOutlineApartment } from "react-icons/md";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../CustomHooks/useAuth";
import useAxiosSecure from "../../CustomHooks/useAxios";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const backgroundMotionVariants = {
  animate: {
    backgroundPosition: ["0% 0%", "100% 100%"],
    transition: {
      backgroundPosition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30,
        ease: "linear",
      },
    },
  },
};

const UserProfileAndAgreement = () => {
  const axiosSecure = useAxiosSecure();
  const { user, role } = useAuth();
  const currentUserEmail = user?.email;

  const {
    isLoading,
    isError,
    data: instituteData,
    error,
  } = useQuery({
    queryKey: ["currentUserInfo", currentUserEmail],
    queryFn: async () => {
      try {
        const result = await axiosSecure.get(
          `/currentUserInfo?email=${currentUserEmail}`
        );
        return result.data && Object.keys(result.data).length > 0
          ? result.data
          : null;
      } catch (err) {
        if (err.response && err.response.status === 404) {
          return null;
        }
        throw err;
      }
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const defaultUser = {
    displayName: "Guest User",
    email: "guest@example.com",
    photoURL: "https://via.placeholder.com/150/818CF8/FFFFFF?text=User",
  };

  const currentUser = user || defaultUser;

  if (isLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100`}
      >
        <LoadingSpinner></LoadingSpinner>
        <p className="text-xl">Loading profile details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950text-red-400 text-xl p-5 text-center`}
      >
        <p>Error loading data: {error?.message || "Unknown error"}</p>
        <p className="text-gray-400 mt-2">
          Please check your internet connection or try again later.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={backgroundMotionVariants}
      animate="animate"
      className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 bg-[length:200%_200%] overflow-hidden relative"
    >
      <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 right-1/4 w-52 h-52 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full relative"
      >
        <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm bg-opacity-80">
          <motion.div variants={itemVariants}>
            <h1
              className="text-4xl font-extrabold text-center mb-10
                           text-indigo-400 tracking-wide drop-shadow-lg
                           md:text-5xl"
            >
              User Profile
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* User Profile Section */}
            <div className="text-center lg:col-span-1">
              <motion.div variants={itemVariants}>
                <img
                  src={currentUser.photoURL || defaultUser.photoURL}
                  alt={currentUser.displayName}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover
                             border-4 border-indigo-500 shadow-lg shadow-indigo-500/50"
                />
                <p className="text-2xl font-bold text-gray-100 mb-1 flex items-center justify-center gap-2">
                  <FiUser className="text-indigo-400" />{" "}
                  {currentUser.displayName}
                </p>
                <p className="text-gray-400 flex items-center justify-center gap-2">
                  <FiMail className="text-pink-400" /> {currentUser.email}
                </p>
                {user && role && (
                  <p className="text-gray-300 mt-2 text-sm">
                    Role:{" "}
                    <span className="font-bold text-pink-400 uppercase">
                      {role}
                    </span>
                  </p>
                )}
              </motion.div>
            </div>

            {/* Main Details Section */}
            <div className="lg:col-span-2">
              <div className="lg:hidden border-t border-gray-700 my-8"></div>
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-5 text-pink-400 flex items-center gap-2 drop-shadow">
                  <FiClipboard className="text-pink-400" /> Profile Status
                </h2>
              </motion.div>
              <div className="space-y-6">
                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
                    <FiUser className="text-indigo-400" /> Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 text-gray-300">
                    <p className="flex items-center gap-2">
                      <FiUser className="text-gray-500" />
                      <strong>Username:</strong> {instituteData.currentUserData?.username}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiMail className="text-gray-500" />
                      <strong>Email:</strong> {instituteData.currentUserData?.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiPhone className="text-gray-500" />
                      <strong>Mobile:</strong> {instituteData.currentUserData?.mobileNumber}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiUser className="text-gray-500" />
                      <strong>Father's Name:</strong>{" "}
                      {instituteData.currentUserData?.fatherName}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiUser className="text-gray-500" />
                      <strong>Mother's Name:</strong>{" "}
                      {instituteData.currentUserData?.motherName}
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
                    <FiMapPin className="text-indigo-400" /> Address Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 text-gray-300">
                    <p className="flex items-center gap-2">
                      <FiHome className="text-gray-500" />
                      <strong>Address:</strong> {instituteData.currentUserData?.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiBook className="text-gray-500" />
                      <strong>Post Office:</strong> {instituteData.currentUserData?.postOffice}
                    </p>
                    <p className="flex items-center gap-2">
                      <MdOutlineApartment className="text-gray-500" />
                      <strong>Upazila:</strong> {instituteData.currentUserData?.upazila}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiMapPin className="text-gray-500" />
                      <strong>District:</strong> {instituteData.currentUserData?.district}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfileAndAgreement;
