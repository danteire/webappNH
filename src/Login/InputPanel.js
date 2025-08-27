import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function LoginPanel() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Logowanie:", { username, password });
    navigate('/user');
  };

  const handleRegister = () => {
    console.log("Rejestracja:", { username, password });
    navigate('/user');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Panel logowania</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium">
            Nazwa użytkownika
          </label>
          <input
            id="username"
            type="text"
            className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Wpisz nazwę użytkownika"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Hasło
          </label>
          <input
            id="password"
            type="password"
            className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Wpisz hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button onClick={handleLogin} className="w-1/2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Zaloguj
          </button>

          <button onClick={handleRegister} className="w-1/2 border border-gray-400 py-2 rounded-lg hover:bg-gray-100">
            Zarejestruj
          </button>
        </div>
      </div>
    </div>
  );
}
