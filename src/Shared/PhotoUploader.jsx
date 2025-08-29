
import React, { useState } from 'react';
import { FaSpinner, FaCheckCircle, FaUpload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import uploadPhoto from './imageUploadService';
import LoadingSpinner from './LoadingSpinner';


const PhotoUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setIsLoading(true);
    setImageUrl('');
    setError(null);

    try {
      const url = await uploadPhoto(file);
      setImageUrl(url);
      onUploadSuccess(url); 
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 rounded-2xl shadow-2xl bg-gray-800 bg-opacity-80 backdrop-blur-sm border border-gray-700 max-w-xl mx-auto text-gray-100"
    >
      <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
        Upload Photo 
      </h2>

      <div className="flex flex-col space-y-4">
        <label className="block">
          <span className="sr-only">Choose file</span>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-300
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-indigo-600 file:text-gray-100
                       hover:file:bg-indigo-700 transition-colors cursor-pointer"
          />
        </label>
        
        <button
          onClick={handleUpload}
          disabled={!file || isLoading}
          className="w-full py-3 px-6 rounded-lg text-gray-100 font-bold text-lg
                     bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300
                     flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <LoadingSpinner></LoadingSpinner>
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <FaUpload />
              <span>Upload Photo</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <p className="mt-4 text-pink-400 text-center">{error}</p>
      )}

      {imageUrl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-lg border border-green-500 bg-gray-900 bg-opacity-50"
        >
          <div className="flex items-center text-green-400 mb-2">
            <FaCheckCircle className="mr-2" />
            <span className="font-semibold">Upload Successful!</span>
          </div>
          <p className="text-gray-300 break-words">
            Image URL:{" "}
            <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
              {imageUrl}
            </a>
          </p>
          <img src={imageUrl} alt="Uploaded" className="mt-4 w-full h-auto rounded-lg shadow-md" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default PhotoUploader;