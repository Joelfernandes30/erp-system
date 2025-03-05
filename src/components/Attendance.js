import React, { useState } from "react";
import { format } from "date-fns";
import { DatePicker } from "./Date-picker";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AttendanceTable } from "./AttendanceTable";
import { AttendanceRangeTable } from "./AttendanceRangeTable";

const Attendance = () => {
  const [mode, setMode] = useState("single");
  const [date, setDate] = useState(new Date());
  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(),
  });
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state to prevent auto-execution

  const registerNo = useLocation().state?.student?.data?.registrationNumber;

  const handleDateChange = (date) => setDate(date);
  const handleStartDateChange = (date) =>
    setDateRange((prev) => ({ ...prev, start: date }));
  const handleEndDateChange = (date) =>
    setDateRange((prev) => ({ ...prev, end: date }));

  const handleSearch = async () => {
    if (!registerNo) {
      alert("Student data not found!");
      return;
    }
    setLoading(true);

    try {
      if (mode === "range") {
        const response = await axios.get(`/students/${registerNo}/range`, {
          params: {
            startDate: format(dateRange.start, "yyyy-MM-dd"),
            endDate: format(dateRange.end, "yyyy-MM-dd"),
          },
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        const data = response.data;
        const fetchedAttendanceData = data.data.map(
          ({ attendanceDate, sessions }) => ({
            attendanceDate,
            sessions: JSON.parse(sessions),
          })
        );

        setAttendanceData(fetchedAttendanceData);
      } else {
        const response = await axios.get(`/students/${registerNo}/date`, {
          params: { date: format(date, "yyyy-MM-dd") },
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        const data = response.data;
        const parsedSessions = Array.isArray(JSON.parse(data.data[0]?.sessions))
          ? JSON.parse(data.data[0]?.sessions)
          : [];

        // Handle missing sessions
        const totalSessions = 6;
        const filledSessions = Array.from(
          { length: totalSessions },
          (_, i) => parsedSessions[i] || "no-data"
        );

        setAttendanceData(filledSessions);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401)
          alert("Unauthorized: Invalid credentials.");
        else if (error.response.status === 404)
          alert("Attendance not found. Enter a valid date.");
        else
          alert(`Error ${error.response.status}: ${error.response.statusText}`);
      } else {
        alert("Network error or server not responding.");
      }
      console.error(
        "Error fetching attendance:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100 rounded-lg shadow-md max-w-7xl mx-auto">
      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 flex-1">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
          <span className="text-blue-600 mr-2">📅</span> Attendance Dashboard
        </h2>

        {/* Mode Selection Tabs */}
        <div className="flex mb-6 space-x-4">
          {["range", "single"].map((m) => (
            <button
              key={m}
              className={`px-5 py-3 rounded-lg font-medium transition-all duration-200 ${
                mode === m
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => {
                setMode(m);
                setAttendanceData([]); // Clear data on mode switch to prevent unnecessary display
              }}
            >
              {m === "range" ? "📆 Date Range" : "📍 Single Date"}
            </button>
          ))}
        </div>

        {/* Date Pickers */}
        <div className="mb-6">
          {mode === "range" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DatePicker
                label="Start Date"
                selected={dateRange.start}
                onChange={handleStartDateChange}
              />
              <DatePicker
                label="End Date"
                selected={dateRange.end}
                onChange={handleEndDateChange}
              />
            </div>
          ) : (
            <DatePicker
              label="Select Date"
              selected={date}
              onChange={handleDateChange}
              className="w-full"
            />
          )}
        </div>

        {/* Search Button */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium flex items-center shadow-md"
          onClick={handleSearch}
          disabled={loading}
        >
          <span className="mr-2">🔍</span> {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Attendance Table Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 flex-1 overflow-auto">
        {mode === "single" ? (
          <AttendanceTable attendanceData={attendanceData} />
        ) : (
          <AttendanceRangeTable attendanceData={attendanceData} />
        )}
      </div>
    </div>
  );
};

export default Attendance;
