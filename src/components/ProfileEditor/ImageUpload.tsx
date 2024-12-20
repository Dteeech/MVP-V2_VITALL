import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (file: File | null) => void;
}

export function ImageUpload({ currentImage, onImageChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageChange(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        {preview ? (
          <>
            <img
              src={preview}
              alt="Profile preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-lg">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="profile-image"
      />
      <label
        htmlFor="profile-image"
        className="cursor-pointer bg-[#347879] text-white px-4 py-2 rounded-lg hover:bg-[#ED6D47] transition-colors duration-200"
      >
        {preview ? 'Changer la photo' : 'Ajouter une photo'}
      </label>
    </div>
  );
}