import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Shared/Footer';


const Root = () => {
    return (
        <div className='bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 '>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;
