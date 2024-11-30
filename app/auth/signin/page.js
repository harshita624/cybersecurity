// app/auth/signin/page.js
"use client"; // Required for using React hooks on this page

import { signIn } from "next-auth/react";

const SignIn = () => {
  const handleSignIn = (provider) => {
    signIn(provider); // This triggers the provider's sign-in method
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Sign In</h1>
        <button
          onClick={() => handleSignIn('google')}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mb-4"
        >
          Sign in with Google
        </button>
        <button
          onClick={() => handleSignIn('github')}
          className="w-full bg-gray-800 text-white py-2 rounded-lg"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};

export default SignIn;
