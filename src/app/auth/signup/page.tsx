'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase/lib/supabaseClient';
import AvatarUploadDialog from '@/components/AvatarUploadDialog';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    avatar_url: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { full_name, username, email, password, confirm_password, avatar_url } = formData;

    if (password !== confirm_password) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name,
          avatar_url,
        },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl animate-breathe transition-all duration-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="full_name"
            type="text"
            placeholder="Full Name"
            required
            value={formData.full_name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
          />

          <input
            name="username"
            type="text"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
          />

          <input
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            required
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
          />

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setIsDialogOpen(true)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all"
            >
              Upload Avatar
            </button>
            {formData.avatar_url && (
              <img
                src={formData.avatar_url}
                alt="Avatar Preview"
                className="w-12 h-12 rounded-full border border-gray-300"
              />
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-70"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-500 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>

      <AvatarUploadDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onUpload={(url) => setFormData(prev => ({ ...prev, avatar_url: url }))}
      />
    </div>
  );
}
