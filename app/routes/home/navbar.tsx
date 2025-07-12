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
        <div className='font-sans tracking-tighter flex justify-between items-center px-5 mt-3'>
            <div className='flex gap-10 items-center'>
                <a href="/" className='text-[40px] font-medium'>ReWear</a>
                <div className='text-[20px] md:flex hidden gap-10'>
                    <a href="/articles"  className='hover:underline'>articles</a>
                    <a className='hover:underline'>submit work</a>
                    <a className='hover:underline'>contact us</a>
                    <a className='hover:underline'>about us</a>
                </div>
            </div>
            <a href="/login" className="text-[20px] underline">{user ? "profile" : "login"}</a>
        </div>
    );
}