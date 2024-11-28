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
      <Route path="register" element={<Register />} />
      <Route path="aboutus" element={<Aboutus />} />
      <Route path="howitworks" element={<Howitworks />} />
    </Route>
  )
);



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer/>
    </AuthProvider>
  </StrictMode>
);
