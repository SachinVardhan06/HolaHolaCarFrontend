// // import React, { useState, useContext } from "react";
// // import { AuthContext } from "../../context/AuthContext";
// // import { useNavigate } from "react-router-dom";
// // import { Link } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import signup from "../../assets/signup.png";

// // const RegisterForm = () => {
// //   // Function to validate email format
// //   const validateEmail = (email) => {
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     return emailRegex.test(email);
// //   };

// //   const { handleRegister, error } = useContext(AuthContext);
// //   const [userData, setUserData] = useState({
// //     username: "",
// //     email: "",
// //     password: "",
// //     password2: "",
// //   });
// //   const navigate = useNavigate();

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (userData.password === userData.password2) {
// //       handleRegister(userData);
// //       navigate("/home");
// //       toast.success("SignUp Success");
// //     } else {
// //       {
// //         toast("Password must Matched");
// //       }
// //     }
// //     if (!validateEmail(formData.email)) {
// //       newErrors.email = "Invalid email format";
// //     }

// //     // Validate password matching
// //     if (formData.password !== formData.confirmPassword) {
// //       newErrors.confirmPassword = "Passwords do not match";
// //     }
// //   };

// //   return (
// //     // <div className="h-screen w-screen overflow-hidden relative flex justify-center items-center font-poppins">
// //     //   <div>
// //     //     <img src={signup} alt="" />
// //     //   </div>
// //     //   <div className="relative z-10 flex gap-20">
// //     //     <div className="h-auto w-[400px] p-8 rounded-2xl shadow-lg backdrop-blur-lg bg-opacity-30 flex flex-col items-center">
// //     //       <h1 className="text-2xl font-semibold mb-2">Sign Up Account</h1>
// //     //       <h2 className="text-sm text-gray-600 mb-6 text-center">
// //     //         Enter your personal details to create your account
// //     //       </h2>
// //     //       <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
// //     //         {/* Full Name Input */}
// //     //         <input
// //     //           type="text"
// //     //           name="fullName"
// //     //           placeholder="Full Name"
// //     //           value={userData.username}
// //     //           onChange={(e) =>
// //     //             setUserData({ ...userData, username: e.target.value })
// //     //           }
// //     //           className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
// //     //         />
// //     //         {/* Email Input */}
// //     //         <input
// //     //           type="email"
// //     //           name="email"
// //     //           placeholder="Email"
// //     //           value={userData.email}
// //     //           onChange={(e) =>
// //     //             setUserData({ ...userData, email: e.target.value })
// //     //           }
// //     //           className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
// //     //         />
// //     //         {/* Password Input */}
// //     //         <input
// //     //           type="password"
// //     //           name="password"
// //     //           placeholder="Password"
// //     //           value={userData.password}
// //     //           onChange={(e) =>
// //     //             setUserData({ ...userData, password: e.target.value })
// //     //           }
// //     //           className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
// //     //         />
// //     //         {/* Confirm Password Input */}
// //     //         <input
// //     //           type="password"
// //     //           name="confirmPassword"
// //     //           placeholder="Confirm Password"
// //     //           value={userData.password2}
// //     //           onChange={(e) =>
// //     //             setUserData({ ...userData, password2: e.target.value })
// //     //           }
// //     //           className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
// //     //         />
// //     //         {error && <div>{error}</div>}
// //     //         {/* Register Button */}
// //     //         <p>
// //     //           <span className="text-white">Already has an Account</span>{" "}
// //     //           <Link className="text-blue-500 underline" to="/login">
// //     //             Sign In
// //     //           </Link>
// //     //         </p>
// //     //         <button
// //     //           type="submit"
// //     //           className="w-full text-white text-sm font-semibold py-2 rounded-md border border-gray-500 transition duration-300 ease hover:bg-slate-600 focus:ring-2 focus:ring-slate-300"
// //     //         >
// //     //           Register
// //     //         </button>
// //     //       </form>
// //     //     </div>
// //     //   </div>
// //     // </div>
// //     <div className="h-screen w-screen overflow-hidden relative flex flex-row justify-center items-center font-poppins bg-gradient-to-r from-blue-500 to-purple-600">
// //       <div className="hidden md:block">
// //         <img
// //           className="h-[400px] md:h-[500px] object-cover"
// //           src={signup}
// //           alt="Sign Up"
// //         />
// //       </div>
// //       <div className="relative z-10 flex flex-col gap-8 bg-opacity-30 p-6 md:p-8 rounded-2xl shadow-lg backdrop-blur-lg bg-white/30 w-full max-w-md mx-4 md:mx-0">
// //         <h1 className="text-3xl font-semibold mb-2 text-white relative z-20">
// //           Register
// //         </h1>
// //         <h2 className="text-sm text-white mb-6 text-center relative z-20">
// //           Enter your personal details to create your account
// //         </h2>
// //         <form
// //           onSubmit={handleSubmit}
// //           className="w-full flex flex-col gap-4 relative z-20"
// //         >
// //           {/* Full Name Input */}
// //           <input
// //             type="text"
// //             name="fullName"
// //             placeholder="Full Name"
// //             value={userData.username}
// //             onChange={(e) =>
// //               setUserData({ ...userData, username: e.target.value })
// //             }
// //             className="w-full bg-transparent placeholder:text-slate-200 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
// //           />
// //           {/* Email Input */}
// //           <input
// //             type="email"
// //             name="email"
// //             placeholder="Email"
// //             value={userData.email}
// //             onChange={(e) =>
// //               setUserData({ ...userData, email: e.target.value })
// //             }
// //             className="w-full bg-transparent placeholder:text-slate-200 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
// //           />
// //           {/* Password Input */}
// //           <input
// //             type="password"
// //             name="password"
// //             placeholder="Password"
// //             value={userData.password}
// //             onChange={(e) =>
// //               setUserData({ ...userData, password: e.target.value })
// //             }
// //             className="w-full bg-transparent placeholder:text-slate-200 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
// //           />
// //           {/* Confirm Password Input */}
// //           <input
// //             type="password"
// //             name="confirmPassword"
// //             placeholder="Confirm Password"
// //             value={userData.password2}
// //             onChange={(e) =>
// //               setUserData({ ...userData, password2: e.target.value })
// //             }
// //             className="w-full bg-transparent placeholder:text-slate-200 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
// //           />
// //           {error && <div className="text-red-500">{error}</div>}
// //           <p className="text-white text-center">
// //             <span>Already have an account?</span>{" "}
// //             <Link className="text-blue-300 underline" to="/login">
// //               Sign In
// //             </Link>
// //           </p>
// //           {/* Register Button */}
// //           <button
// //             type="submit"
// //             className="w-full text-white text-sm font-semibold py-2 rounded-md bg-green-500 hover:bg-green-600 transition duration-300 ease focus:ring-2 focus:ring-slate-500"
// //           >
// //             Register
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RegisterForm;

// import React, { useState, useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext'
// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const RegisterForm = () => {
//   // Function to validate email format
//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const { handleRegister, error } = useContext(AuthContext);
//   const [userData, setUserData] = useState({ username: '', email: '', password: '', password2: '' });
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (userData.password === userData.password2) {
//       handleRegister(userData);
//       navigate('/home');
//       toast.success("SignUp Success")        
//     } else {
//       {toast("Password must Matched")}
//     }
//     if (!validateEmail(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }

//     // Validate password matching
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }
//   };


//   return (
//     <div className="h-screen w-screen overflow-hidden relative flex justify-center items-center font-poppins">
//   <video
//     className="absolute top-0 left-0 w-full h-full object-cover"
//     src="https://motionbgs.com/media/1033/the-drive-on-the-road-at-sunset.960x540.mp4"
//     autoPlay
//     loop
//     muted
//   ></video>
//   <div className="relative z-10 flex gap-20">
//     <div className="h-auto w-[400px] p-8 rounded-2xl shadow-lg backdrop-blur-lg bg-opacity-30 flex flex-col items-center">
//       <h1 className="text-2xl font-semibold mb-2">Sign Up Account</h1>
//       <h2 className="text-sm text-gray-600 mb-6 text-center">
//         Enter your personal details to create your account
//       </h2>
//       <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
//         {/* Full Name Input */}
//         <input
//           type="text"
//           name="fullName"
//           placeholder="Full Name"
//           value={userData.username}
//           onChange={(e) => setUserData({ ...userData, username: e.target.value })}
//           className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
//         />
//         {/* Email Input */}
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={userData.email}
//           onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//           className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
//         />
//         {/* Password Input */}
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={userData.password}
//           onChange={(e) => setUserData({ ...userData, password: e.target.value })}
//           className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
//         />
//         {/* Confirm Password Input */}
//         <input
//           type="password"
//           name="confirmPassword"
//           placeholder="Confirm Password"
//           value={userData.password2}
//           onChange={(e) => setUserData({ ...userData, password2: e.target.value })}
//           className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
//         />
//         {error && <div>{error}</div>}
//         {/* Register Button */}
//         <p><span className="text-white">Already has an Account</span> <Link className="text-blue-500 underline" to="/login">Sign In</Link></p>
//         <button
//           type="submit"
//           className="w-full text-white text-sm font-semibold py-2 rounded-md border border-gray-500 transition duration-300 ease hover:bg-slate-600 focus:ring-2 focus:ring-slate-300"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   </div>
// </div>

//   );
// }

// export default RegisterForm;


// import React, { useState, useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext'
// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const RegisterForm = () => {
//   // Function to validate email format
//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const { handleRegister, error } = useContext(AuthContext);
//   const [userData, setUserData] = useState({ username: '', email: '', password: '', password2: '' });
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (userData.password === userData.password2) {
//       handleRegister(userData);
//       navigate('/home');
//       toast.success("SignUp Success")        
//     } else {
//       {toast("Password must Matched")}
//     }
//     if (!validateEmail(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }

//     // Validate password matching
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }
//   };


//   return (
//     <div className="h-screen w-screen overflow-hidden relative flex justify-center items-center font-poppins">
//   <img src="https://th.bing.com/th/id/R.40764d49d892bca22959e11f65f9f1d5?rik=o7GJ6eNJ4%2b1TRQ&riu=http%3a%2f%2fhdwpro.com%2fwp-content%2fuploads%2f2017%2f01%2fCar-Full-HD-Wallpaper.jpg&ehk=dcpTFElVHk4Z9KRvgKnGPKD3CUNTSfln%2fZrG4hFAfMY%3d&risl=&pid=ImgRaw&r=0" alt="" className="absolute top-0 left-0 w-full h-full object-cover"/>
//   <div className="relative z-10 flex gap-20">
//     <div className="h-auto w-[400px] p-8 rounded-2xl shadow-lg backdrop-blur-lg bg-opacity-30 flex flex-col items-center">
//       <h1 className="text-2xl font-semibold mb-2">Sign Up Account</h1>
//       <h2 className="text-sm text-gray-600 mb-6 text-center">
//         Enter your personal details to create your account
//       </h2>
//       <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
//         {/* Full Name Input */}
//         <input
//           type="text"
//           name="fullName"
//           placeholder="Full Name"
//           value={userData.username}
//           onChange={(e) => setUserData({ ...userData, username: e.target.value })}
//           className="w-full bg-transparent placeholder:text-black text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
//         />
//         {/* Email Input */}
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={userData.email}
//           onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//           className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
//         />
//         {/* Password Input */}
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={userData.password}
//           onChange={(e) => setUserData({ ...userData, password: e.target.value })}
//           className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
//         />
//         {/* Confirm Password Input */}
//         <input
//           type="password"
//           name="confirmPassword"
//           placeholder="Confirm Password"
//           value={userData.password2}
//           onChange={(e) => setUserData({ ...userData, password2: e.target.value })}
//           className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
//         />
//         {error && <div>{error}</div>}
//         {/* Register Button */}
//         <p><span className="text-white">Already has an Account</span> <Link className="text-blue-500 underline" to="/login">Sign In</Link></p>
//         <button
//           type="submit"
//           className="w-full text-white text-sm font-semibold py-2 rounded-md border border-gray-500 transition duration-300 ease hover:bg-slate-600 focus:ring-2 focus:ring-slate-300"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   </div>
// </div>

//   );
// }

// export default RegisterForm;


// // import React, { useState, useContext } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { toast } from 'react-toastify';
// // import { AuthContext } from "../../context/AuthContext";

// // const RegisterForm = () => {
// //   const { handleRegister, error } = useContext(AuthContext);
// //   const [userData, setUserData] = useState({ username: '', email: '', password: '', password2: '' });
// //   const navigate = useNavigate();

// //   // Function to validate email format
// //   const validateEmail = (email) => {
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     return emailRegex.test(email);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     let newErrors = {};

// //     // Validate email format
// //     if (!validateEmail(userData.email)) {
// //       newErrors.email = "Invalid email format";
// //       toast.error("Invalid email format");
// //     }

// //     // Validate password matching
// //     if (userData.password !== userData.password2) {
// //       newErrors.password2 = "Passwords do not match";
// //       toast.error("Passwords do not match");
// //     }

// //     // If there are no errors, proceed with registration
// //     if (Object.keys(newErrors).length === 0) {
// //       handleRegister(userData)
// //         .then(() => {
// //           toast.success("SignUp Success");
// //           navigate('/home');
// //         })
// //         .catch((err) => {
// //           toast.error("SignUp Failed");
// //           console.error("Error during registration:", err);
// //         });
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setUserData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-r from-green-600 to-blue-600 flex flex-col justify-center items-center font-poppins p-6">
// //       <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg max-w-md text-center w-full">
// //         <h1 className="text-3xl font-bold text-gray-800 mb-4">Sign Up</h1>
// //         <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
// //           <input
// //             type="text"
// //             name="username"
// //             placeholder="Username"
// //             value={userData.username}
// //             onChange={handleChange}
// //             className="w-full bg-transparent placeholder:text-gray-500 text-black text-sm border border-gray-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-500 hover:border-gray-400 shadow-lg ring-4 ring-transparent focus:ring-gray-200"
// //             required
// //           />
// //           <input
// //             type="email"
// //             name="email"
// //             placeholder="Email"
// //             value={userData.email}
// //             onChange={handleChange}
// //             className="w-full bg-transparent placeholder:text-gray-500 text-black text-sm border border-gray-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-500 hover:border-gray-400 shadow-lg ring-4 ring-transparent focus:ring-gray-200"
// //             required
// //           />
// //           <input
// //             type="password"
// //             name="password"
// //             placeholder="Password"
// //             value={userData.password}
// //             onChange={handleChange}
// //             className="w-full bg-transparent placeholder:text-gray-500 text-black text-sm border border-gray-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-500 hover:border-gray-400 shadow-lg ring-4 ring-transparent focus:ring-gray-200"
// //             required
// //           />
// //           <input
// //             type="password"
// //             name="password2"
// //             placeholder="Confirm Password"
// //             value={userData.password2}
// //             onChange={handleChange}
// //             className="w-full bg-transparent placeholder:text-gray-500 text-black text-sm border border-gray-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-500 hover:border-gray-400 shadow-lg ring-4 ring-transparent focus:ring-gray-200"
// //             required
// //           />
// //           <button
// //             type="submit"
// //             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
// //           >
// //             Sign Up
// //           </button>
// //         </form>
// //         {error && <p className="text-red-500 mt-4">{error}</p>}
// //       </div>
// //     </div>
// //   );
// // };

// // export default RegisterForm;


import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import holasignup from '../../assets/holasignup.gif'

const RegisterForm = () => {
  const { handleRegister, error } = useContext(AuthContext);
  const [userData, setUserData] = useState({ username: '', email: '', password: '', password2: '' });
  const navigate = useNavigate();

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validate email format
    if (!validateEmail(userData.email)) {
      newErrors.email = "Invalid email format";
      toast.error("Invalid email format");
    }

    // Validate password matching
    if (userData.password !== userData.password2) {
      newErrors.password2 = "Passwords do not match";
      toast.error("Passwords do not match");
    }

    // If there are no errors, proceed with registration
    if (Object.keys(newErrors).length === 0) {
      handleRegister(userData)
        .then(() => {
          toast.success("SignUp Success");
          navigate('/home');
        })
        .catch((err) => {
          toast.error("SignUp Failed");
          console.error("Error during registration:", err);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 gap-14">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md">
        <div className="bg-blue-600 text-white text-center py-4">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <p className="text-sm">Create your account</p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                value={userData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={userData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="password2"
                placeholder="Confirm Password"
                value={userData.password2}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Already have an account? <Link className="text-blue-500 underline" to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;