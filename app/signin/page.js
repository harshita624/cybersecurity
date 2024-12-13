import { useState } from 'react';

function SignIn() {
  const [user, setUser] = useState(null);
  const [signInError, setSignInError] = useState('');

  const handleSignIn = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Sign-in successful:', data.message);
        setUser(data.user); // Save user details in state
      } else {
        console.error('Sign-in failed:', data.message);
        setSignInError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setSignInError('Server error. Please try again.');
    }
  };

  // Extract initials from the user's name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((part) => part[0].toUpperCase())
      .join('');
  };

  return (
    <div>
      {user ? (
        <div className="user-initials">
          <span className="bg-gray-800 text-white p-4 rounded-full">
            {getInitials(user.name)}
          </span>
          <p>Welcome, {user.name}!</p>
        </div>
      ) : (
        <form onSubmit={handleSignIn}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Sign In</button>
          {signInError && <p className="error">{signInError}</p>}
        </form>
      )}
    </div>
  );
}

export default SignIn;
