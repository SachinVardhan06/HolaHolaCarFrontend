import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "../layout.jsx";
import Homepage from "./components/homepage.jsx";
import Publishride from "./components/publishride.jsx";
import Ridelists from "./components/ridelists.jsx";
import Ridebookinfo from "./components/ridebookinfo.jsx";
import Login from "./components/authcomp/Login.jsx";
import Register from "./components/authcomp/Register.jsx";
import Searchpage from "./components/searchpage.jsx";
import { AuthProvider } from './context/AuthContext.jsx';
import Aboutus from "./components/About/AboutUs/About US/aboutus.jsx";
import Howitworks from "./components/About/HowitWorks/howitworks.jsx";
import Newregister from "./components/authcomp/newregister.jsx";
import Profile from "./components/authcomp/profile.jsx";
import AddVehicle from "./components/addvechicle.jsx";
import RegisterForm from "./components/authcomp/Register.jsx";
import { ThemeProvider } from "./components/comp/themeprovider.jsx";
import MyRides from "./components/myrides.jsx";
import MyVehicles from "./components/Vehicle/myvehicle.jsx";
import BookRide from "./components/bookride.jsx";
import MyBookedRides from "./components/mybookedrides.jsx";
import HelpCenter from "./components/FooterComp/HelpCenter.jsx";
import Community from "./components/FooterComp/communitycars.jsx";
import Blog from "./components/FooterComp/blog.jsx";
import HowItWorks from "./components/FooterComp/howitworks.jsx";
import Contact from "./components/FooterComp/contact.jsx";
import PrivacyPolicy from "./components/FooterComp/privacypolicy.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Homepage />} />
      <Route path="home" element={<Homepage />} />
      <Route path='search' element={<Searchpage/>} />
      <Route path="publish" element={<Publishride />} />
      <Route path="ridelist" element={<Ridelists />} />
      <Route path="ridebookinfo" element={<Ridebookinfo />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<RegisterForm/>} />
      <Route path="aboutus" element={<Aboutus />} />
      <Route path="howitworks" element={<Howitworks/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/add-vehicle" element={<AddVehicle />} />
      <Route path="/my-rides" element={<MyRides />} />
      <Route path="/my-vehicles" element={<MyVehicles />} />
      <Route path="/book-ride/:rideId" element={<BookRide />} />
      <Route path="/my-booked-rides" element={<MyBookedRides />} />
      <Route path="/support" element={<HelpCenter />} />
      <Route path="/community" element={<Community />} />
      <Route path="/blog" element={<Blog/>} />
      <Route path="/how-it-works" element={<HowItWorks/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="privacy" element={<PrivacyPolicy/>} />
    </Route>
  )
);



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer/>
    </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
