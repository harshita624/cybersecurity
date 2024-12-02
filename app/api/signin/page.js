'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SigninPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', { ...formData, redirect: true, callbackUrl: '/' });

    if (!result.ok) alert('Signin failed');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
      <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
      <button type="submit">Signin</button>
    </form>
  );
}
