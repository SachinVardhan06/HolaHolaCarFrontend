import React from "react";

function Footer() {
  return (
    <>
      <div className="flex flex-col h-[10px] sm:flex-row items-center sm:h-14 text-gray-400 font-mono text-[15px] sm:text-[17px] font-bold px-4 sm:px-9 space-y-2 sm:space-y-0 sm:space-x-4 sm:justify-between w-full">
        <h2 className="sm:flex-1">Terms and Conditions</h2>
        <h2 className="sm:flex-1 text-center sm:text-left">
          Made with 💙 in Bharat
        </h2>
        <h2 className="sm:flex-1 sm:text-right">HolaHolaCar, 2025</h2>
      </div>
    </>
  );
}

export default Footer;
