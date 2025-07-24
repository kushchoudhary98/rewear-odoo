import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "~/firebase/config";

export function NavBar() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

    return (
        <div className='font-sans tracking-tighter flex justify-between items-center px-5 mt-3 '>
            <div className='flex gap-3 items-center '>
                <img
                    src="/logo.png"
                    title="Image Frame"
                    width="55"
                    style={{ border: "none" }}
                ></img>
                <a href="/" className='text-[28px] font-medium'>ReWear</a>
               
            </div>
             {/* <div className='text-[20px] md:flex hidden gap-8 items-center'>
                    <a href="/" className='hover:underline'>Contact Us</a>
                    <a href="/" className='hover:underline'>About Us</a>
                    <button
                    onClick={() => window.location.href = user ? "/dashboard" : "/login"}
                    className="px-6 py-2 text-[14px] font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                    {user ? "Profile" : "Login"}
                    </button>
            </div> */}
            <div className="text-[20px] md:flex hidden gap-1 items-center">
                <a
                    href="/"
                    className="px-6 py-2 text-[18px] font-semibold text-gray-700 hover:underline inline-flex items-center"
                >
                    Contact Us
                </a>
                <a
                    href="/"
                    className="px-6 py-2 text-[18px] font-semibold text-gray-700 hover:underline inline-flex items-center"
                >
                    About Us
                </a>
                <button
                    onClick={() => window.location.href = user ? "/dashboard" : "/login"}
                    className="px-6 py-2 text-[14px] font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center"
                >
                    {user ? "Profile" : "Login"}
                </button>
            </div>
        </div>
    );
}