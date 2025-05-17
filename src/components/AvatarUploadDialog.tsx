'use client';

import { useState } from 'react';
import { supabase } from '@/supabase/lib/supabaseClient';

interface AvatarUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (url: string) => void;
}

export default function AvatarUploadDialog({ isOpen, onClose, onUpload }: AvatarUploadDialogProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    if (data.publicUrl) {
      onUpload(data.publicUrl);
      onClose();
    } else {
      setError('Failed to retrieve public URL.');
    }

    setUploading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm mx-4 animate-fadeIn">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Upload Avatar</h2>

        <label
          htmlFor="avatar-upload"
          className="cursor-pointer inline-block w-full px-5 py-3 bg-green-500 text-white text-center rounded-lg hover:bg-green-600 transition"
        >
          {uploading ? 'Uploading...' : 'Choose Image'}
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
        </label>

        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

        <button
          onClick={onClose}
          disabled={uploading}
          className="mt-6 w-full px-4 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
