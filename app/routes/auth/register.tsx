import { useState } from "react";
import type { Route } from "./+types/register";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth, db } from "~/firebase/config";
import { addDoc, collection, doc, serverTimestamp, setDoc, type Timestamp } from "firebase/firestore";
import type { User } from "~/models/user";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Register" },
        { name: "description", content: "Create a new account" },
    ];
}

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Prepare Firestore user document
            const userData: User = {
                userId: user.uid,
                firstName: 'Anonymous', // Default value, can be updated later
                lastName: 'User',
                emailId: email.toLowerCase(),
                age: 18,
                points: 0,
                role: "user",
                cart: [],
                soldItems: [],
                createdAt: serverTimestamp() as Timestamp,
                updatedAt: serverTimestamp() as Timestamp,
            };

            // Write user data to Firestore
            await setDoc(doc(db, "users", user.uid), userData);

            console.log("Registration and Firestore user creation successful:", user.uid);
        } catch (error: any) {
            console.error("Registration failed:", error.code, error.message);
        } finally {
            setLoading(false);
            window.location.href = "/dashboard";
        }
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
