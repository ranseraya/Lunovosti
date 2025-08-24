'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import fotoProfile from '@/assets/profile.jpg';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchProfile = async () => {
        try {
          const response = await fetch('/api/profile');
          if (!response.ok) throw new Error('Failed to load profile');
          const data = await response.json();
          setProfile(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
    if (status === 'unauthenticated') {
        window.location.href = '/login';
    }
  }, [status]);

  if (status === 'loading' || loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (!profile) {
    return <p className="text-center py-10">Failed to load profile.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-orange-500">
            <Image
              src={profile.authors?.profile_picture_url || fotoProfile}
              alt={profile.username}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{profile.authors?.name || profile.username}</h1>
            <p className="text-gray-500">{profile.email}</p>
            <span className="mt-2 inline-block px-3 py-1 text-sm font-semibold text-green-800 bg-green-200 rounded-full capitalize">
              {profile.role.toLowerCase()}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold mb-4">Author Bio</h2>
          <p className="text-gray-700 leading-relaxed">
            {profile.authors?.bio || 'Bio belum diatur.'}
          </p>
        </div>
      </div>
    </div>
  );
}