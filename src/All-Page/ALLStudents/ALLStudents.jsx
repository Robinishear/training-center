import React, { useEffect, useState } from "react";

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 100;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("http://localhost:5000/StudentsList");
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);


  const filteredStudents = students.filter((s) =>
    s.studentName.toLowerCase().includes(search.toLowerCase())
  );

  
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  if (loading) return <p className="p-4">Loading students...</p>;
  if (!students.length) return <p className="p-4">No students found.</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Students</h1>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full md:w-1/3 p-2 border rounded-lg"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // search করলে page 1 এ reset
          }}
        />
      </div>

      {/* Students grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {currentStudents.map((s) => (
          <div
            key={s._id}
            className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden p-4 flex flex-col items-center"
          >
            {s.picture && (
              <img
                src={s.picture}
                alt={s.studentName}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
            )}
            <h2 className="text-lg font-bold mb-2 text-center">{s.studentName}</h2>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => setSelectedStudent(s)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            className="px-3 py-1 rounded-lg border bg-gray-200 hover:bg-gray-300"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={`px-3 py-1 rounded-lg border ${
                num === currentPage ? "bg-blue-600 text-white" : "bg-gray-200"
              } hover:bg-gray-300`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded-lg border bg-gray-200 hover:bg-gray-300"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl w-96 p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold text-xl"
              onClick={() => setSelectedStudent(null)}
            >
              &times;
            </button>
            {selectedStudent.picture && (
              <img
                src={selectedStudent.picture}
                alt={selectedStudent.studentName}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
            )}
            <h2 className="text-xl font-bold mb-2 text-center">{selectedStudent.studentName}</h2>
            <div className="space-y-1 text-sm">
              <p><strong>Father Name:</strong> {selectedStudent.fatherName}</p>
              <p><strong>Mother Name:</strong> {selectedStudent.motherName}</p>
              <p><strong>DOB:</strong> {selectedStudent.dob}</p>
              <p><strong>Gender:</strong> {selectedStudent.gender}</p>
              <p><strong>Passport:</strong> {selectedStudent.passport}</p>
              <p><strong>Address:</strong> {selectedStudent.studentAddress}</p>
              <p><strong>District:</strong> {selectedStudent.district}</p>
              <p><strong>Thana:</strong> {selectedStudent.thana}</p>
              <p><strong>Course:</strong> {selectedStudent.searchCourse}</p>
              <p><strong>Duration:</strong> {selectedStudent.duration}</p>
              <p><strong>Session:</strong> {selectedStudent.session}</p>
              <p><strong>Education:</strong> {selectedStudent.educationQualification}</p>
              <p><strong>Institute:</strong> {selectedStudent.institute}</p>
              <p><strong>Issue Date:</strong> {selectedStudent.issueDate}</p>
              <p><strong>Expire Date:</strong> {selectedStudent.expireDate}</p>
              <p><strong>Created At:</strong> {new Date(selectedStudent.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
