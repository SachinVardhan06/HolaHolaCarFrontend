import React from "react";

function Ridebookinfo() {
  return (
    <>
      <div>
        <div className="h-[700px] flex flex-row justify-center gap-8">
          <div className="mt-8 flex flex-col gap-4">
            <div className="h-32 bg-green-500 w-[900px] rounded-xl">ss</div>
            <div className="h-[300px] bg-green-500 w-[900px] rounded-xl">
              ss
            </div>
            <div className="h-32 bg-green-500 w-[900px] rounded-xl">ss</div>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <div className="h-64 w-[400px] shadow-lg flex rounded-2xl flex-col font-mono">
              <div className="text-[23px] flex justify-start pl-5 pt-6">Wednesday, 13 November</div>
              <div className="flex gap-8 p-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <p>03:30</p>
                  </div>
                  <div>07:00</div>
                </div>
                <div>|</div>
                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-[18px]">Dhampur</p>
                    <p className="text-[14px]">Nagina Chawara</p>
                  </div>
                  <div>
                    <p className="text-[18px]">Shivpuri</p>
                  </div>
                </div>
              </div>
              <div className="flex pl-6 pt-3 gap-5">
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
                <div>Sachin Vardhan</div>
              </div>
            </div>
            <div className="w-[400px] h-20 bg-white rounded-2xl flex justify-between items-center p-4 font-mono text-[18px] shadow-lg">
              <div className="">
                <p>1 Passenger</p>
              </div>
              <div>$ 280</div>
            </div>
            <div>
              <button className="bg-blue-500 h-14 w-[400px] rounded-3xl text-xl items-center justify-center shadow-lg text-white font-semibold hover:bg-blue-400">
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ridebookinfo;
