import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br ">
      <div className="w-16 h-16 border-4 border-solid rounded-full animate-spin border-gray-800 border-t-indigo-500" />
    </div>
  );
};

export default LoadingSpinner;