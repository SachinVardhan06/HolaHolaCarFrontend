// import { motion } from "framer-motion";
// import { useState, useContext, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ThemeContext } from "../components/comp/themeprovider";

// const VEHICLE_TYPES = [
//   { id: "SEDAN", label: "Sedan", icon: "🚗" },
//   { id: "SUV", label: "SUV", icon: "🚙" },
//   { id: "MPV", label: "MPV", icon: "🚐" },
//   { id: "HATCHBACK", label: "Hatchback", icon: "🏎️" },
// ];

// const AddVehicle = () => {
//   const navigate = useNavigate();
//   const { user, isAuthenticated } = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);
//   const { darkMode } = useContext(ThemeContext);

//   const [formData, setFormData] = useState({
//     vehicle_type: "SEDAN",
//     make: "",
//     model: "",
//     year: new Date().getFullYear(),
//     color: "",
//     vehicle_number: "",
//     insurance_valid_till: "",
//     air_conditioned: false,
//     documents: null,
//   });

//   const handleChange = (e) => {
//     const { name, type, value, checked, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox" ? checked : type === "file" ? files[0] : value,
//     }));
//   };

//   const validateForm = () => {
//     if (!formData.make) {
//       toast.error("Please enter vehicle make");
//       return false;
//     }
//     if (!formData.model) {
//       toast.error("Please enter vehicle model");
//       return false;
//     }
//     if (!formData.year) {
//       toast.error("Please enter vehicle year");
//       return false;
//     }
//     if (!formData.vehicle_number) {
//       toast.error("Please enter vehicle number");
//       return false;
//     }
//     if (!formData.color) {
//       toast.error("Please enter vehicle color");
//       return false;
//     }
//     if (!formData.insurance_valid_till) {
//       toast.error("Please enter insurance validity date");
//       return false;
//     }
//     if (!formData.documents) {
//       toast.error("Please upload vehicle documents");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       setLoading(true);
//       const formDataToSend = new FormData();

//       // Append all form data
//       Object.keys(formData).forEach((key) => {
//         if (key === "documents" && formData[key]) {
//           formDataToSend.append(key, formData[key]);
//         } else if (key === "year") {
//           formDataToSend.append(key, formData[key].toString());
//         } else if (key === "air_conditioned") {
//           formDataToSend.append(key, formData[key].toString());
//         } else {
//           formDataToSend.append(key, formData[key]);
//         }
//       });

//       // Add user ID
//       formDataToSend.append("user", user.id);

//       const response = await axios.post(
//         "http://localhost:8000/api/vehicles/",
//         formDataToSend,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );

