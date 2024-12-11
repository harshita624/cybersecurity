'use client';
import { signIn } from 'next-auth/react';

const SignIn = () => {
  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      console.error("Error during sign-in:", result.error);
    } else {
      console.log("Sign-in successful:", result);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
