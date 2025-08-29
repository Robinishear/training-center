import React from 'react';

import HomeSlaider from './HomeSlaider';
import CourseInfo from './CourseInfo';
import ProfileCards from './ProfileCards';



const Home = () => {
  return (
    <div className="bg-gray-950 text-gray-100 p-6 min-h-screen  bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
      <HomeSlaider/>
     <CourseInfo></CourseInfo>
     <ProfileCards></ProfileCards>
    </div>
  );
};

export default Home;