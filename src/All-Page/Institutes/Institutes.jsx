import React, { useState, useEffect } from "react";

const institutes = [
  {
    id: 1,
    name: "Bangladesh Technical Education Institute",
    logo: "https://example.com/logo.png",
    address: "Dhaka, Bangladesh",
    verified: true,
  },
  {
    id: 2,
    name: "Dhaka IT mhgjghj",
    logo: "https://example.com/logo2.png",
    address: "Dhaka, Bangladesh",
    verified: true,
  },
  // আরও ডেটা
];

export default function VerifiedInstitutes() {
  const [search, setSearch] = useState("");

  const filteredInstitutes = institutes.filter((inst) =>
    inst.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Verified Institutes</h1>

      <input
        type="text"
        placeholder="Search Institutes..."
        className="mb-6 p-2 border border-gray-300 rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInstitutes.map((inst) => (
          <div
            key={inst.id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <img src={inst.logo} alt={inst.name} className="h-20 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2 flex items-center justify-center">
              {inst.name}
              {inst.verified && (
                <span className="ml-2 text-green-500 font-bold">✔️</span>
              )}
            </h2>
            <p className="text-gray-600 mb-4 text-center">{inst.address}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
