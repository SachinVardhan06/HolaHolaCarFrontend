import { motion } from "framer-motion";

const VEHICLE_TYPES = [
  { 
    id: "SEDAN", 
    label: "Sedan", 
    image: "https://www.motortrend.com/uploads/sites/5/2020/05/2020-Audi-A6-sedan-01.jpg",
    description: "4-door car with separate trunk" 
  },
  { 
    id: "SUV", 
    label: "SUV", 
    image: "https://www.theautoblogs.com/wp-content/uploads/2021/07/2021-Range-Rover-R-Dynamic-SE.jpg",
    description: "Sports Utility Vehicle" 
  },
  { 
    id: "HATCHBACK", 
    label: "Hatchback", 
    image: "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    description: "Compact car with rear door" 
  },
  { 
    id: "MPV", 
    label: "MPV", 
    image: "https://image.made-in-china.com/2f0j00wVQcltmSMdqi/2023-Petrol-Car-Hongqi-Hq9-High-Speed-2-0t-252HP-200km-H-Gasoline-MPV-Hongqi-Hq9-for-Whole-Family.jpg",
    description: "Multi-Purpose Vehicle" 
  },
];

export function VehicleType({ formData, updateFields }) {
  return (
    <div className="space-y-8">
      <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 mb-12">
        What type of vehicle do you have?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {VEHICLE_TYPES.map((type) => (
          <motion.button
            key={type.id}
            type="button"
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 25px 35px -5px rgba(0, 0, 0, 0.2), 0 15px 15px -5px rgba(0, 0, 0, 0.15)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateFields({ vehicle_type: type.id })}
            className={`relative overflow-hidden rounded-3xl transition-all duration-300 w-full ${
              formData.vehicle_type === type.id
                ? "ring-4 ring-blue-500 ring-offset-4 dark:ring-offset-gray-800"
                : "hover:ring-2 hover:ring-blue-200"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 z-10"/>
            <div className="h-80 w-full relative">
              <img
                src={type.image}
                alt={type.label}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  formData.vehicle_type === type.id
                    ? "scale-110"
                    : "hover:scale-105"
                }`}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="text-2xl font-bold text-white mb-2">
                  {type.label}
                </div>
                <div className="text-base text-gray-200">
                  {type.description}
                </div>
              </div>
            </div>
            {formData.vehicle_type === type.id && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-6 right-6 bg-blue-500 text-white p-3 rounded-full z-20 shadow-lg"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}