import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const { signin, signup } = useAuth();
  const nav = useNavigate();
  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'signin') await signin(email, password);
      else await signup(name, email, password);
      nav('/tickets');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <main className="page center">
      <form onSubmit={submit} className="card form narrow">
        <h2>{mode === 'signin' ? 'Sign in' : 'Create account'}</h2>
        {mode === 'signup' && (
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        )}
        <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="error">{error}</p>}
        <button className="btn" type="submit">{mode === 'signin' ? 'Log in' : 'Sign up'}</button>
        <p className="muted link" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
          {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </p>
      </form>
    </main>
  );
}
