// import React, { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Calendar } from "@/components/ui/calendar";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";

// const IAMarks = () => {
//   // Sample data
//   const [attendanceData] = useState([
//     { date: "2025-02-01", status: "Present", subject: "Mathematics" },
//     { date: "2025-02-02", status: "Absent", subject: "Science" },
//     { date: "2025-02-03", status: "Present", subject: "English" },
//     { date: "2025-02-04", status: "Late", subject: "History" },
//     { date: "2025-02-05", status: "Present", subject: "Computer Science" },
//     { date: "2025-02-10", status: "Present", subject: "Mathematics" },
//     { date: "2025-02-15", status: "Absent", subject: "Physics" },
//   ]);

//   const [iaMarks] = useState([
//     {
//       subject: "Mathematics",
//       assessment: "Quiz 1",
//       marks: 18,
//       totalMarks: 20,
//       date: "2025-01-15",
//     },
//     {
//       subject: "Science",
//       assessment: "Lab Report",
//       marks: 24,
//       totalMarks: 30,
//       date: "2025-01-20",
//     },
//     {
//       subject: "English",
//       assessment: "Essay",
//       marks: 16,
//       totalMarks: 20,
//       date: "2025-01-25",
//     },
//     {
//       subject: "History",
//       assessment: "Project",
//       marks: 35,
//       totalMarks: 40,
//       date: "2025-02-01",
//     },
//     {
//       subject: "Computer Science",
//       assessment: "Coding Test",
//       marks: 28,
//       totalMarks: 30,
//       date: "2025-02-10",
//     },
//   ]);

//   // State
//   const [date, setDate] = useState(new Date());
//   const [dateRange, setDateRange] = useState({
//     from: new Date(2025, 1, 1),
//     to: new Date(2025, 1, 28),
//   });
//   const [isRangeMode, setIsRangeMode] = useState(false);
//   const [selectedSubject, setSelectedSubject] = useState("all");

//   // Filter attendance data based on selected date or date range
//   const filteredAttendance = attendanceData.filter((record) => {
//     const recordDate = new Date(record.date);

//     // Filter by subject if a specific subject is selected
//     const subjectMatch =
//       selectedSubject === "all" || record.subject === selectedSubject;

//     if (!subjectMatch) return false;

//     if (isRangeMode) {
//       return (
//         dateRange.from &&
//         dateRange.to &&
//         recordDate >= dateRange.from &&
//         recordDate <= dateRange.to
//       );
//     } else {
//       return recordDate.toDateString() === date.toDateString();
//     }
//   });

//   // Get unique subjects from data
//   const subjects = [
//     ...new Set([
//       ...attendanceData.map((item) => item.subject),
//       ...iaMarks.map((item) => item.subject),
//     ]),
//   ];

//   return (
//     <div className="w-full max-w-4xl p-4">
//       <h1 className="text-2xl font-bold mb-6">Student Portal</h1>

//       <Tabs defaultValue="attendance">
//         <TabsList className="mb-4">
//           <TabsTrigger value="attendance">Attendance Records</TabsTrigger>
//           <TabsTrigger value="ia-marks">IA Marks</TabsTrigger>
//         </TabsList>

//         <TabsContent value="attendance">
//           <Card>
//             <CardHeader>
//               <CardTitle>Attendance Records</CardTitle>
//               <div className="flex items-center space-x-2 mb-2">
//                 <Switch
//                   id="date-mode"
//                   checked={isRangeMode}
//                   onCheckedChange={setIsRangeMode}
//                 />
//                 <Label htmlFor="date-mode">
//                   {isRangeMode ? "Date Range Mode" : "Single Date Mode"}
//                 </Label>
//               </div>

//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="flex-1">
//                   {isRangeMode ? (
//                     <Calendar
//                       mode="range"
//                       selected={dateRange}
//                       onSelect={(range) => range && setDateRange(range)}
//                       className="border rounded-md p-2"
//                     />
//                   ) : (
//                     <Calendar
//                       mode="single"
//                       selected={date}
//                       onSelect={(date) => date && setDate(date)}
//                       className="border rounded-md p-2"
//                     />
//                   )}
//                 </div>

