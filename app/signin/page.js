'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter to handle redirection

export default function SigninPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter(); // Use useRouter for redirecting

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const result = await signIn('credentials', {
      ...formData,
      redirect: false, // Set to false to handle redirection manually
    });

    setIsLoading(false);

    if (result?.error) {
      setErrorMessage('Sign-in failed. Please check your credentials and try again.');
    } else {
      // If sign-in is successful, redirect the user to the home page
      router.push('/'); // Redirect to home page
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center">Sign In</h1>
        {errorMessage && (
          <div className="p-2 text-sm text-red-600 bg-red-100 rounded-md">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 text-white rounded-lg ${
              isLoading ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-purple-600 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
