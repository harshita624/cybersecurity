// components/AuthForm.js
// components/AuthForm.js
import React from 'react';
import { signIn } from 'next-auth/react';

const AuthForm = ({ isSignUp, onSwitch }) => {
  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Call signIn from next-auth
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      console.error(result.error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <input type="email" name="email" required placeholder="Email" />
      <input type="password" name="password" required placeholder="Password" />
      <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
      <button type="button" onClick={onSwitch}>
        Switch to {isSignUp ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default AuthForm;
