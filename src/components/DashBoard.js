import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNavbar from "./BottomNavBar"; // Import Bottom Navbar
import Attendance from "./Attendance"; // Import Attendance Component
import Results from "./Results"; // Import Results Component

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const navigate = useNavigate();
  const location = useLocation();
  const student = location.state?.student.data;

  return (
    <div className="h-screen w-full bg-gray-300 flex flex-col">
      {/* Navbar */}
      <nav className="bg-[#2D2A43] text-white flex justify-between items-center px-6 py-3">
        <div className="flex items-center gap-4">
          <img
            src="https://www.sgpbellary.com/images/clients/sgp.png"
            alt="College Logo"
            className="h-10 w-auto"
          />
          <div className="text-lg font-semibold">Sanjay Gandhi Polytechnic</div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <FaUserCircle className="text-gray-300 text-3xl" />
            <div className="text-white">
              <p className="font-semibold">
                {String(student.name).toUpperCase()}
              </p>
              <p className="text-xs text-gray-300">
                Reg: {String(student.registrationNumber).toUpperCase()} |{" "}
                {student.sem} Sem
              </p>
            </div>
          </div>
          <button
            className="bg-[#9569D8] hover:bg-[#ac3131] px-4 py-2 rounded text-white font-medium"
            onClick={() => {
              navigate("/");
            }}
          >
            Log Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        {activeTab === "Dashboard" && (
          <div
            className="bg-[#2D2A43] p-8 rounded-lg shadow-2xl w-96 flex flex-col items-center transform hover:scale-105 transition-transform duration-300"
            style={{ boxShadow: "0 10px 25px rgba(149, 105, 216, 0.4)" }}
          >
            <div className="bg-[#2D2A43] p-6 rounded-full mb-4 shadow-inner">
              <FaUserCircle className="text-gray-400 text-8xl" />
            </div>
            <div className="w-full bg-[#c4c3ce] p-6 rounded-lg text-center shadow-md">
              <h2 className="text-xl font-semibold text-black">
                Name: {String(student.name).toUpperCase()}
              </h2>
              <p className="text-black mt-2">
                Reg: {String(student.registrationNumber).toUpperCase()}
              </p>
              <p className="text-black">Sem: {student.sem} Sem</p>
            </div>
          </div>
        )}

        {activeTab === "Attendance" && <Attendance student={student} />}
        {activeTab === "Results" && <Results student={student} />}
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
