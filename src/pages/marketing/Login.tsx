import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { useScreenInit } from '../../useScreenInit';
import { useLogin } from '../../hooks/usePeterPay';
import { setTokens, setStoredUser } from '../../lib/auth';
import { AlertCircle } from 'lucide-react';
export function Login() {
  useScreenInit();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const { mutate: login, loading, error } = useLogin();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({
        email,
        password
      });
      setTokens(result.access_token, result.refresh_token);
      setStoredUser(result.user);
      // Route based on role.
      if (result.user.role === 'super_admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch {

      // error captured by hook; nothing else to do
    }};
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-brand-950 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl leading-none">P</span>
          </div>
          <span className="font-bold text-2xl tracking-tight text-brand-950">
            PeterPay
          </span>
        </Link>
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Or{' '}
          <Link
            to="/register"
            className="font-medium text-brand-600 hover:text-brand-500">
            
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error &&
            <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-50 border border-rose-100 text-rose-700 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error.message}</span>
              </div>
            }

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700">
                
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm" />
              
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700">
                
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm" />
              
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-slate-900">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                
                <span className="ml-2">Remember me</span>
              </label>

              <a
                href="#"
                className="text-sm font-medium text-brand-600 hover:text-brand-500">
                
                Forgot your password?
              </a>
            </div>

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </div>);

}