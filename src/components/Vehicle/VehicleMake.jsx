import { motion } from "framer-motion";

const CAR_MAKES = [
  { id: "TOYOTA", logo: "🇯🇵", name: "Toyota" },
  { id: "HONDA", logo: "🇯🇵", name: "Honda" },
  { id: "FORD", logo: "🇺🇸", name: "Ford" },
  { id: "HYUNDAI", logo: "🇰🇷", name: "Hyundai" },
  { id: "TATA", logo: "🇮🇳", name: "Tata" },
  { id: "MAHINDRA", logo: "🇮🇳", name: "Mahindra" },
  { id: "BMW", logo: "🇩🇪", name: "BMW" },
  { id: "MERCEDES", logo: "🇩🇪", name: "Mercedes-Benz" },
  { id: "AUDI", logo: "🇩🇪", name: "Audi" },
  { id: "NISSAN", logo: "🇯🇵", name: "Nissan" },
  { id: "KIA", logo: "🇰🇷", name: "Kia" },
  {id : "VOLKSWAGEN", logo: "🇩🇪", name: "Volkswagen"},
  {id : "SKODA", logo: "🇨🇿", name: "Skoda"},
  {id: "MARUTI_SUZUKI", logo: "🇮🇳", name: "Maruti Suzuki"},
  // Add more as needed
];



export function VehicleMake({ formData, updateFields }) {
  return (
    <div className="space-y-8">
      <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 mb-12">
        Select Your Vehicle Make
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {CAR_MAKES.map((make) => (
          <motion.button
            key={make.id}
            type="button"
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateFields({ make: make.id, model: "" })}
            className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
              formData.make === make.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400"
                : "border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700"
            } ${
              formData.make === make.id
                ? "ring-4 ring-blue-500/20 dark:ring-blue-500/40"
                : ""
            }`}
          >
            <div className="text-4xl mb-4 transition-transform group-hover:scale-110">
              {make.logo}
            </div>
            <div className="text-base font-medium text-gray-900 dark:text-white">
              {make.name}
            </div>
            {formData.make === make.id && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute top-3 right-3 bg-blue-500 dark:bg-blue-400 text-white p-1.5 rounded-full"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
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