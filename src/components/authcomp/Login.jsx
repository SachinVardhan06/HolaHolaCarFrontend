import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import login from "../../assets/login.gif";

const LoginForm = () => {
  const { handleLogin, error } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginSuccess = handleLogin(credentials);

    if (!loginSuccess) {
      // If login is successful, navigate and show the toast
      navigate("/home");
      toast.success("Login Success");
      setTimeout(() => {
        window.location.href = "/home";
      }, 5000);
    }
    if (loginSuccess) {
      navigate("/home");
      toast.success("Login Success");
    }
  };

  return (
    // <div className="h-screen w-screen overflow-hidden relative flex justify-center items-center font-poppins gap-44 bg-blue-700">
    //   <div className="">
    //     <img className="h-[400px]" src={login} alt="" />
    //   </div>
    //   <div className="relative z-10 flex gap-20 bg-opacity-30">
    //     <div className="h-auto w-[400px] p-8 rounded-2xl shadow-lg backdrop-blur-lg flex flex-col items-center bg-opacity-30">
    //       <h1 className="text-2xl font-semibold mb-2 text-black">Login</h1>
    //       <h2 className="text-sm text-black mb-6 text-center">
    //         Enter your credentials to access your account
    //       </h2>
    //       <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
    //         {/* Email Input */}
    //         <input
    //           value={credentials.email}
    //           onChange={(e) =>
    //             setCredentials({ ...credentials, email: e.target.value })
    //           }
    //           name="email"
    //           type="email"
    //           placeholder="Email"
    //           required
    //           className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
    //         />
    //         {/* Password Input */}
    //         <input
    //           name="password"
    //           type="password"
    //           value={credentials.password}
    //           onChange={(e) =>
    //             setCredentials({ ...credentials, password: e.target.value })
    //           }
    //           placeholder="Password"
    //           required
    //           className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
    //         />
    //         {error && <div>{error}</div>}
    //         <p><span className="text-black">Don't have Account</span> <Link className="text-blue-500" to="/register">Sign Up</Link></p>
    //         {/* Login Button */}

    //         <button
    //           type="submit"
    //           className="w-full text-black text-sm font-semibold py-2 rounded-md border border-green-500 transition duration-300 ease focus:ring-2 focus:ring-slate-500"
    //         >
    //           Login
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    //</div>
    <div className="h-screen w-screen overflow-hidden relative flex flex-col md:flex-row justify-center items-center font-poppins bg-gradient-to-r from-blue-500 to-purple-600 px-4">
      <div className="hidden md:block">
        <img
          className="h-[400px] md:h-[500px] object-cover"
          src={login}
          alt="Login"
        />
      </div>
      <div className="relative z-10 flex flex-col gap-8 bg-opacity-30 p-6 md:p-8 rounded-2xl shadow-lg backdrop-blur-lg bg-white/30 w-full max-w-md mx-4 md:mx-0">
        <div
          className="md:hidden absolute inset-0 bg-cover bg-center rounded-2xl"
          style={{ backgroundImage: `url(${login})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
        </div>
        <h1 className="text-3xl font-semibold mb-2 text-white relative z-20">
          Login
        </h1>
        <h2 className="text-sm text-white mb-6 text-center relative z-20">
          Enter your credentials to access your account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 relative z-20"
        >
          {/* Email Input */}
          <input
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full bg-transparent placeholder:text-slate-200 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
          />
          {/* Password Input */}
          <input
            name="password"
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            placeholder="Password"
            required
            className="w-full bg-transparent placeholder:text-slate-200 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-lg shadow-gray-100 ring-4 ring-transparent focus:ring-slate-100"
          />
          {error && <div className="text-red-500">{error}</div>}
          <p className="text-white text-center">
            <span>Don't have an account?</span>{" "}
            <Link className="text-blue-300" to="/register">
              Sign Up
            </Link>
          </p>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full text-white text-sm font-semibold py-2 rounded-md bg-green-500 hover:bg-green-600 transition duration-300 ease focus:ring-2 focus:ring-slate-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

// import React, { useState, useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext'

// const LoginForm = () => {
//   const { handleLogin, error } = useContext(AuthContext);
//   const [credentials, setCredentials] = useState({ email: '', password: '' });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleLogin(credentials);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         value={credentials.email}
//         onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={credentials.password}
//         onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//         placeholder="Password"
//       />
//       {error && <div>{error}</div>}
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;
