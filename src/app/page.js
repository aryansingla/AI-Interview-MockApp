"use client"
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const{user} = useUser();
  return (
    <div >
     <section className="bg-gray-900 text-white">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-5xl text-center">
      <h1
        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl w-full"
      >
        Welcome to AI Mock Interview App

        <span className="sm:block"> Your personal AI Interviewer.</span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
      Prepare for your dream job with confidence. Our AI-driven platform provides realistic mock interview experiences to help you excel in your next interview.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        
        {
  !user && 
  <a
          className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          href="/sign-in"
        >
          Sign in
        </a>
}
  

{
  user && 
  <a
          className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          href="/dashboard"
        >
          Go to Dashboard
        </a>
}
        {/* <a
          className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          href="/sign-up"
        >
          Sign up
        </a> */}
      </div>
    </div>
  </div>
</section>
    </div>
  );
}
