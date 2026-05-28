import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { useScreenInit } from '../../useScreenInit';
import { useRegister } from '../../hooks/usePeterPay';
import { setTokens, setStoredUser } from '../../lib/auth';
import type { Country } from '../../types/api';
import { AlertCircle } from 'lucide-react';
export function Register() {
  useScreenInit();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    business_name: '',
    email: '',
    password: '',
    country: 'TZ' as Country
  });
  const [agreed, setAgreed] = useState(false);
  const { mutate: register, loading, error } = useRegister();
  const update = (k: keyof typeof form, v: string) =>
  setForm((prev) => ({
    ...prev,
    [k]: v
  }));
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    try {
      const result = await register(form);
      setTokens(result.access_token, result.refresh_token);
      setStoredUser(result.user);
      navigate('/dashboard');
    } catch {

      /* error captured */}
  };
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
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-brand-600 hover:text-brand-500">
            
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error &&
            <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-50 border border-rose-100 text-rose-700 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error.message}</span>
              </div>
            }

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  First name
                </label>
                <input
                  type="text"
                  required
                  value={form.first_name}
                  onChange={(e) => update('first_name', e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm" />
                
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Last name
                </label>
                <input
                  type="text"
                  required
                  value={form.last_name}
                  onChange={(e) => update('last_name', e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm" />
                
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Business name
              </label>
              <input
                type="text"
                required
                value={form.business_name}
                onChange={(e) => update('business_name', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm" />
              
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Work email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm" />
              
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Country
              </label>
              <select
                value={form.country}
                onChange={(e) => update('country', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 shadow-sm bg-white focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm">
                
                <option value="TZ">Tanzania</option>
                <option value="KE">Kenya</option>
                <option value="UG">Uganda</option>
                <option value="RW">Rwanda</option>
                <option value="NG">Nigeria</option>
                <option value="GH">Ghana</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm" />
              
              <p className="mt-2 text-xs text-slate-500">
                Must be at least 8 characters long.
              </p>
            </div>

            <label className="flex items-start text-sm text-slate-900">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
                className="h-4 w-4 mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
              
              <span className="ml-2">
                I agree to the{' '}
                <a
                  href="#"
                  className="font-medium text-brand-600 hover:text-brand-500">
                  
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="#"
                  className="font-medium text-brand-600 hover:text-brand-500">
                  
                  Privacy Policy
                </a>
              </span>
            </label>

            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={loading || !agreed}>
              
              {loading ? 'Creating account…' : 'Create account'}
            </Button>
          </form>
        </div>
      </div>
    </div>);

}