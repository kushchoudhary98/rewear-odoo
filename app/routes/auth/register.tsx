<<<<<<< HEAD
import { Link } from "react-router";
=======
>>>>>>> 17fa170962c0e6744b178f42377a4e43b0473f80
import { useState } from "react";
import type { Route } from "./+types/register";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "~/firebase/config";

<<<<<<< HEAD
export function meta({}: Route.MetaArgs) {
  return [
    { title: "ReWear - Register" },
    {
      name: "description",
      content: "Join ReWear to start exchanging sustainable clothing items",
    },
  ];
}

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-indigo-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="flex flex-col items-center mb-2">
          <img
            src="/images/logo-light.svg"
            alt="ReWear Logo"
            className="h-12 mb-2"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <h1 className="text-2xl font-bold text-center text-indigo-900">
            Create an Account
          </h1>
        </div>
        <form className="space-y-4" method="post">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              required
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-gray-700"
            >
              I agree to the{" "}
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-indigo-600 to-green-500 rounded-lg hover:from-indigo-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
          >
            Register
          </button>
        </form>
        <div className="text-center text-sm">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
=======
export function meta({ }: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setEmailSent(false);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("Registration successful:", user);
                window.location.href = "/dashboard";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Registration failed:", errorCode, errorMessage);
            })
            .finally(() => {
                setLoading(false);
                setEmailSent(true);
            });
    };

    return <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold text-center">Register</h1>
            <form className="space-y-4" onSubmit={handleRegister}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                    />
                </div>
                {emailSent && <p className="text-green-500">Please check you email </p>}
                <div className="flex items-center">
                    Already have an account? &nbsp;
                    <a href="/login" className=" text-indigo-600 hover:text-indigo-500">Login</a>
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                >
                    {loading ? "Registering new user..." : "Register"}
                </button>
            </form>
        </div>
    </div>;
}
>>>>>>> 17fa170962c0e6744b178f42377a4e43b0473f80
