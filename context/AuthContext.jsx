import { createContext, useContext, useState } from 'react';
import api from '../api';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const save = ({ token, user }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const signin = async (email, password) => save((await api.post('/auth/signin', { email, password })).data);
  const signup = async (name, email, password) => save((await api.post('/auth/signup', { name, email, password })).data);
  const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, signin, signup, signout }}>{children}</AuthContext.Provider>;
}
