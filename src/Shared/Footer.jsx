// Footer.jsx
import React from 'react';
import { Fade } from 'react-awesome-reveal';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Fade direction="up" triggerOnce>
      <footer className="bg-gradient-to-br  from-gray-950 via-gray-900 to-indigo-950 text-gray-300 py-12 px-6  shadow-inner shadow-indigo-500/10 backdrop-blur-lg">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">

          {/* Logo & Description */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <img
                src="https://i.ibb.co/ynzvkkT7/AT-Co0-K9-ER.png"
                alt="Artifacts Logo"
                className="h-12 w-12 rounded-full border-2 border-indigo-500 shadow-lg"
              />
              <h1 className="text-3xl font-bold text-indigo-400 tracking-wide">Artifacts</h1>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Unearthing history, one artifact at a time. Your gateway to the past.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 underline decoration-indigo-400 underline-offset-4 text-gray-100">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Home", "All Artifacts", "Add Artifacts", "About Us", "Contact"].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-indigo-400 transition duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-semibold mb-4 underline decoration-indigo-400 underline-offset-4 text-gray-100">Connect With Us</h3>
            <div className="flex justify-center md:justify-start gap-5 text-2xl mb-4 text-gray-400">
              <a href="#" className="hover:text-pink-400 transition"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-pink-400 transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-pink-400 transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-pink-400 transition"><i className="fab fa-youtube"></i></a>
            </div>
            <p className="text-sm">📧 <a href="mailto:info@artifacts.com" className="text-gray-300 hover:text-indigo-400">info@artifacts.com</a></p>
            <p className="text-sm text-gray-300">📞 +1 (123) 456-7890</p>
          </div>

          {/* Newsletter + Opening Hours */}
          <div>
            <h3 className="text-xl font-semibold mb-4 underline decoration-indigo-400 underline-offset-4 text-gray-100">Stay Connected</h3>

            {/* Newsletter Form */}
            <form className="flex flex-col sm:flex-row items-center gap-3 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:border-indigo-500 focus:outline-none w-full sm:w-auto"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-gray-100 font-bold py-2 px-4 rounded-lg transition duration-200 w-full sm:w-auto">
                Subscribe
              </button>
            </form>

            {/* Opening Hours */}
            <div className="text-sm text-gray-300">
              <p className="font-semibold mb-1 text-gray-100">Opening Hours</p>
              <ul className="space-y-1">
                <li>Mon - Fri: 9:00 AM - 6:00 PM</li>
                <li>Sat: 10:00 AM - 4:00 PM</li>
                <li>Sun: Closed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          &copy; {currentYear} <span className="font-bold text-gray-200">Historical Artifacts</span>. All rights reserved.
          Designed by <span className="text-pink-400 font-semibold">RN Robin IS Hear</span>
        </div>
      </footer>
    </Fade>
  );
};

export default Footer;