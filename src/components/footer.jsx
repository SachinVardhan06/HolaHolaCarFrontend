import React from "react";

function Footer() {
  return (
    <>
      <div className="bg-gray-800 text-gray-400 font-mono text-sm sm:text-base font-bold px-4 sm:px-9 py-4 sm:py-6 w-full">
        <div className="flex flex-col sm:flex-row items-center sm:h-14 space-y-2 sm:space-y-0 sm:space-x-4 sm:justify-between w-full">
          <h2 className="sm:flex-1 hover:text-white transition duration-300 ease-in-out cursor-pointer">
            Terms and Conditions
          </h2>
          <h2 className="sm:flex-1 text-center sm:text-left">
            Made with 💙 in Bharat
          </h2>
          <h2 className="sm:flex-1 sm:text-right">HolaHolaCar, 2025</h2>
        </div>
      </div>
    </>
  );
}

export default Footer;
