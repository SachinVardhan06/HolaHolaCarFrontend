export function VehicleDetails({ formData, updateFields }) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Vehicle Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Model
            </label>
            <input
              type="text"
              value={formData.model}
              onChange={e => updateFields({ model: e.target.value })}
              required
              placeholder="e.g., Corolla"
              className="w-full p-3 rounded-lg border text-black border-gray-300 dark:border-gray-600 bg-white dark:bg-black dark:text-gray-950 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Year
            </label>
            <input
              type="number"
              value={formData.year}
              onChange={e => updateFields({ year: e.target.value })}
              required
              min="1900"
              max={new Date().getFullYear()}
              className="w-full p-3 rounded-lg border text-black border-gray-300 dark:border-gray-600 bg-white dark:bg-black dark:text-gray-950 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Color
            </label>
            <input
              type="text"
              value={formData.color}
              onChange={e => updateFields({ color: e.target.value })}
              required
              placeholder="e.g., White"
              className="w-full p-3 rounded-lg border text-black border-gray-300 dark:border-gray-600 bg-white dark:bg-black dark:text-gray-950 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Vehicle Number
            </label>
            <input
              type="text"
              value={formData.vehicle_number}
              onChange={e => updateFields({ vehicle_number: e.target.value })}
              required
              placeholder="e.g., KA-01-AB-1234"
              className="w-full p-3 rounded-lg border text-black border-gray-300 dark:border-gray-600 bg-white dark:bg-black dark:text-gray-950 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    );
  }