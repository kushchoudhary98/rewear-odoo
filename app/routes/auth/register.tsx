import { useState } from "react";
import type { Route } from "./+types/register";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "~/firebase/config";

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
