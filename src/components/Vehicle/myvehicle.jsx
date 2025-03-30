import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../comp/themeprovider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export const CAR_MODELS = {
  TOYOTA: [
    {
      id: "CAMRY",
      name: "Camry",
      year_range: "1998-2024",
      image:
        "https://imgd.aeplcdn.com/664x374/n/cw/ec/110233/camry-exterior-right-front-three-quarter-3.jpeg",
    },
    {
      id: "COROLLA",
      name: "Corolla",
      year_range: "1995-2024",
      image:
        "https://s1.paultan.org/image/2019/09/2019-Toyota-Corolla-Japan-market-launch-2.jpg",
    },
    {
      id: "INNOVA",
      name: "Innova",
      year_range: "2005-2024",
      image:
        "https://img.philkotse.com/2023/07/10/WFFKkBCT/zenix-1-2ee1_wm.png",
    },
    {
      id: "FORTUNER",
      name: "Fortuner",
      year_range: "2009-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/44709/fortuner-exterior-right-front-three-quarter-19.jpeg",
    },
    {
      id: "LAND_CRUISER",
      name: "Land Cruiser",
      year_range: "2008-2024",
      image:
        "https://cdn.motor1.com/images/mgl/VA02z/s1/next-gen-toyota-land-cruiser-renderings.jpg",
    },
  ],
  HONDA: [
    {
      id: "CITY",
      name: "City",
      year_range: "1998-2024",
      image:
        "https://danviet.mediacdn.vn/296231569849192448/2023/8/21/gia-xe-honda-city-danvietvn2-16925838977231385304634.jpg",
    },
    {
      id: "CIVIC",
      name: "Civic",
      year_range: "1995-2024",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/2022-honda-civic-hatchback-sport-touring-309-1634066512.jpg?crop=0.554xw:0.415xh;0.327xw,0.525xh&resize=1200:*",
    },
    {
      id: "AMAZE",
      name: "Amaze",
      year_range: "2013-2024",
      image:
        "https://th.bing.com/th/id/R.3d8ef5a2bde1fe0cba89f5d0325b24fa?rik=half6cWvUtu%2bSw&riu=http%3a%2f%2fimages.topgear.com.ph%2ftopgear%2fimages%2f2024%2f12%2f04%2fhonda-amaze-2025-1-1733301975.webp&ehk=ZaikDskhSfTmPIrW25jQp3IoO8kNNLgTQphbepnggk4%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      id: "CRV",
      name: "CR-V",
      year_range: "2001-2024",
      image: "https://images.hgmsites.net/hug/2018-honda-cr-v_100626779_h.jpg",
    },
    {
      id: "HRV",
      name: "HR-V",
      year_range: "2021-2024",
      image:
        "https://escolaeducacao.com.br/wp-content/uploads/2023/05/honda-hr-v-touring-2023.webp",
    },
  ],
  HYUNDAI: [
    {
      id: "CRETA",
      name: "Creta",
      year_range: "2015-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/106257/creta-exterior-right-front-three-quarter-4.jpeg",
    },
    {
      id: "VERNA",
      name: "Verna",
      year_range: "2006-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/121943/verna-exterior-right-front-three-quarter-9.jpeg",
    },
    {
      id: "I20",
      name: "i20",
      year_range: "2008-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/40530/i20-exterior-right-front-three-quarter-5.jpeg",
    },
    {
      id: "VENUE",
      name: "Venue",
      year_range: "2019-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/141113/venue-exterior-right-front-three-quarter-5.jpeg",
    },
    {
      id: "SONATA",
      name: "Sonata",
      year_range: "1985-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/114907/sonata-exterior-right-front-three-quarter-1.jpeg",
    },
  ],
  MAHINDRA: [
    {
      id: "THAR",
      name: "Thar",
      year_range: "2010-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/40087/thar-exterior-right-front-three-quarter-11.jpeg",
    },
    {
      id: "XUV700",
      name: "XUV700",
      year_range: "2021-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/42355/xuv700-exterior-right-front-three-quarter.jpeg",
    },
    {
      id: "SCORPIO",
      name: "Scorpio",
      year_range: "2002-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-15.jpeg",
    },
    {
      id: "XUV300",
      name: "XUV300",
      year_range: "2019-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/26918/xuv300-exterior-right-front-three-quarter-148709.jpeg",
    },
    {
      id: "ALTURAS",
      name: "Alturas",
      year_range: "2018-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/41504/alturas-g4-exterior-right-front-three-quarter-4.jpeg",
    },
  ],
  FORD: [
    {
      id: "MUSTANG",
      name: "Mustang",
      year_range: "1965-2024",
      image:
        "https://th.bing.com/th/id/OIP.682THEpheKRu74atngM1nAHaE1?rs=1&pid=ImgDetMain",
    },
    {
      id: "F150",
      name: "F-150",
      year_range: "1948-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/108348/f150-exterior-right-front-three-quarter-16.jpeg",
    },
    {
      id: "RANGER",
      name: "Ranger",
      year_range: "1983-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/118064/ranger-exterior-right-front-three-quarter-8.jpeg",
    },
    {
      id: "ECOSPORT",
      name: "EcoSport",
      year_range: "2003-2024",
      image:
        "https://imgd.aeplcdn.com/1200x900/n/cw/ec/116204/ecosport-exterior-right-front-three-quarter-10.jpeg",
    },
  ],
};

const MyVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetchVehicles();
  }, [user]);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        "https://holaholacarbackend-5.onrender.com/api/vehicles/user/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      toast.error(error.response?.data?.detail || "Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };
  const getVehicleImage = (make, modelId) => {
    try {
      const makeModels = CAR_MODELS[make.toUpperCase()];
      if (makeModels) {
        const model = makeModels.find((m) => m.id === modelId);
        return model?.image;
      }
    } catch (error) {
      console.error("Error getting vehicle image:", error);
    }
    return "https://www.pngmart.com/files/22/Car-Silhouette-PNG-Transparent.png"; // Default image
  };

  const handleDeleteVehicle = async (vehicleId) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await axios.delete(
          `https://holaholacarbackend-5.onrender.com/api/vehicles/${vehicleId}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        toast.success("Vehicle deleted successfully");
        fetchVehicles();
      } catch (error) {
        console.error("Error deleting vehicle:", error);
        toast.error("Failed to delete vehicle");
      }
    }
  };

  return (
    <>
      <ToastContainer theme={darkMode ? "dark" : "light"} />
      <div
        className={`min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-black dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 mt-24`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Vehicles
            </h1>
            <Link
              to="/add-vehicle"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add New Vehicle
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : vehicles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
                You haven't added any vehicles yet
              </p>
              <Link
                to="/add-vehicle"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Your First Vehicle
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } rounded-xl shadow-lg overflow-hidden`}
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={getVehicleImage(vehicle.make, vehicle.model)}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://www.pngmart.com/files/22/Car-Silhouette-PNG-Transparent.png";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                        {vehicle.vehicle_type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {vehicle.make} {vehicle.model}
                    </h3>
                    <div className="space-y-2 text-gray-600 dark:text-gray-300">
                      <p>Type: {vehicle.vehicle_type}</p>
                      <p>Year: {vehicle.year}</p>
                      <p>Color: {vehicle.color}</p>
                      <p>Number: {vehicle.vehicle_number}</p>
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                      <button
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyVehicles;
