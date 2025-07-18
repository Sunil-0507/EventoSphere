import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/admin/login", { email, password });
      setIsLoggedIn(true);
    } catch (err) {
      alert("Invalid admin credentials");
    }
  };

  const fetchData = async () => {
    const [userRes, eventRes] = await Promise.all([
      axios.get("http://localhost:4000/admin/users"),
      axios.get("http://localhost:4000/events"),
    ]);
    setUsers(userRes.data);
    setEvents(eventRes.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:4000/admin/users/${id}`);
    fetchData();
  };

  const deleteEvent = async (id) => {
    await axios.delete(`http://localhost:4000/admin/events/${id}`);
    fetchData();
  };

  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Admin Email"
                className="border p-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="border p-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Login
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6 max-w-6xl mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Users</h3>
                <ul className="space-y-2">
                  {users.map((user) => (
                    <li key={user._id} className="flex justify-between items-center border p-4 rounded shadow">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Events</h3>
                <ul className="space-y-2">
                  {events.map((event) => (
                    <li key={event._id} className="flex justify-between items-center border p-4 rounded shadow">
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-gray-500">Rs. {event.ticketPrice}</p>
                      </div>
                      <button
                        onClick={() => deleteEvent(event._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
