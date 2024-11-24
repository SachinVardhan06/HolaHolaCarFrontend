import React,{useState} from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './src/components/navbar'
import Footer from './src/components/footer';

function Layout() {
    return (
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>     
    )
}

export default Layout

// import { Outlet, useLocation } from "react-router-dom";
// import Navbar from "./src/components/navbar"

// const Layout = () => {
//   const location = useLocation();
//   // Define the paths where the navbar should be hidden
//   const hideNavbarPaths = ["/login", "/register"];
  
//   // Check if the current path is in the list of paths to hide the navbar
//   const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

//   return (
//     <div>
//       {!shouldHideNavbar && <Navbar />}
//       <Outlet /> {/* Render the child routes */}
//     </div>
//   );
// };

// export default Layout;
