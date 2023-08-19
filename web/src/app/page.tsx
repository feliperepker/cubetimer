"use client";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/services/auth";
import { Chakra_Petch } from "next/font/google";
import { redirect } from "next/navigation";
import { useEffect } from "react";
const chakraPetch = Chakra_Petch({ subsets: ["latin"], weight: ["700"] });
import { FaGoogle } from "react-icons/fa";

export default function HomePage() {
  const { signIn } = useAuth();
  useEffect(() => {
    if (typeof window !== "undefined") {
      auth().then((response) => {
        if (response.name !== "") {
          redirect("/timer");
        }
      });
    }
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center gap-24">
      <header className="max-w-screen w-full h-16 bg-secondary flex items-center justify-between px-16 shadow-md">
        <h1 className={`${chakraPetch.className} hover:cursor-pointer text-xl`}>
          <span className="text-red-400">C</span>U
          <span className="text-blue-400">B</span>E
          <span className="text-yellow-400">T</span>I
          <span className="text-green-400">M</span>E
          <span className="text-orange-400">R</span>
        </h1>
        <button>Sign In</button>
      </header>
      <div className="max-w-7xl flex flex-col justify-around items-center">
        <h2 className={` text-2xl max-w-[450px] text-center`}>
          Welcome to your new place to keep track of your rubbik's cube
          progress!
        </h2>
        <button
          onClick={() => signIn()}
          className="mt-10 max-w-[300px] py-3 w-full duration-300 rounded p-2 bg-red-500 hover:bg-red-400 flex items-center justify-center gap-2 text-sm"
        >
          <FaGoogle />
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
