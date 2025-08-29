import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBook,
  FaDollarSign,
  FaImage,
  FaPencilAlt,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import PhotoUploader from "../Shared/PhotoUploader";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const AddCourse = () => {

  const [formData, setFormData] = useState({
    courseId: "",
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUploadSuccess = (imageUrl) => {
    setFormData((prevData) => ({
      ...prevData,
      image: imageUrl,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmissionStatus(null);
    console.log("Submitting form with data:", formData);

    try {
     
      const response = await axios.post(
        "http://localhost:5000/addCourse",
        formData
      );
      console.log(response.data);
      if (!response.data) {
        throw new Error("Failed to add course.");
      }

      const result = await response;
      console.log("Course added successfully:", result);
      setSubmissionStatus("success");
      setFormData({
        courseId: "",
        name: "",
        description: "",
        price: "",
        image: "",
      }); 
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 p-6">
      <motion.div
        className="w-full max-w-2xl p-8 rounded-2xl shadow-2xl bg-gray-800 bg-opacity-80 backdrop-blur-sm border border-gray-700"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-8">
          Add New Course
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course ID */}
          <div>
            <label
              htmlFor="courseId"
              className="block text-gray-300 mb-2 font-medium"
            >
              <FaBook className="inline mr-2 text-indigo-400" />
              Course ID
            </label>
            <input
              type="text"
              id="courseId"
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              placeholder="e.g., CS101"
            />
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-300 mb-2 font-medium"
            >
              <FaPencilAlt className="inline mr-2 text-pink-400" />
              Course Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              placeholder="e.g., Introduction to Computer Science"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-gray-300 mb-2 font-medium"
            >
              <FaPencilAlt className="inline mr-2 text-pink-400" />
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              placeholder="Provide a brief description of the course."
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-gray-300 mb-2 font-medium"
            >
              <FaDollarSign className="inline mr-2 text-indigo-400" />
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              placeholder="e.g., 49.99"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-6">
            <label
              htmlFor="image"
              className="block text-gray-300 mb-2 font-medium"
            >
              <FaImage className="inline mr-2 text-pink-400" />
              Course Image
            </label>
            <PhotoUploader onUploadSuccess={handleImageUploadSuccess} />
          </div>

          {/* Submission Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-lg text-gray-100 font-bold text-lg
                       bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300
                       flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <LoadingSpinner></LoadingSpinner>
                <span>Adding Course...</span>
              </>
            ) : (
              <span>Add Course</span>
            )}
          </button>
        </form>

        {/* Submission Status Message */}
        {submissionStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-center justify-center space-x-2 text-green-400"
          >
            <FaCheckCircle />
            <span>Course added successfully!</span>
          </motion.div>
        )}
        {submissionStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-center justify-center space-x-2 text-pink-400"
          >
            <FaTimesCircle />
            <span>Failed to add course. Please try again.</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AddCourse;
