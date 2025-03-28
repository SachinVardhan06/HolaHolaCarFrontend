export function VehicleDocuments({ formData, updateFields }) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Vehicle Documents
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Insurance Valid Till
            </label>
            <input
              type="date"
              value={formData.insurance_valid_till}
              onChange={e => updateFields({ insurance_valid_till: e.target.value })}
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black dark:text-gray-950 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              Documents
            </label>
            <input
              type="file"
              onChange={e => updateFields({ documents: e.target.files[0] })}
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="mt-1 text-sm text-gray-500">
              Upload vehicle registration or insurance documents
            </p>
          </div>
  
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={formData.air_conditioned}
              onChange={e => updateFields({ air_conditioned: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700 dark:text-white">
              Air Conditioned
            </label>
          </div>
        </div>
      </div>
    );
  }