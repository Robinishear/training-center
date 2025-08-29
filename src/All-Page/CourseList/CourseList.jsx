import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../CustomHooks/useAxios";
import { useLoaderData } from "react-router";
import LoadingSpinner from "../../Shared/LoadingSpinner";


export default function CourseList() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9
  const axiosSecure = useAxiosSecure();

  

  const {
    isPending,
    error,
    data: allCourses,
  } = useQuery({
    queryKey: ["allCourses"],
    queryFn: async () =>
      await axiosSecure("/allCourses")
        .then((res) => {
          // The response should now be structured with a 'data' key
          return res.data;
        })
        .catch((err) => console.log(err)),
  });

  if (isPending)
    return (
      <LoadingSpinner></LoadingSpinner>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-950 text-gray-100">
        An error has occurred: {error.message}
      </div>
    );

 

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  const filteredProducts = allCourses.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );
console.log(paginatedProducts);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100 font-roboto">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        {/* Search Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex justify-center mb-10"
        >
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none placeholder-gray-400"
          />
        </form>

        <h2 className="text-3xl font-playfair font-bold text-gray-100 mb-10 text-center">
          Course List
        </h2>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((course,index) => (
              <article
                key={index}
                className="relative rounded-2xl p-5 shadow-lg bg-gray-800 bg-opacity-80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/70"
              >
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="p-2">
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">
                    {course.name}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-400 font-bold text-lg">
                      ${course.price}
                    </span>
                    <button
                      onClick={() => openModal(course)}
                      className="text-gray-100 bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400">
              No courses found.
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 bg-gray-800 bg-opacity-50 text-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition hover:bg-indigo-600"
            >
              Prev
            </button>
            <span className="text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-gray-800 bg-opacity-50 text-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition hover:bg-indigo-600"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-gray-950 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="border border-indigo-500 rounded-lg shadow-2xl bg-gray-800 bg-opacity-90 max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-100 text-2xl transition"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold text-gray-100 mb-2">
              {selectedProduct.name}
            </h3>
            <p className="text-gray-300 mb-4">{selectedProduct.description}</p>
            <span className="text-indigo-400 font-bold text-xl">
              ${selectedProduct.price}
            </span>
          </div>
        </div>
      )}
      
    </div>
  );
}
