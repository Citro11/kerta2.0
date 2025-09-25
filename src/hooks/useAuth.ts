import { useState, useEffect } from 'react';
import { User } from '../types/types';

const USERS: User[] = [
  {
    id: '1',
    username: 'TanárÚr',
    password: '090807',
    role: 'tanar',
    name: 'TanárÚr'
  },
  {
    id: '2',
    username: 'B.F.Andi',
    password: 'bazfuandi05',
    role: 'diak',
    name: 'B.F.Andi'
  }
];

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    const foundUser = USERS.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return { user, login, logout, isLoading };
};