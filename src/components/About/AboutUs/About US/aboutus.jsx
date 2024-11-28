import React from "react";

import sachin from "../../../../assets/sachin.jpg";
import linkdin from "../../../../assets/linkdin.png";

function Aboutus() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex flex-col justify-center items-center font-poppins p-6">
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg max-w-3xl text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-700 mb-6">
          At HolaHolaCar, we are dedicated to providing a seamless and
          sustainable travel experience. By offering affordable rides and
          promoting cost savings, we make it easier for users to enjoy
          eco-friendly and shared transportation options while meeting new
          people. Our mission is to become the go-to marketplace for all shared
          travel needs, combining carpooling with partnerships that expand our
          service offering to include bus journeys from various operators. With
          HolaHolaCar, users gain access to diverse and budget-friendly travel
          options that promote a greener future. As a young company, we are
          already committed to making a significant impact. Our technology and
          community-driven approach aim to help our members save money and
          reduce their carbon footprint, one ride at a time. Join us on our
          journey as we build a more connected, cost-effective, and
          eco-conscious world.
        </p>
      </div>
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg max-w-3xl text-center flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-shrink-0">
          <img
            src={sachin}
            alt="Sachin Vardhan"
            className="rounded-2xl w-48 h-48 object-cover md:w-64 md:h-64"
          />
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Our Founder</h1>
          <p className="text-lg text-gray-700 mb-6">
            Sachin Vardhan is the visionary behind HolaHolaCar. With a passion
            for sustainable travel and a commitment to making transportation
            more accessible and affordable, Sachin has led the company to new
            heights. His dedication to innovation and community-driven solutions
            continues to inspire our mission and values.
          </p>
          <div className="mt-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              - Sachin Vardhan
            </h1>
          </div>
          <div className="flex items-center mt-4 space-x-2">
            <p className="text-lg text-gray-700">Connect:</p>
            <a
              href="https://www.linkedin.com/in/sachin-vardhan-06/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="h-10 w-10" src={linkdin} alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
