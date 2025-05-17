'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/supabase/lib/supabaseClient';
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';

function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('User not authenticated');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error.message);
      } else {
        setProfile(data);
      }

      setLoading(false);
    };

    getProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {profile ? (
        <div className="space-y-2">
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Full Name:</strong> {profile.full_name}</p>
          {profile.email && <p><strong>Email:</strong> {profile.email}</p>}
          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              alt="Avatar"
              className="w-24 h-24 rounded-full mt-4"
            />
          )}
        </div>
      ) : (
        <p>No profile data found.</p>
      )}

      <Link href="/auth/logout" className="flex items-center text-blue-500 hover:underline mt-6">
        <FiLogOut className="mr-2" />
        Logout
      </Link>
    </div>
  );
}

export default ProfilePage;
