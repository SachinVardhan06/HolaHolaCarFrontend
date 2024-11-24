import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const { handleRegister, error } = useContext(AuthContext);
  const [userData, setUserData] = useState({ username: '', email: '', password: '', password2: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password === userData.password2) {
      handleRegister(userData);
      navigate('/home');
      toast.success("SignUp Success")        
    } else {
      {toast("Password must Matched")}
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Validate password matching
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
  };


  return (
    <div className="h-screen w-screen overflow-hidden relative flex justify-center items-center font-poppins">
  <video
    className="absolute top-0 left-0 w-full h-full object-cover"
    src="https://motionbgs.com/media/1033/the-drive-on-the-road-at-sunset.960x540.mp4"
    autoPlay
    loop
    muted
  ></video>
  <div className="relative z-10 flex gap-20">
    <div className="h-auto w-[400px] p-8 rounded-2xl shadow-lg backdrop-blur-lg bg-opacity-30 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-2">Sign Up Account</h1>
      <h2 className="text-sm text-gray-600 mb-6 text-center">
        Enter your personal details to create your account
      </h2>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        {/* Full Name Input */}
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
        />
        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
        />
        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
        />
        {/* Confirm Password Input */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={userData.password2}
          onChange={(e) => setUserData({ ...userData, password2: e.target.value })}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
        />
        {error && <div>{error}</div>}
        {/* Register Button */}
        <p><span className="text-white">Already has an Account</span> <Link className="text-blue-500 underline" to="/login">Sign In</Link></p>
        <button
          type="submit"
          className="w-full text-white text-sm font-semibold py-2 rounded-md border border-gray-500 transition duration-300 ease hover:bg-slate-600 focus:ring-2 focus:ring-slate-300"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</div>

  );
}

export default RegisterForm;

