import React, { useState } from "react";

export default function StudentResult({
  govtLine = "Government of the People's Republic of Bangladesh",
  institute = "Bangladesh Technical Education Institute",
  website = "mdrobinahmed57898@gmail.com",
  regNo = "750279",
  leftLogo = "https://storage.googleapis.com/a1aa/image/8f11e70f-6ba5-4a24-8123-7472d4f6b7fd.jpg",
  rightLogo = "https://storage.googleapis.com/a1aa/image/f45fa08a-7bb8-41d0-244f-bd29bdeffd7c.jpg",
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-gray-800 w-full min-h-screen"
      style={{ fontFamily: '"Times New Roman", serif' }}
    >
      {/* Single-row header */}
      <header className="bg-[#00a651] flex items-center justify-between px-4 sm:px-6 py-3 gap-4">
        {/* Left logo */}
        <div className="flex-shrink-0 flex items-center">
          <img
            src={leftLogo}
            alt="Seal of Bangladesh"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-contain"
            loading="lazy"
          />
        </div>

        {/* Center block */}
        <div className="flex-1 text-center text-white min-w-0">
          <p className="text-[10px] sm:text-xs leading-tight truncate">
            {govtLine}
          </p>
          <h1 className="text-lg sm:text-xl md:text-2xl leading-tight truncate">
            {institute}
          </h1>
          <div className="flex justify-center gap-4 mt-1">
            <p className="text-xs sm:text-sm leading-tight truncate">
              website: {website}
            </p>
            <p className="text-xs sm:text-sm leading-tight">
              Govt. Reg No: {regNo}
            </p>
          </div>
        </div>

        {/* Right logo */}
        <div className="flex-shrink-0 flex items-center">
          <img
            src={rightLogo}
            alt="Technical Institute logo"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-contain"
            loading="lazy"
          />
        </div>
      </header>

      {/* Result search heading */}
      <div className="text-center font-bold text-2xl bg-[#00a651] py-2">
        Result Search
      </div>

      {/* Input form */}
      <form className="flex flex-wrap justify-center gap-4 mt-5">
        <div className="w-full max-w-xs p-5 bg-white rounded-lg font-mono shadow">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="roll-input"
          >
            Roll No
          </label>
          <input
            className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-black text-white"
            placeholder="Enter Roll No"
            type="text"
            id="roll-input"
          />
        </div>
      </form>

      {/* View Result Button */}
      <div className="flex justify-center mt-8">
        <button
          className="px-6 py-2 bg-black text-white font-bold border border-blue-800 rounded-2xl hover:bg-blue-700"
          onClick={() => setOpen(true)}
        >
          View Result
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black rounded-2xl p-6 w-96 text-center shadow-lg">
            <h2 className="text-xl font-bold mb-4">Result Information</h2>
            <p className="mb-2">Name of Student: 8337857</p>
            <p className="mb-4">Reg No: 17216273444</p>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