//       if (response.status === 201 || response.status === 200) {
//         toast.success("Vehicle added successfully!");
//         setTimeout(() => navigate("/"), 2000);
//       }
//     } catch (error) {
//       console.error("Error adding vehicle:", error.response?.data);
//       const errorMessage =
//         error.response?.data?.vehicle_number?.[0] ||
//         error.response?.data?.detail ||
//         "Failed to add vehicle";
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <ToastContainer theme={darkMode ? "dark" : "light"} />
//       <div
//         className={`min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-black dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 mt-24`}
//       >
//         <div className="max-w-3xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className={`${
//               darkMode ? "bg-gray-800" : "bg-white"
//             } rounded-2xl shadow-xl overflow-hidden`}
//           >
//             <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 px-8 py-6">
//               <h2 className="text-2xl font-bold text-white">
//                 Add Your Vehicle
//               </h2>
//               <p className="text-blue-100 dark:text-blue-200 mt-2">
//                 Enter your vehicle details below
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="p-8 space-y-6">
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                 {VEHICLE_TYPES.map((type) => (
//                   <motion.button
//                     key={type.id}
//                     type="button"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         vehicle_type: type.id,
//                       }))
//                     }
//                     className={`p-4 rounded-xl border-2 transition-all ${
//                       formData.vehicle_type === type.id
//                         ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
//                         : "border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500"
//                     }`}
//                   >
//                     <div className="text-3xl mb-2">{type.icon}</div>
//                     <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                       {type.label}
//                     </div>
//                   </motion.button>
//                 ))}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
//                     Make
//                   </label>
//                   <input
//                     type="text"
//                     name="make"
//                     value={formData.make}
//                     onChange={handleChange}
//                     required
//                     placeholder="e.g., Toyota"
//                     className="w-full p-3 rounded-lg border text-black border-gray-300 dark:border-gray-600 bg-white dark:bg-black dark:text-gray-950 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
//                     Model
//                   </label>
//                   <input
//                     type="text"
//                     name="model"
//                     value={formData.model}
//                     onChange={handleChange}
//                     required
//                     placeholder="e.g., Corolla"
//                     className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Year
//                   </label>
//                   <input
//                     type="number"
//                     name="year"
//                     value={formData.year}
//                     onChange={handleChange}
//                     required
//                     min="1900"
//                     max={new Date().getFullYear()}
//                     className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Color
//                   </label>
//                   <input
//                     type="text"
//                     name="color"
//                     value={formData.color}
//                     onChange={handleChange}
//                     required
//                     placeholder="e.g., White"
//                     className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Vehicle Number
//                   </label>
//                   <input
//                     type="text"
//                     name="vehicle_number"
//                     value={formData.vehicle_number}
//                     onChange={handleChange}
//                     required
//                     placeholder="e.g., KA-01-AB-1234"
//                     className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Insurance Valid Till
//                   </label>
//                   <input
//                     type="date"
//                     name="insurance_valid_till"
//                     value={formData.insurance_valid_till}
//                     onChange={handleChange}
//                     required
//                     min={new Date().toISOString().split("T")[0]}
//                     className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="air_conditioned"
//                     checked={formData.air_conditioned}
//                     onChange={handleChange}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <label className="ml-2 block text-sm text-gray-700 dark:text-white">
//                     Air Conditioned
//                   </label>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
//                     Documents
//                   </label>
//                   <input
//                     type="file"
//                     name="documents"
//                     onChange={handleChange}
//                     accept=".pdf,.jpg,.jpeg,.png"
//                     className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                   <p className="mt-1 text-sm text-gray-500">
//                     Upload vehicle registration or insurance documents
//                   </p>
//                 </div>
//               </div>

//               <div className="pt-4">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
//                 >
//                   {loading ? (
//                     <span className="flex items-center">
//                       <svg
//                         className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Adding Vehicle...
//                     </span>
//                   ) : (
//                     "Add Vehicle"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddVehicle;

// import { motion } from "framer-motion";
// import { useState, useContext } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import { AuthContext } from "../context/AuthContext";
// import { ThemeContext } from "./comp/themeprovider";
// import { useNavigate } from "react-router-dom";
// import { useMultiStepForm } from "./Vehicle/vehiclehook";
// import { VehicleType } from "./Vehicle/Vehicletype";
// import { VehicleMake } from "./Vehicle/VehicleMake";
// import { CarModel } from "./Vehicle/carmodel";
// import { VehicleDetails } from "./Vehicle/VehicleDetails";
// import { VehicleDocuments } from "./Vehicle/vehicledocuments";
// import axios from "axios";

// const AddVehicle = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const { darkMode } = useContext(ThemeContext);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     vehicle_type: "",
//     make: "",
//     model: "",
//     year: new Date().getFullYear(),
//     color: "",
//     vehicle_number: "",
//     insurance_valid_till: "",
//     air_conditioned: false,
//     documents: null,
//   });

//   const updateFields = (fields) => {
//     setFormData(prev => ({ ...prev, ...fields }));
//   };

//   const {
//     step,
//     currentStepIndex,
//     steps,
//     isFirstStep,
//     isLastStep,
//     back,
//     next,
//     setStepValidation,
//   } = useMultiStepForm([
//     <VehicleType formData={formData} updateFields={updateFields} />,
//     <VehicleMake formData={formData} updateFields={updateFields} />,
//     <VehicleDetails formData={formData} updateFields={updateFields} />,
//     <VehicleDocuments formData={formData} updateFields={updateFields} />,
//   ]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate current step before proceeding
//     if (!isLastStep) {
//       // Add validation logic for each step
//       let isValid = false;
//       switch (currentStepIndex) {
//         case 0: // Vehicle Type
//           isValid = formData.vehicle_type !== "";
//           if (!isValid) {
//             toast.error("Please select a vehicle type");
//             return;
//           }
//           break;
//         case 1: // Vehicle Make
//           isValid = formData.make !== "";
//           if (!isValid) {
//             toast.error("Please select a vehicle make");
//             return;
//           }
//           break;
//         case 2: // Vehicle Details
//           isValid = formData.model !== "" &&
//                    formData.year !== "" &&
//                    formData.color !== "" &&
//                    formData.vehicle_number !== "";
//           if (!isValid) {
//             toast.error("Please fill in all vehicle details");
//             return;
//           }
//           break;
//         default:
//           isValid = true;
//       }

//       next();
//       return;
//     }

//     // Final validation before submission
//     if (!formData.documents) {
//       toast.error("Please upload vehicle documents");
//       return;
//     }

//     try {
//       setLoading(true);
//       const formDataToSend = new FormData();

//       // Append all form data
//       Object.keys(formData).forEach((key) => {
//         if (key === "documents" && formData[key]) {
//           formDataToSend.append(key, formData[key]);
//         } else if (typeof formData[key] === "boolean") {
//           formDataToSend.append(key, formData[key].toString());
//         } else {
//           formDataToSend.append(key, formData[key]);
//         }
//       });

//       // Add user ID
//       formDataToSend.append("user", user.id);

//       const response = await axios.post(
//         "http://localhost:8000/api/vehicles/",
//         formDataToSend,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );

//       if (response.status === 201 || response.status === 200) {
//         toast.success("Vehicle added successfully!");
//         setTimeout(() => navigate("/"), 2000);
//       }
//     } catch (error) {
//       console.error("Error adding vehicle:", error.response?.data);
//       const errorMessage =
//         error.response?.data?.vehicle_number?.[0] ||
//         error.response?.data?.detail ||
//         "Failed to add vehicle";
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <ToastContainer theme={darkMode ? "dark" : "light"} />
//       <div className={`min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-black dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 mt-24`}>
//         <div className="max-w-6xl mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-xl overflow-hidden`}
//           >
//             <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 px-8 py-6">
//               <h2 className="text-2xl font-bold text-white">Add Your Vehicle</h2>
//               <div className="mt-4 flex gap-2">
//                 {steps.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`flex-1 h-1 rounded-full transition-colors ${
//                       index <= currentStepIndex ? "bg-white" : "bg-blue-200"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <p className="text-blue-100 mt-2">Step {currentStepIndex + 1} of {steps.length}</p>
//             </div>

//             <form onSubmit={handleSubmit} className="p-8 space-y-6">
//               {step}

//               <div className="flex justify-between pt-6">
//                 {!isFirstStep && (
//                   <button
//                     type="button"
//                     onClick={back}
//                     className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
//                   >
//                     Back
//                   </button>
//                 )}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`ml-auto px-6 py-2 rounded-lg text-white font-medium ${
//                     loading
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-blue-600 hover:bg-blue-700"
//                   }`}
//                 >
//                   {loading ? (
//                     <span className="flex items-center">
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /* existing SVG... */ />
//                       Adding Vehicle...
//                     </span>
//                   ) : isLastStep ? (
//                     "Add Vehicle"
//                   ) : (
//                     "Next"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddVehicle;

import { motion } from "framer-motion";
import { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "./comp/themeprovider";
import { useNavigate } from "react-router-dom";
import { useMultiStepForm } from "./Vehicle/vehiclehook";
import { VehicleType } from "./Vehicle/Vehicletype";
import { VehicleMake } from "./Vehicle/VehicleMake";
import { CarModel } from "./Vehicle/carmodel";
import { VehicleDetails } from "./Vehicle/VehicleDetails";
import { VehicleDocuments } from "./Vehicle/vehicledocuments";
import { VehicleColor } from "./Vehicle/vehiclecolor";
import { NumberPlateInput } from "./Vehicle/vehiclenumberplate";
import { VehicleYear } from "./Vehicle/vehicleyear";

import axios from "axios";

const AddVehicle = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    vehicle_type: "",
    make: "",
    model: "",
    year: new Date().getFullYear(),
    color: "",
    vehicle_number: "",
    insurance_valid_till: "",
    air_conditioned: false,
    documents: null,
  });

  const updateFields = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const { step, currentStepIndex, steps, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <VehicleType formData={formData} updateFields={updateFields} />,
      <VehicleMake formData={formData} updateFields={updateFields} />,
      <CarModel formData={formData} updateFields={updateFields} />,
      <VehicleYear formData={formData} updateFields={updateFields} />,
      <VehicleColor formData={formData} updateFields={updateFields} />,
      <NumberPlateInput formData={formData} updateFields={updateFields} />,
      <VehicleDocuments formData={formData} updateFields={updateFields} />,
    ]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!isLastStep) {
  //     let isValid = false;
  //     switch (currentStepIndex) {
  //       case 0: // Vehicle Type
  //         isValid = formData.vehicle_type !== "";
  //         if (!isValid) {
  //           toast.error("Please select a vehicle type");
  //           return;
  //         }
  //         break;
  //       case 1: // Vehicle Make
  //         isValid = formData.make !== "";
  //         if (!isValid) {
  //           toast.error("Please select a vehicle make");
  //           return;
  //         }
  //         break;
  //       case 2: // Vehicle Model
  //         isValid = formData.model !== "";
  //         if (!isValid) {
  //           toast.error("Please select a vehicle model");
  //           return;
  //         }
  //         break;
  //       case 3: // Vehicle Details
  //         isValid =
  //           formData.year !== "" &&
  //           formData.color !== "" &&
  //           formData.vehicle_number !== "";
  //         if (!isValid) {
  //           toast.error("Please fill in all vehicle details");
  //           return;
  //         }
  //         break;
  //       case 4: // Documents
  //         isValid =
  //           formData.documents !== null && formData.insurance_valid_till !== "";
  //         if (!isValid) {
  //           toast.error("Please upload documents and set insurance validity");
  //           return;
  //         }
  //         break;
  //       default:
  //         isValid = true;
  //     }

  //     next();
  //     return;
  //   }

  //   // Final submission
  //   try {
  //     setLoading(true);
  //     const formDataToSend = new FormData();

  //     // Append all form data
  //     Object.keys(formData).forEach((key) => {
  //       if (key === "documents" && formData[key]) {
  //         formDataToSend.append(key, formData[key]);
  //       } else if (typeof formData[key] === "boolean") {
  //         formDataToSend.append(key, formData[key].toString());
  //       } else if (formData[key] !== null && formData[key] !== undefined) {
  //         formDataToSend.append(key, formData[key]);
  //       }
  //     });

  //     // Add user ID
  //     formDataToSend.append("user", user.id);

  //     const response = await axios.post(
  //       "http://localhost:8000/api/vehicles/",
  //       formDataToSend,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     if (response.status === 201 || response.status === 200) {
  //       toast.success("Vehicle added successfully!");
  //       setTimeout(() => navigate("/"), 2000);
  //     }
  //   } catch (error) {
  //     console.error("Error adding vehicle:", error.response?.data);
  //     const errorMessage =
  //       error.response?.data?.vehicle_number?.[0] ||
  //       error.response?.data?.detail ||
  //       "Failed to add vehicle";
  //     toast.error(errorMessage);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // Update the handleSubmit function validation cases
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLastStep) {
      let isValid = false;
      switch (currentStepIndex) {
        case 0: // Vehicle Type
          isValid = formData.vehicle_type !== "";
          if (!isValid) {
            toast.error("Please select a vehicle type");
            return;
          }
          break;
        case 1: // Vehicle Make
          isValid = formData.make !== "";
          if (!isValid) {
            toast.error("Please select a vehicle make");
            return;
          }
          break;
        case 2: // Vehicle Model
          isValid = formData.model !== "";
          if (!isValid) {
            toast.error("Please select a vehicle model");
            return;
          }
          break;
          case 3: // Vehicle Year
          isValid = formData.year && 
                   formData.year >= (new Date().getFullYear() - 24) && 
                   formData.year <= new Date().getFullYear();
          if (!isValid) {
            toast.error("Please select a valid vehicle year");
            return;
          }
          break;
        case 4: // Vehicle Color
          isValid = formData.color !== "";
          if (!isValid) {
            toast.error("Please select a vehicle color");
            return;
          }
          break;
        case 5: // Number Plate
          isValid =
            formData.vehicle_number && formData.vehicle_number.length >= 8;
          if (!isValid) {
            toast.error("Please enter a valid vehicle number");
            return;
          }
          break;
        case 6: // Documents
          isValid = formData.documents !== null;
          if (!isValid) {
            toast.error("Please upload vehicle documents");
            return;
          }
          break;
        default:
          isValid = true;
      }

      next();
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "documents" && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else if (typeof formData[key] === "boolean") {
          formDataToSend.append(key, formData[key].toString());
        } else if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      });

      formDataToSend.append("user", user.id);

      const response = await axios.post(
        "http://localhost:8000/api/vehicles/",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Vehicle added successfully!");
        setTimeout(() => navigate("/my-vehicles"), 2000);
      }
    } catch (error) {
      console.error("Error adding vehicle:", error.response?.data);
      const errorMessage =
        error.response?.data?.vehicle_number?.[0] ||
        error.response?.data?.detail ||
        "Failed to add vehicle";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ToastContainer theme={darkMode ? "dark" : "light"} />
      <div
        className={`min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-black dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 mt-24`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-2xl shadow-xl overflow-hidden`}
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 px-8 py-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Add Your Vehicle
                  </h2>
                  <p className="text-blue-100 mt-2">
                    Step {currentStepIndex + 1} of {steps.length}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/my-vehicles")}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  <span>My Vehicles</span>
                </motion.button>
              </div>
              <div className="mt-4 flex gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`flex-1 h-1 rounded-full transition-colors ${
                      index <= currentStepIndex ? "bg-white" : "bg-blue-200"
                    }`}
                  />
                ))}
              </div>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {step}

              <div className="flex justify-between pt-6">
                {!isFirstStep && (
                  <button
                    type="button"
                    onClick={back}
                    className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className={`ml-auto px-6 py-2 rounded-lg text-white font-medium ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding Vehicle...
                    </span>
                  ) : isLastStep ? (
                    "Add Vehicle"
                  ) : (
                    "Next"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AddVehicle;
