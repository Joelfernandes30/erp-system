import React, { useEffect, useState } from "react";

export const AttendanceRangeTable = ({ attendanceData }) => {
  const [formattedData, setFormattedData] = useState({});

  useEffect(() => {
    const transformedData = {};

    attendanceData.forEach(({ attendanceDate, sessions }) => {
      if (!transformedData[attendanceDate]) {
        transformedData[attendanceDate] = {};
      }

      sessions.forEach(({ session, status }) => {
        transformedData[attendanceDate][session] = status;
      });
    });
    console.log(transformedData);
    setFormattedData(transformedData);
  }, [attendanceData]);

  const sessions = [
    "9 AM - 10 AM",
    "10 AM - 11 AM",
    "11 AM - 12 PM",
    "1 PM - 2 PM",
    "2 PM - 3 PM",
    "3 PM - 4 PM",
    "4 PM - 5 PM",
  ];

  const sortedDates = Object.keys(formattedData).sort();
  console.log(sortedDates);

  if (!attendanceData || attendanceData.length === 0) {
    return <p className="text-gray-600">No attendance data available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Date</th>
            {sessions.map((session, index) => (
              <th key={index} className="px-6 py-3 text-center">
                {session}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedDates.map((date, index) => {
            const sessionData = formattedData[date];
            return (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-3 font-medium">{formatDate(date)}</td>
                {[1, 2, 3, 4, 5, 6, 7].map((sessionNum) => {
                  const status = sessionData[sessionNum];
                  return (
                    <td
                      key={sessionNum}
                      className={`px-6 py-3 text-center ${
                        status === "present"
                          ? "text-green-700 bg-green-100"
                          : status === "absent"
                          ? "text-red-700 bg-red-100"
                          : "bg-gray-100"
                      }`}
                    >
                      {status
                        ? status.charAt(0).toUpperCase() + status.slice(1)
                        : "-"}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
