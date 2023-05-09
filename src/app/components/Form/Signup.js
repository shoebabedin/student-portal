"use client";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const auth = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState();
  const [notification, setNotification] = useState("");
  const usersCollectionRef = collection(db, "users");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await auth.signup(email, password, username);
      await addDoc(usersCollectionRef, {
        email: email,
        password: password,
        username: username
      });
      setNotification("success");
      router.push("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <>
      <form
        className="flex flex-col bg-white rounded shadow-lg p-12 lg:mt-12"
        action=""
        onSubmit={handleSubmit}
      >
        <p className="font-semibold text-base mb-2">Signup</p>
        {notification && (
          <p className="font-semibold text-base mb-2">{notification}</p>
        )}
        <label className="font-semibold text-xs" for="usernameField">
          Enter User Name
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <label className="font-semibold text-xs mt-3" for="passwordField">Role</label>
        <select
          className="w-full text-black pl-1 py-2 rounded-md"
          onChange={(e) => setGender(e.target.value)}
        >
          <option className="text-black" value="male" selected>
            Select your gender
          </option>
          <option className="text-black" value="male">
            Male
          </option>
          <option className="text-black" value="female">
            Female
          </option>
        </select>
        <button
          disabled={loading}
          type="submit"
          className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
        >
          {loading ? "loading" : "Signup"}
        </button>
      </form>
    </>
  );
};

export default Signup;