//                 <div className="flex-1">
//                   <div className="mb-4">
//                     <Label htmlFor="subject-filter" className="mb-1 block">
//                       Filter by Subject
//                     </Label>
//                     <Select
//                       value={selectedSubject}
//                       onValueChange={setSelectedSubject}
//                     >
//                       <SelectTrigger id="subject-filter">
//                         <SelectValue placeholder="Select Subject" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="all">All Subjects</SelectItem>
//                         {subjects.map((subject) => (
//                           <SelectItem key={subject} value={subject}>
//                             {subject}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="text-sm text-gray-500 mb-2">
//                     {isRangeMode ? (
//                       <p>
//                         Showing records from{" "}
//                         {dateRange.from?.toLocaleDateString()} to{" "}
//                         {dateRange.to?.toLocaleDateString()}
//                       </p>
//                     ) : (
//                       <p>Showing records for {date.toLocaleDateString()}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </CardHeader>

//             <CardContent>
//               {filteredAttendance.length > 0 ? (
//                 <div className="border rounded-md">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="bg-gray-100">
//                         <th className="p-2 text-left">Date</th>
//                         <th className="p-2 text-left">Subject</th>
//                         <th className="p-2 text-left">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredAttendance.map((record, index) => (
//                         <tr key={index} className="border-t">
//                           <td className="p-2">
//                             {new Date(record.date).toLocaleDateString()}
//                           </td>
//                           <td className="p-2">{record.subject}</td>
//                           <td className="p-2">
//                             <Badge
//                               className={
//                                 record.status === "Present"
//                                   ? "bg-green-500"
//                                   : record.status === "Absent"
//                                   ? "bg-red-500"
//                                   : "bg-yellow-500"
//                               }
//                             >
//                               {record.status}
//                             </Badge>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <div className="text-center p-4 border rounded-md bg-gray-50">
//                   No attendance records found for the selected criteria
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="ia-marks">
//           <Card>
//             <CardHeader>
//               <CardTitle>Internal Assessment (IA) Marks</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="border rounded-md">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       <th className="p-2 text-left">Subject</th>
//                       <th className="p-2 text-left">Assessment</th>
//                       <th className="p-2 text-left">Date</th>
//                       <th className="p-2 text-right">Marks</th>
//                       <th className="p-2 text-right">Percentage</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {iaMarks.map((mark, index) => (
//                       <tr key={index} className="border-t">
//                         <td className="p-2">{mark.subject}</td>
//                         <td className="p-2">{mark.assessment}</td>
//                         <td className="p-2">
//                           {new Date(mark.date).toLocaleDateString()}
//                         </td>
//                         <td className="p-2 text-right">
//                           {mark.marks}/{mark.totalMarks}
//                         </td>
//                         <td className="p-2 text-right">
//                           <Badge
//                             className={
//                               mark.marks / mark.totalMarks >= 0.75
//                                 ? "bg-green-500"
//                                 : mark.marks / mark.totalMarks >= 0.5
//                                 ? "bg-yellow-500"
//                                 : "bg-red-500"
//                             }
//                           >
//                             {Math.round((mark.marks / mark.totalMarks) * 100)}%
//                           </Badge>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="mt-6">
//                 <h3 className="text-lg font-medium mb-2">
//                   Performance Summary
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <Card>
//                     <CardContent className="p-4 flex flex-col items-center">
//                       <h4 className="text-md mb-2">Average Score</h4>
//                       <div className="text-2xl font-bold">
//                         {Math.round(
//                           (iaMarks.reduce(
//                             (sum, mark) => sum + mark.marks / mark.totalMarks,
//                             0
//                           ) /
//                             iaMarks.length) *
//                             100
//                         )}
//                         %
//                       </div>
//                     </CardContent>
//                   </Card>
//                   <Card>
//                     <CardContent className="p-4 flex flex-col items-center">
//                       <h4 className="text-md mb-2">Total Assessments</h4>
//                       <div className="text-2xl font-bold">{iaMarks.length}</div>
//                     </CardContent>
//                   </Card>
//                   <Card>
//                     <CardContent className="p-4 flex flex-col items-center">
//                       <h4 className="text-md mb-2">Highest Score</h4>
//                       <div className="text-2xl font-bold">
//                         {Math.round(
//                           Math.max(
//                             ...iaMarks.map(
//                               (mark) => (mark.marks / mark.totalMarks) * 100
//                             )
//                           )
//                         )}
//                         %
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default IAMarks;
