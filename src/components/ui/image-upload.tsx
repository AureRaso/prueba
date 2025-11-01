'use client';

import { useState, useRef } from 'react';
import { Button } from './button';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  placeholder = "Arrastra tu imagen aquí o selecciona archivo",
  accept = "image/*",
  maxSize = 5,
  className = ""
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      alert(`El archivo es demasiado grande. Máximo ${maxSize}MB.`);
      return;
    }

    setIsUploading(true);

    try {
      // Convert to base64 for local storage (in production, upload to cloud)
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error al subir la imagen');
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));

    if (imageFile) {
      handleFileSelect(imageFile);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {value ? (
        // Show uploaded image
        <div className="relative">
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-40 object-cover rounded-lg border border-gray-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <div className="space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="bg-white"
                onClick={() => fileInputRef.current?.click()}
              >
                Cambiar
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleRemove}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // Show upload area
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
        >
          {isUploading ? (
            <div className="text-blue-600">
              <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent rounded-full mb-2"></div>
              <p className="text-sm">Subiendo imagen...</p>
            </div>
          ) : (
            <>
              <div className="text-4xl text-gray-400 mb-2">📷</div>
              <p className="text-sm text-gray-500 mb-2">
                {placeholder}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                Seleccionar archivo
              </Button>
              <p className="text-xs text-gray-400 mt-2">
                JPG, PNG hasta {maxSize}MB
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}