'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../context/authContext';

export function useAuth() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
      fetch('/api/user/token', {
        credentials: 'include',
      })
        .then((res) => {
          if (!res.ok) throw new Error('Unauthorized');
          return res.json();
        })
        .then((data) => setUser(data))
    }, [router]);

    return user;
}

  
    