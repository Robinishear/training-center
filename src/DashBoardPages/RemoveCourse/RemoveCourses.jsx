import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaBookOpen,
  FaSearch,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../CustomHooks/useAxios";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const RemoveCourses = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allCourses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allCourses");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (courseId) => {
      const response = await axiosSecure.delete(`/deleteCourse/${courseId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCourses"] });
      Swal.fire({
        title: "Deleted!",
        text: "The course has been successfully deleted.",
        icon: "success",
        background: "#1F2937",
        color: "#F3F4F6",
        confirmButtonColor: "#4F46E5",
      });
    },
    onError: (err) => {
      Swal.fire({
        title: "Error!",
        text: `Failed to delete the course. Error: ${err.message}`,
        icon: "error",
        background: "#1F2937",
        color: "#F3F4F6",
        confirmButtonColor: "#4F46E5",
      });
    },
    onSettled: () => {
      setIsDeleting(false);
    },
  });

  const handleDelete = (courseId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5",
      cancelButtonColor: "#EC4899",
      confirmButtonText: "Yes, delete it!",
      background: "#1F2937",
      color: "#F3F4F6",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsDeleting(true);
        deleteMutation.mutate(courseId);
      }
    });
  };

  const filteredCourses = courses
    ? courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-900 min-h-screen-minus-header text-gray-100">
        <LoadingSpinner></LoadingSpinner>
        <p className="text-xl">Loading courses...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-900 min-h-screen-minus-header text-red-400">
        <FaTimesCircle className="text-4xl mr-3" />
        <p className="text-xl">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="p-8 bg-gray-950 min-h-screen-minus-header text-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl font-extrabold text-center mb-10 text-pink-400 drop-shadow-lg">
          <FaBookOpen className="inline mr-3 text-indigo-400" />
          Remove Courses
        </h1>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mb-6 flex items-center justify-center relative max-w-lg mx-auto"
      >
        <FaSearch className="absolute left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search for a course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        />
      </motion.div>

      {filteredCourses.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="text-center text-gray-400 text-xl mt-20"
        >
          <p>No courses found matching your search.</p>
        </motion.div>
      ) : (
        <motion.div variants={itemVariants}>
          <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-xl backdrop-blur-sm bg-opacity-80">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Course Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Course ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                <AnimatePresence>
                  {filteredCourses.map((course) => (
                    <motion.tr
                      key={course._id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, x: -50 }}
                      className="hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                        {course.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {course.courseId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        ${course.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          onClick={() => handleDelete(course._id)}
                          disabled={isDeleting}
                          className="text-pink-400 hover:text-pink-600 transition-colors
                                     disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FaTrash className="inline-block text-xl" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RemoveCourses;