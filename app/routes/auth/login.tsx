import { useState } from "react";
import type { Route } from "./+types/login";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ReWear - Login" },
    { name: "description", content: "Login to your ReWear account" },
  ];
}

export default function Login() {
<<<<<<< HEAD
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-green-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="flex flex-col items-center mb-4">
          <img
            src="/images/logo-light.svg"
            alt="ReWear Logo"
            className="h-12 mb-2"
            onError={e => { e.currentTarget.style.display = "none"; }}
          />
          <h1 className="text-2xl font-bold text-center text-indigo-900">Login</h1>
        </div>
        <form className="space-y-4" method="post">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
=======
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [incorrect, setIncorrect] = useState(false);

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setIncorrect(false);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("Login successful:", user);
                window.location.href = "/dashboard";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Login failed:", errorCode, errorMessage);
                setIncorrect(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

  return <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
>>>>>>> f9419c7ceca6656fe8c76bbcace78121ac634399
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
<<<<<<< HEAD
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Enter your username"
=======
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
>>>>>>> f9419c7ceca6656fe8c76bbcace78121ac634399
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
<<<<<<< HEAD
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Enter your password"
=======
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
>>>>>>> f9419c7ceca6656fe8c76bbcace78121ac634399
            />
          </div>
          {incorrect && <p className="text-red-500">*Incorrect credentials. Please try again.</p>}
          <div className="flex items-center">
            Don't have an account? &nbsp;
            <a href="/register" className=" text-indigo-600 hover:text-indigo-500">Register</a>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center text-sm text-gray-500 pt-2">
          <span>Don't have an account? </span>
          <a href="/register" className="text-indigo-600 hover:text-indigo-800 font-medium">Register</a>
        </div>
      </div>
    </div>
  );
}
