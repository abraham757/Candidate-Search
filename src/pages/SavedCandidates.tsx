import { useState, useEffect } from "react";
import Candidate from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedUser, setSavedUser] = useState<Candidate[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<keyof Candidate>("name");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("savedUsers") || "[]");
    setSavedUser(users);
    setFilteredUsers(users); // Inicializa los usuarios filtrados
  }, []);

  useEffect(() => {
    // Aplica el filtro de búsqueda cada vez que cambia el término de búsqueda
    const filtered = savedUser.filter((user) => {
      return (
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.location?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
      );
    });
    setFilteredUsers(filtered);
  }, [searchTerm, savedUser]);

  const deleteUser = (index: number) => {
    const updatedUsers = savedUser.filter((_, i) => i !== index);
    setSavedUser(updatedUsers);
    setFilteredUsers(updatedUsers); // Actualiza la lista filtrada
    localStorage.setItem("savedUsers", JSON.stringify(updatedUsers));
  };

  const handleSort = (field: keyof Candidate) => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (a[field] && b[field]) {
        const comparison = a[field]!.toString().localeCompare(b[field]!.toString());
        return sortOrder === "asc" ? comparison : -comparison;
      }
      return 0;

      
    });
    setFilteredUsers(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortField(field); // Guarda el campo seleccionado para ordenar
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Potential Candidates</h1>

      {/* Filtro de búsqueda */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search candidates..."
          className="border border-gray-300 p-2 rounded w-1/3"
          
        />
        <button
          onClick={() => handleSort(sortField)} // Cambiar el campo de ordenación
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
        >
          Sort by {sortField.charAt(0).toUpperCase() + sortField.slice(1)} {sortOrder === "asc" ? "⬆️" : "⬇️"}
        </button>
      </div>

      {filteredUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border p-2">Image</th>
                <th
                  className="border p-2 cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Name
                </th>
                <th
                  className="border p-2 cursor-pointer"
                  onClick={() => handleSort("location")}
                >
                  Location
                </th>
                <th
                  className="border p-2 cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  Email
                </th>
                <th
                  className="border p-2 cursor-pointer"
                  onClick={() => handleSort("company")}
                >
                  Company
                </th>
                <th className="border p-2">Bio</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index} className="border">
                  <td className="border p-2 text-center">
                    <div className="flex justify-center items-center">
                      <img
                        className="rounded-full"
                        src={user.avatar_url}
                        alt="User Avatar"
                        style={{ width: "20px", height: "20px" }} // Tamaño pequeño
                      />
                    </div>
                  </td>
                  <td className="border p-2 text-center">
                    {user.name ? `${user.name} (${user.login})` : user.login}
                  </td>
                  <td className="border p-2 text-center">
                    {user.location || "Not provided"}
                  </td>
                  <td className="border p-2 text-center">
                    {user.email || "Not provided"}
                  </td>
                  <td className="border p-2 text-center">
                    {user.company || "Not provided"}
                  </td>
                  <td className="border p-2 text-center">
                    {user.bio || "Not provided"}
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      onClick={() => deleteUser(index)}
                    >
                      Remove ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No users saved yet.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
