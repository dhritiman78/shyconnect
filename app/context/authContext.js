'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter();
  
    useEffect(() => {
        const token = localStorage.getItem('refreshToken');
    if (!token) {
      setUser(null); // Not logged in
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
          localStorage.removeItem('refreshToken'); // Clean up invalid token
          setUser(null); // Clear user state
          router.push('/auth/login'); // Redirect to login
        });
    }
    }, [router]);
  
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    );
  }
  

export function useAuthContext() {
  return useContext(AuthContext);
}
