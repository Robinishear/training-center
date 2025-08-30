import React, { useState } from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const sampleDistricts = [
  { name: "Dhaka", thanas: ["Dhanmondi", "Gulshan", "Mirpur"] },
  { name: "Chattogram", thanas: ["Pahartali", "Kotwali", "Panchlaish"] },
  { name: "Khulna", thanas: ["Khalishpur", "Sonadanga"] },
];

const sampleCourses = [
  "Web Development",
  "Graphic Design",
  "Mobile App Development",
  "Electrician",
  "Plumbing",
];
const sampleDurations = ["1 month", "3 months", "6 months", "1 year"];
const sampleSessions = ["2024", "2025", "2026"];
const sampleQualifications = ["No formal", "SSC", "HSC", "Diploma", "Graduate"];

export default function StudentForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "Male",
    passport: "",
    guardianPhone: "",
    studentAddress: "",
    district: "",
    thana: "",
    searchCourse: "",
    duration: "",
    session: "",
    educationQualification: "",
    institute: "Technical Training centre",
    picture: null,
    issueDate: "",
    expireDate: "",
  });

  const [thanaOptions, setThanaOptions] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (files) {
      setFormData((p) => ({ ...p, [id]: files[0] }));
    } else {
      setFormData((p) => ({ ...p, [id]: value }));
      if (id === "district") {
        const found = sampleDistricts.find((d) => d.name === value);
        setThanaOptions(found ? found.thanas : []);
        setFormData((p) => ({ ...p, thana: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (v === null || v === undefined) return;
        if (k === "picture" && v instanceof File) {
          fd.append("picture", v);
        } else {
          fd.append(k, v);
        }
      });

      const res = await fetch("http://localhost:5000/StudentsList", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      console.log("Server response:", data);

      if (data.success) {
        alert("✅ Student saved successfully!");
        setFormData({
          studentName: "",
          fatherName: "",
          motherName: "",
          dob: "",
          gender: "Male",
          passport: "",
          guardianPhone: "",
          studentAddress: "",
          district: "",
          thana: "",
          searchCourse: "",
          duration: "",
          session: "",
          educationQualification: "",
          institute: "Technical Training centre",
          picture: null,
          issueDate: "",
          expireDate: "",
        });
        setThanaOptions([]);
      } else {
        alert("❌ Failed to save student");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting form");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 min-h-screen p-4 sm:p-8 text-gray-200">
      <motion.div
        className="max-w-6xl mx-auto rounded-xl bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-xl p-4 sm:p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center text-3xl font-bold mb-8 text-indigo-400 drop-shadow-lg"
        >
          StudentsList
        </motion.div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main 2-column grid container */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Column 1 */}
            <div className="space-y-6">
              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="studentName"
                  className="block text-sm font-normal mb-1 text-gray-400"
                >
                  Student Name
                </label>
                <input
                  id="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  type="text"
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="fatherName"
                  className="block text-sm font-normal mb-1 text-gray-400"
                >
                  Father Name
                </label>
                <input
                  id="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  type="text"
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="motherName"
                  className="block text-sm font-normal mb-1 text-gray-400"
                >
                  Mother Name
                </label>
                <input
                  id="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  type="text"
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="dob"
                  className="block text-sm font-normal mb-1 text-gray-400"
                >
                  Date of Birth
                </label>
                <input
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  type="date"
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="gender"
                  className="block text-sm font-normal mb-1 text-gray-400"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="passport"
                  className="block text-sm font-normal mb-1 text-gray-400"
                >
                  Passport/NID No.
                </label>
                <input
                  id="passport"
                  value={formData.passport}
                  onChange={handleChange}
                  type="text"
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="guardianPhone"
                  className="block text-sm font-normal mb-1 text-gray-400"
                >
                  Guardian Phone Number
                </label>
                <input
                  id="guardianPhone"
                  value={formData.guardianPhone}
                  onChange={handleChange}
                  type="text"
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="studentAddress"
                  className="block text-sm font-normal mb-1 text-gray-400"
                >
                  Student Address
                </label>
                <input
                  id="studentAddress"
                  value={formData.studentAddress}
                  onChange={handleChange}
                  type="text"
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="district"
                  className="block text-sm font-normal mb-1 text-gray-400"
                >
                  District
                </label>
                <select
                  id="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select District</option>
                  {sampleDistricts.map((d) => (
                    <option key={d.name} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="thana"
                  className="block text-sm font-normal mb-1 text-gray-400"
                >
                  Thana
                </label>
                <select
                  id="thana"
                  value={formData.thana}
                  onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Thana</option>
                  {thanaOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="searchCourse"
                  className="block text-sm font-normal mb-1 text-gray-400"
                >
                  Search Course
                </label>
                <select
                  id="searchCourse"
                  value={formData.searchCourse}
                  onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Search course...</option>
                  {sampleCourses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="duration"
                  className="block text-sm font-normal mb-1 text-gray-400"
                >
                  Duration
                </label>
                <select
                  id="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select duration</option>
                  {sampleDurations.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="session"
                  className="block text-sm font-normal mb-1 text-gray-400"
                >
                  Session
                </label>
                <select
                  id="session"
                  value={formData.session}
                  onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select session</option>
                  {sampleSessions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="educationQualification"
                  className="block text-sm font-normal mb-1 text-gray-400"
                >
                  Education Qualification
                </label>
                <select
                  id="educationQualification"
                  value={formData.educationQualification}
                  onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select qualification</option>
                  {sampleQualifications.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="institute"
                  className="block text-sm font-normal mb-1 text-gray-400"
                >
                  Institute
                </label>
                <input
                  id="institute"
                  value={formData.institute}
                  onChange={handleChange}
                  type="text"
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </motion.div>

              

              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="issueDate"
                  className="block text-sm font-normal mb-1 text-gray-400"
                >
                  Issue Date
                </label>
                <input
                  id="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                  type="date"
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="expireDate"
                  className="block text-sm font-normal mb-1 text-gray-400"
                >
                  Expire Date
                </label>
                <input
                  id="expireDate"
                  value={formData.expireDate}
                  onChange={handleChange}
                  type="date"
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col">
                <label
                  htmlFor="picture"
                  className="block text-sm font-normal mb-1 text-gray-400"
                >
                  Picture
                </label>
                <input
                  id="picture"
                  onChange={handleChange}
                  type="file"
                  accept="image/*"
                  className="w-full text-gray-300  bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formData.picture && typeof formData.picture !== "string" && (
                  <p className="text-xs mt-1 text-gray-500">
                    Selected: {formData.picture.name}
                  </p>
                )}
              </motion.div>
            </div>
          </div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={submitting}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-gray-100 font-bold rounded-lg py-3 mt-8 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit"}
          </motion.button>
          
        </form>
      </motion.div>
    </div>
  );
}
