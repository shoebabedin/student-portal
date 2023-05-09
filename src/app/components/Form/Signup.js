"use client";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const auth = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState();
  const [notification, setNotification] = useState("");
  const usersCollectionRef = collection(db, "users");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await auth.signup(email, password, username, role);
      await addDoc(usersCollectionRef, {
        email: email,
        password: password,
        username: username,
        role: role
      });
      setNotification("success");
      toast("Success-fully create your account")
      router.push("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode.split('/')[1]);
      console.log(errorMessage);
      toast(errorCode.split('/')[1])
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
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          onChange={(e) => setRole(e.target.value)}
        >
          <option className="text-black" value="male" selected>
            Select your role
          </option>
          <option className="text-black" value="male">
            Teacher
          </option>
          <option className="text-black" value="female">
            Student
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
