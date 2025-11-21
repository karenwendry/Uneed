// src/components/Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-20 bg-[#0a0a2e] text-white py-10">
      <div className="max-w-7xl mx-auto px-5 text-center">
        <p>&copy; {new Date().getFullYear()} Uneed. All rights reserved.</p>
        <p className="mt-2 text-sm text-gray-400">Platform Jual Beli Barang Kampus.</p>
      </div>
    </footer>
  );
};

export default Footer;