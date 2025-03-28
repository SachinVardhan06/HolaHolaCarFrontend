import { motion } from "framer-motion";
import { useState } from "react";

export function VehicleYear({ formData, updateFields }) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(formData.year || currentYear);
  const years = Array.from({ length: 25 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
        Select Vehicle Year
      </h3>
      
      <div className="relative">
        <div className="flex items-center justify-center space-x-4">
          <motion.select
            value={selectedYear}
            onChange={(e) => {
              const year = parseInt(e.target.value);
              setSelectedYear(year);
              updateFields({ year });
            }}
            className="w-48 h-14 text-center text-lg font-semibold bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </motion.select>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-5 gap-2 max-w-lg mx-auto">
            {years.slice(0, 10).map((year) => (
              <motion.button
                key={year}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedYear(year);
                  updateFields({ year });
                }}
                className={`p-3 rounded-lg text-center transition-all ${
                  selectedYear === year
                    ? "bg-blue-500 text-white font-medium"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {year}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Vehicle registration year must be between {currentYear - 24} and {currentYear}
        </div>
      </div>
    </div>
  );
}