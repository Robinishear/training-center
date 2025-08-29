import React, { useState } from 'react';

const ProfileCard = ({ user }) => {
  const { instituteName, directorName, email, address, username } = user;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg shadow-lg p-6 max-w-sm mx-auto my-8 border border-gray-700 w-full">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-gray-100 text-3xl font-bold mb-4">
          {directorName.charAt(0)}
        </div>
        <h2 className="text-2xl font-bold text-indigo-400 mb-2">{directorName}</h2>
        <p className="text-gray-200 text-lg mb-1">{instituteName}</p>
        <p className="text-gray-400 text-sm italic mb-4">@{username}</p>
      </div>
      <div className="mt-4 border-t border-gray-700 pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300 font-medium">Email:</span>
          <span className="text-gray-100">{email}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300 font-medium">Address:</span>
          <span className="text-gray-100 text-right">{address}</span>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-gray-100 font-bold py-2 px-6 rounded-full transition-colors duration-200"
        >
          Details
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-gray-700 bg-opacity-70 backdrop-blur-sm p-4 rounded-2xl">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 max-w-lg w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-2xl font-bold text-indigo-400 mb-4">Details for {directorName}</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                <span className="font-semibold text-gray-100">Institute:</span> {instituteName}
              </p>
              <p>
                <span className="font-semibold text-gray-100">Director:</span> {directorName}
              </p>
              <p>
                <span className="font-semibold text-gray-100">Email:</span> {email}
              </p>
              <p>
                <span className="font-semibold text-gray-100">Address:</span> {address}
              </p>
              <p>
                <span className="font-semibold text-gray-100">Username:</span> {username}
              </p>
            
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-pink-500 hover:bg-pink-600 text-gray-100 font-bold py-2 px-6 rounded-full transition-colors duration-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;