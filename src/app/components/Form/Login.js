"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState();
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await auth.login(email, password);
      setNotification("success");
      router.push("/home");
    } catch (error) {
      console.log(error);
      setError("Login to failed");
      setLoading(false);
    }
  }
  return (
    <>
      <form
        className="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
        action=""
        onSubmit={handleSubmit}
      >
        <p className="font-semibold text-base mb-2">Login</p>
        {notification && (
          <p className="font-semibold text-base mb-2 bg-green-500 py-1 rounded-md text-center text-black">{notification}</p>
        )}
        {error && (
          <p className="font-semibold text-base mb-2 bg-red-500 py-1 rounded-md text-center text-white">{error}</p>
        )}
      
        <label className="font-semibold text-xs" for="usernameField">
          Email
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="font-semibold text-xs mt-3" for="passwordField">
          Password
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={loading}
          type="submit"
          className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
        >
          {loading ? "loading" : "Login"}
        </button>
      </form>
    </>
  );
};

export default Login;
