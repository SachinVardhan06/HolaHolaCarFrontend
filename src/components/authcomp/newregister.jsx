import React from "react";

function Newregister() {
  return (
    <div className="min-h-screen flex justify-center items-center font-poppins p-6">
      <div className="h-auto w-full md:w-[40%] bg-blue-500 rounded-[30px] flex justify-center items-center flex-col shadow-lg">
        <div className="bg-white h-auto w-full md:w-[80%] rounded-[20px] flex justify-center items-center p-6 shadow-md mb-5 mt-5">
          <div className=" h-auto w-full md:w-[90%] rounded-[15px] flex justify-center items-center flex-col p-8">
            <h2 className="text-2xl font-bold mb-4">Sign up</h2>
            <p className="text-center mb-4">Make Your Journey More Happier</p>
            <form className="w-full flex flex-col gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name*"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name*"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email*"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password*"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                required
              />
              <div className="flex items-center mb-4">
                <input type="checkbox" id="terms" name="terms" className="mr-2" required />
                <label htmlFor="terms" className="text-sm">
                  I agree to the <a href="#" className="text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-500">Privacy Policy</a>.
                </label>
              </div>
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md">
                Create your Atlas account
              </button>
            </form>
            <p className="mt-4">
              Already have an account? <a href="#" className="text-blue-500">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newregister;
