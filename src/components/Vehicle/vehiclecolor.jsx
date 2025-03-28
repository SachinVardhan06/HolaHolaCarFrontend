import { motion } from "framer-motion";

const VEHICLE_COLORS = [
  { id: "BLACK", name: "Black", hex: "#000000" },
  { id: "WHITE", name: "White", hex: "#FFFFFF" },
  { id: "SILVER", name: "Silver", hex: "#C0C0C0" },
  { id: "GRAY", name: "Gray", hex: "#808080" },
  { id: "RED", name: "Red", hex: "#FF0000" },
  { id: "BLUE", name: "Blue", hex: "#0000FF" },
  { id: "NAVY", name: "Navy Blue", hex: "#000080" },
  { id: "GREEN", name: "Green", hex: "#008000" },
  { id: "BROWN", name: "Brown", hex: "#964B00" },
  { id: "BEIGE", name: "Beige", hex: "#F5F5DC" },
  { id: "ORANGE", name: "Orange", hex: "#FFA500" },
  { id: "YELLOW", name: "Yellow", hex: "#FFFF00" },
  { id: "PURPLE", name: "Purple", hex: "#800080" },
  { id: "GOLD", name: "Gold", hex: "#FFD700" },
  { id: "MAROON", name: "Maroon", hex: "#800000" },
];

export function VehicleColor({ formData, updateFields }) {
  return (
    <div className="space-y-8">
      <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 mb-12">
        Select Vehicle Color
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {VEHICLE_COLORS.map((color) => (
          <motion.button
            key={color.id}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => updateFields({ color: color.id })}
            className={`group relative flex flex-col items-center p-4 rounded-xl transition-all duration-200 ${
              formData.color === color.id
                ? "ring-2 ring-blue-500 dark:ring-blue-400"
                : "hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full border-2 ${
                color.hex === "#FFFFFF" ? "border-gray-200" : "border-transparent"
              }`}
              style={{ backgroundColor: color.hex }}
            />
            <span className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              {color.name}
            </span>
            {formData.color === color.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1"
              >
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
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