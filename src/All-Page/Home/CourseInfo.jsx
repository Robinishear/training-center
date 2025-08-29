import React from "react";

const CourseInfo = () => {
  return (
    <div className=" text-gray-100 p-6 min-h-screen mt-4 ">
      <div className="max-w-7xl mx-auto border border-gray-700 rounded-lg bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Left Side Text */}
        <div className="flex-1">
          <h3 className="text-indigo-400 font-semibold text-xl mb-2">
            আমাদের সম্পর্কে
          </h3>
          <h2 className="text-gray-100 font-extrabold text-4xl leading-tight mb-4">
            সর্বোচ্চ মানের ট্রেইনিং সল্যুশন এবং বিশ্বমানের কোর্স
          </h2>
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            আমাদের ট্রেইনিং ইনস্টিটিউট শিক্ষার্থীদের আইটি এবং অন্যান্য স্কিল
            ভিত্তিক প্রশিক্ষণ প্রদান করে। এখানে শিক্ষার্থীরা প্র্যাকটিক্যাল
            অভিজ্ঞতার মাধ্যমে তাদের ক্যারিয়ার গড়তে পারবে।
          </p>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            দক্ষতা অর্জনের পাশাপাশি তারা আধুনিক প্রযুক্তির ব্যবহার শিখে
            নিজেদের পেশাগত জীবন গড়ে তোলে। আমরা প্রতিটি শিক্ষার্থীর জন্য একটি
            স্বপ্নপুরণের পথ তৈরি করি।
          </p>

          {/* Extra Content */}
          <h3 className="text-indigo-400 font-semibold text-xl mb-2">
            আমাদের মিশন
          </h3>
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            প্রত্যেক শিক্ষার্থীকে সর্বোচ্চ মানের প্রশিক্ষণ দিয়ে দক্ষ পেশাজীবী
            হিসেবে গড়ে তোলা। আমরা চাই বাংলাদেশের আইটি খাতে একটি শক্তিশালী
            কর্মীবাহিনী তৈরি হোক।
          </p>

          <h3 className="text-indigo-400 font-semibold text-xl mb-2">
            আমাদের ভিশন
          </h3>
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            আগামী প্রজন্মকে আধুনিক প্রযুক্তি শিক্ষায় বিশ্বমানের সুযোগ প্রদানের
            মাধ্যমে একটি প্রযুক্তি-নির্ভর সমৃদ্ধ বাংলাদেশ গড়ে তোলা।
          </p>

          <h3 className="text-indigo-400 font-semibold text-xl mb-2">
            আমাদের বৈশিষ্ট্য
          </h3>
          <ul className="list-disc list-inside text-gray-300 text-lg mb-6 leading-relaxed space-y-2">
            <li>অভিজ্ঞ প্রশিক্ষক ও ইন্ডাস্ট্রি এক্সপার্ট</li>
            <li>হ্যান্ডস-অন প্র্যাকটিক্যাল ক্লাস</li>
            <li>আপডেটেড সিলেবাস এবং প্রজেক্ট ভিত্তিক লার্নিং</li>
            <li>ক্যারিয়ার গাইডলাইন ও চাকরির সুযোগ</li>
            <li>অনলাইন + অফলাইন উভয় ধরনের কোর্স সুবিধা</li>
          </ul>

          <button
            type="button"
            className="bg-indigo-600 text-gray-100 text-lg font-semibold px-8 py-4 rounded hover:bg-indigo-700 transition"
          >
            Branch Registration
          </button>
        </div>

        {/* Right Side Image */}
        <div className="flex-1 max-w-md ">
          <img
            src="https://storage.googleapis.com/a1aa/image/5d74e234-8ae1-4a96-88eb-19b252b18902.jpg"
            alt="Illustration of technology and education icons"
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;