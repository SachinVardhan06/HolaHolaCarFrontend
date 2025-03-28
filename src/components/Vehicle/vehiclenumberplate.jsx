import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export function NumberPlateInput({ formData, updateFields }) {
  const [plateNumber, setPlateNumber] = useState({
    state: "",
    district: "",
    series: "",
    number: "",
  });

  const districtRef = useRef(null);
  const seriesRef = useRef(null);
  const numberRef = useRef(null);

  // Add useEffect to handle formData updates
  useEffect(() => {
    if (formData.vehicle_number) {
      const match = formData.vehicle_number.match(/^([A-Z]{2})(\d{2})([A-Z]{2})(\d{4})$/);
      if (match) {
        setPlateNumber({
          state: match[1],
          district: match[2],
          series: match[3],
          number: match[4],
        });
      }
    }
  }, [formData.vehicle_number]);
  // Add new function to handle click on the plate
  const handlePlateClick = (inputRef) => {
    inputRef?.current?.focus();
  };

  // Add new function to determine which input should be focused
  const getNextInputToFocus = () => {
    if (!plateNumber.state) return stateRef;
    if (!plateNumber.district) return districtRef;
    if (!plateNumber.series) return seriesRef;
    if (!plateNumber.number) return numberRef;
    return null;
  };
  // Add new ref for first input
  const stateRef = useRef(null);

  // Auto focus first input on mount
  useEffect(() => {
    stateRef.current?.focus();
  }, []);

  // Add useEffect to update parent form
  useEffect(() => {
    const fullNumber = `${plateNumber.state}${plateNumber.district}${plateNumber.series}${plateNumber.number}`;
    if (fullNumber !== formData.vehicle_number) {
      updateFields({ vehicle_number: fullNumber });
    }
  }, [plateNumber, updateFields]);
  
  const handleChange = (part, value, nextRef = null) => {
    let formattedValue = value;
    
    switch (part) {
      case "state":
        formattedValue = value.toUpperCase().slice(0, 2).replace(/[^A-Z]/g, "");
        if (formattedValue.length === 2) nextRef?.current?.focus();
        break;
      case "district":
        formattedValue = value.replace(/\D/g, "").slice(0, 2);
        if (formattedValue.length === 2) nextRef?.current?.focus();
        break;
      case "series":
        formattedValue = value.toUpperCase().slice(0, 2).replace(/[^A-Z]/g, "");
        if (formattedValue.length === 2) nextRef?.current?.focus();
        break;
      case "number":
        formattedValue = value.replace(/\D/g, "").slice(0, 4);
        break;
    }

    setPlateNumber(prev => ({
      ...prev,
      [part]: formattedValue,
    }));
  };

  // ... rest of your existing JSX code ...

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
        Vehicle Registration Number
      </h3>
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="relative max-w-md mx-auto cursor-pointer"
        onClick={() => handlePlateClick(getNextInputToFocus())}
      >
        {/* Enhanced Plate Container */}
        <div className="bg-white border-[6px] border-black rounded-lg p-1 shadow-xl relative">
          {/* IND Badge */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white font-bold py-3 px-2 rounded-l-lg flex flex-col items-center justify-center space-y-1 border-2 border-black shadow-lg">
            <span className="text-[10px] font-bold tracking-wider">IND</span>
            <div className="w-6 h-6 bg-white rounded-full p-0.5">
              <img
                src="https://e7.pngegg.com/pngimages/76/415/png-clipart-india-flag-wheel-lion-capital-of-ashoka-sarnath-ashoka-chakra-pillars-of-ashoka-dharmachakra-chakra-blue-logo.png"
                alt="Ashoka Chakra"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Main Plate Content */}
          <div className="bg-[#F4CD00] px-10 py-6 rounded border-2 border-black flex items-center justify-center space-x-3 shadow-inner">
          <input
            ref={stateRef}
            type="text"
            value={plateNumber.state}
            onChange={(e) => handleChange("state", e.target.value, districtRef)}
            placeholder="KA"
            className="w-16 h-14 text-center bg-white border-2 border-black rounded-sm font-bold text-3xl uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner cursor-text transition-all duration-200 hover:border-blue-500"
            maxLength={2}
          />
          <span className="text-3xl font-bold text-black">-</span>
          <input
            ref={districtRef}
            type="text"
            value={plateNumber.district}
            onChange={(e) => handleChange("district", e.target.value, seriesRef)}
            placeholder="01"
            className="w-16 h-14 text-center bg-white border-2 border-black rounded-sm font-bold text-3xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner cursor-text transition-all duration-200 hover:border-blue-500"
            maxLength={2}
          />
          <span className="text-3xl font-bold text-black">-</span>
          <input
            ref={seriesRef}
            type="text"
            value={plateNumber.series}
            onChange={(e) => handleChange("series", e.target.value, numberRef)}
            placeholder="AB"
            className="w-16 h-14 text-center bg-white border-2 border-black rounded-sm font-bold text-3xl uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner cursor-text transition-all duration-200 hover:border-blue-500"
            maxLength={2}
          />
          <input
            ref={numberRef}
            type="text"
            value={plateNumber.number}
            onChange={(e) => handleChange("number", e.target.value)}
            placeholder="1234"
            className="w-28 h-14 text-center bg-white border-2 border-black rounded-sm font-bold text-3xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner cursor-text transition-all duration-200 hover:border-blue-500"
            maxLength={4}
          />
        </div>

          {/* Enhanced Hologram Effect */}
          <div className="absolute top-1/2 -right-3 -translate-y-1/2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-0.5 border-2 border-black shadow-lg">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <span className="text-[8px] font-bold text-gray-800">HSRP</span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Format: XX-00-XX-0000 (e.g., KA-01-AB-1234)
        </p>
      </motion.div>
    </div>
  );
}
