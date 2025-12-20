import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>© 2025 Smart HRM</span>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white">
            About
          </a>
          <a href="#" className="hover:text-white">
            Support
          </a>
          <a href="#" className="hover:text-white">
            Documentation
          </a>
          <a href="#" className="hover:text-white">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
