// StudentForm.jsx
import React, { useState } from "react";

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
    <div className="max-w-7xl mx-auto p-4 border border-blue-400 rounded-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-center text-3xl font-bold text-blue-600">Students-ADD</div>
        {/* Row 1 */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="studentName"
              className="block text-sm font-normal mb-1"
            >
              Student Name
            </label>
            <input
              id="studentName"
              value={formData.studentName}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="fatherName"
              className="block text-sm font-normal mb-1"
            >
              Father Name
            </label>
            <input
              id="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="motherName"
              className="block text-sm font-normal mb-1"
            >
              Mother Name
            </label>
            <input
              id="motherName"
              value={formData.motherName}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[150px]">
            <label htmlFor="dob" className="block text-sm font-normal mb-1">
              Date of Birth
            </label>
            <input
              id="dob"
              value={formData.dob}
              onChange={handleChange}
              type="date"
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label htmlFor="gender" className="block text-sm font-normal mb-1">
              Gender
            </label>
            <select
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex-1 min-w-[150px]">
            <label
              htmlFor="passport"
              className="block text-sm font-normal mb-1"
            >
              Passport/NID No.
            </label>
            <input
              id="passport"
              value={formData.passport}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label
              htmlFor="guardianPhone"
              className="block text-sm font-normal mb-1"
            >
              Guardian Phone Number
            </label>
            <input
              id="guardianPhone"
              value={formData.guardianPhone}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="studentAddress"
              className="block text-sm font-normal mb-1"
            >
              Student Address
            </label>
            <input
              id="studentAddress"
              value={formData.studentAddress}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label
              htmlFor="district"
              className="block text-sm font-normal mb-1"
            >
              District
            </label>
            <select
              id="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="">Select District</option>
              {sampleDistricts.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[150px]">
            <label htmlFor="thana" className="block text-sm font-normal mb-1">
              Thana
            </label>
            <select
              id="thana"
              value={formData.thana}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="">Select Thana</option>
              {thanaOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 4 */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="searchCourse"
              className="block text-sm font-normal mb-1"
            >
              Search Course
            </label>
            <select
              id="searchCourse"
              value={formData.searchCourse}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="">Search course...</option>
              {sampleCourses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[150px]">
            <label
              htmlFor="duration"
              className="block text-sm font-normal mb-1"
            >
              Duration
            </label>
            <select
              id="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="">Select duration</option>
              {sampleDurations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[150px]">
            <label htmlFor="session" className="block text-sm font-normal mb-1">
              Session
            </label>
            <select
              id="session"
              value={formData.session}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="">Select session</option>
              {sampleSessions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 5 */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="educationQualification"
              className="block text-sm font-normal mb-1"
            >
              Education Qualification
            </label>
            <select
              id="educationQualification"
              value={formData.educationQualification}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="">Select qualification</option>
              {sampleQualifications.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="institute"
              className="block text-sm font-normal mb-1"
            >
              Institute
            </label>
            <input
              id="institute"
              value={formData.institute}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="picture" className="block text-sm font-normal mb-1">
              Picture
            </label>
            <input
              id="picture"
              onChange={handleChange}
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
            {formData.picture && typeof formData.picture !== "string" && (
              <p className="text-xs mt-1">Selected: {formData.picture.name}</p>
            )}
          </div>
        </div>

        {/* Row 6 */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="issueDate"
              className="block text-sm font-normal mb-1"
            >
              Issue Date
            </label>
            <input
              id="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              type="date"
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="expireDate"
              className="block text-sm font-normal mb-1"
            >
              Expire Date
            </label>
            <input
              id="expireDate"
              value={formData.expireDate}
              onChange={handleChange}
              type="date"
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
        </div>

        <button
          disabled={submitting}
          type="submit"
          className="w-full bg-red-600 text-white rounded py-2 mt-4"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
