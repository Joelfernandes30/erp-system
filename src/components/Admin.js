// import { useState, useEffect } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [newUser, setNewUser] = useState({ username: "", role: "", department: "" });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [editingUser, setEditingUser] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [userRole, setUserRole] = useState(localStorage.getItem("role")); // Retrieve role from local storage
//   const usersPerPage = 5;

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/api/admin/users");
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const handleCreateUser = async () => {
//     if (userRole !== "ADMIN") {
//       toast.error("Access Denied: Only admins can modify users.");
//       return;
//     }
//     try {
//       await axios.post("http://localhost:8080/api/admin/create-user", newUser);
//       fetchUsers();
//       setNewUser({ username: "", role: "", department: "" });
//       toast.success("User created successfully!");
//     } catch (error) {
//       console.error("Error creating user:", error);
//       toast.error("Failed to create user.");
//     }
//   };

//   const handleDeleteUser = async (id) => {
//     if (userRole !== "ADMIN") {
//       toast.error("Access Denied: Only admins can modify users.");
//       return;
//     }
//     try {
//       await axios.delete(`http://localhost:8080/api/admin/delete-user/${id}`);
//       fetchUsers();
//       toast.success("User deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       toast.error("Failed to delete user.");
//     }
//   };

//   const handleEditUser = (user) => {
//     if (userRole !== "ADMIN") {
//       toast.error("Access Denied: Only admins can modify users.");
//       return;
//     }
//     setEditingUser(user);
//   };

//   const handleUpdateUser = async () => {
//     if (userRole !== "ADMIN") {
//       toast.error("Access Denied: Only admins can modify users.");
//       return;
//     }
//     try {
//       await axios.put(`http://localhost:8080/api/admin/update-user/${editingUser.id}`, editingUser);
//       fetchUsers();
//       setEditingUser(null);
//       toast.success("User updated successfully!");
//     } catch (error) {
//       console.error("Error updating user:", error);
//       toast.error("Failed to update user.");
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Toaster />
//       {/* Sidebar */}
//       <div className="w-64 bg-blue-900 text-white p-5 space-y-6">
//         <h2 className="text-2xl font-bold">Admin Panel</h2>
//         <ul>
//           <li className={`p-2 cursor-pointer ${activeTab === "dashboard" && "bg-blue-700"}`} onClick={() => setActiveTab("dashboard")}>Dashboard</li>
//           <li className={`p-2 cursor-pointer ${activeTab === "users" && "bg-blue-700"}`} onClick={() => setActiveTab("users")}>Manage Users</li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-5">
//         {activeTab === "dashboard" && (
//           <div>
//             <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//             <p>Welcome to the College ERP Admin Panel.</p>
//           </div>
//         )}

//         {activeTab === "users" && (
//           <div>
//             <h1 className="text-2xl font-bold">Manage Users</h1>
//             <table className="w-full bg-white shadow-md rounded mt-5">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="p-3">ID</th>
//                   <th className="p-3">Username</th>
//                   <th className="p-3">Role</th>
//                   <th className="p-3">Department</th>
//                   <th className="p-3">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user.id} className="border-b">
//                     <td className="p-3">{user.id}</td>
//                     <td className="p-3">{user.username}</td>
//                     <td className="p-3">{user.role}</td>
//                     <td className="p-3">{user.department || "N/A"}</td>
//                     <td className="p-3">
//                       <button onClick={() => handleEditUser(user)} className="bg-yellow-500 text-white p-1 rounded mr-2">Edit</button>
//                       <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
