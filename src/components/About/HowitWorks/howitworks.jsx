import React from "react";

function Howitworks() {
  return (
    <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 flex flex-col justify-center items-center font-poppins p-6">
      <div className=" bg-opacity-90 p-8 rounded-2xl max-w-9xl text-center flex flex-col md:flex-row gap-4 items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">How it Works</h1>
      </div>
      <div>
        <div>
            <h1 className="text-2xl font-semibold text-gray-800">Step 1</h1>
            <p className="text-lg text-gray-700 mb-6">
                Register on our platform and create a profile OR Login if you are an existing user.
            </p>
        </div>
        <div>
            <h1 className="text-2xl font-semibold text-gray-800">Step 2</h1>
            <p className="text-lg text-gray-700 mb-6">
                Search for available rides or create your own.
            </p>
        </div>
        <div>
            <h1 className="text-2xl font-semibold text-gray-800">Step 3</h1>
            <p className="text-lg text-gray-700 mb-6">
                Connect with other users and arrange your shared journey.
            </p>
        </div>
        <div>
            <h1 className="text-2xl font-semibold text-gray-800">Step 4</h1>
            <p className="text-lg text-gray-700 mb-6">
                Enjoy your ride and contribute to a greener future.
            </p>
        </div>
        <div>
            <h1 className="text-2xl font-semibold text-gray-800">Step 5</h1>
            <p className="text-lg text-gray-700 mb-6">
                Share your experience and help us grow our community.
            </p>
        </div>
        <div>
            <h1 className="text-2xl font-semibold text-gray-800">Step 6</h1>
            <p className="text-lg text-gray-700 mb-6">
                Repeat the process and become a regular user of HolaHolaCar.
            </p>
        </div>
      </div>
    </div>
  );
}

export default Howitworks;
