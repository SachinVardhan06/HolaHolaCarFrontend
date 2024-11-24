import React, { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "./comp/Button";



const  Ridelists = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    console.log("Button clicked!");
  };
  useEffect(() => {
    if (location.pathname === "/ridelist/publish") {
      navigate("/publish", { replace: true });
    }
  }, [location, navigate]);


  return (
    <>
      <div>
        <div className="h-[100px] bg-blue-500 flex items-center justify-center">
          <h1 className="text-2xl text-boltext font-mono">
            Available Ride From Dhampur to Greater Noida
          </h1>
        </div>
         <div className="h-full flex justify-center flex-col items-center">
          <div className="bg-gray-100 shadow-lg h-[300px] mt-5 flex flex-col p-5 rounded-2xl gap-5 w-[70%]">
            <div className="flex justify-between items-center gap-20">
              <div className="flex flex-row items-start gap-4">
                <div className="flex flex-col items-center">
                  <p className="text-lg font-semibold">07:23</p>
                  <p className="text-gray-500">Dhampur</p>
                  <p className="text-xs text-gray-400 w-[80%] text-center">
                    Nagina Chowk
                  </p>
                </div>
                <div className="flex flex-col items-center text-sm text-gray-500">
                  <p>To</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-lg font-semibold">09:45</p>
                  <p className="text-gray-500">Greater Noida</p>
                  <p className="text-xs text-gray-400 w-[80%] text-center">
                    Pari Chowk
                  </p>
                </div>
              </div>
              <div className="text-xl font-bold text-green-600">$400</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div>
                  <svg
                    className="h-8 w-8 text-black"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="7" cy="17" r="2" />
                    <circle cx="17" cy="17" r="2" />
                    <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Sachin Vardhan</p>
                </div>
              </div>
              <div>
                <Button
                  label="Book"
                  onClick={handleClick}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                  }}
                  className="hover:bg-green-600 transition-all duration-200"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-100 shadow-lg h-[300px] mt-5 flex flex-col p-5 rounded-2xl gap-5 w-[70%]">
            <div className="flex justify-between items-center gap-20">
              <div className="flex flex-row items-start gap-4">
                <div className="flex flex-col items-center">
                  <p className="text-lg font-semibold">07:23</p>
                  <p className="text-gray-500">Dhampur</p>
                  <p className="text-xs text-gray-400 w-[80%] text-center">
                    Nagina Chowk
                  </p>
                </div>
                <div className="flex flex-col items-center text-sm text-gray-500">
                  <p>To</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-lg font-semibold">09:45</p>
                  <p className="text-gray-500">Greater Noida</p>
                  <p className="text-xs text-gray-400 w-[80%] text-center">
                    Pari Chowk
                  </p>
                </div>
              </div>
              <div className="text-xl font-bold text-green-600">$400</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div>
                  <svg
                    className="h-8 w-8 text-black"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="7" cy="17" r="2" />
                    <circle cx="17" cy="17" r="2" />
                    <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Sachin Vardhan</p>
                </div>
              </div>
              <div>
                <Button
                  label="Book"
                  onClick={handleClick}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                  }}
                  className="hover:bg-green-600 transition-all duration-200"
                />
              </div>
            </div>
          </div>
          </div> 
      </div>
    </>
  );
}

export default Ridelists;
