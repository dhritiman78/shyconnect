'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../context/authContext';

export function useAuth() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('refreshToken');
    if (!token) {  
      setUser(null); // Not logged in
      router.push('/auth/login'); // Redirect to login
    } else {
      fetch('/api/user/token', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Unauthorized');
          return res.json();
        })
        .then((data) => setUser(data))
        .catch(() => {
          // localStorage.removeItem('refreshToken'); // Clean up invalid token
          setUser(null); // Clear user state
          router.push('/auth/login'); // Redirect to login
        });
    }
    }, [router]);

  // Return user if it's available, otherwise null
  return user;
}

  
    