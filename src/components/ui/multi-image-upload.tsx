'use client';

import { useState, useRef } from 'react';
import { Button } from './button';

interface MultiImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  maxImages?: number;
  maxSize?: number; // in MB
  className?: string;
}

export function MultiImageUpload({
  value = [],
  onChange,
  maxImages = 6,
  maxSize = 3,
  className = ""
}: MultiImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList) => {
    const availableSlots = maxImages - value.length;

    if (availableSlots <= 0) {
      alert(`Máximo ${maxImages} imágenes permitidas`);
      return;
    }

    const validFiles = Array.from(files).slice(0, availableSlots).filter(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} no es una imagen válida`);
        return false;
      }
      if (file.size > maxSize * 1024 * 1024) {
        alert(`${file.name} es demasiado grande. Máximo ${maxSize}MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setIsUploading(true);

    try {
      const newImages: string[] = [];

      // Process files in parallel instead of sequentially
      const filePromises = validFiles.map(file =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
      );

      const results = await Promise.all(filePromises);
      newImages.push(...results);

      onChange([...value, ...newImages]);

      // Reset file input to allow uploading the same files again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error al subir las imágenes');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelect(e.target.files);
    }
  };

  const handleRemove = (index: number) => {
    const newImages = value.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div className={className}>
      {/* Uploaded Images Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {value.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Imagen ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-gray-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleRemove(index)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {value.length < maxImages && (
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
              <p className="text-sm">Subiendo imágenes...</p>
            </div>
          ) : (
            <>
              <div className="text-4xl text-gray-400 mb-2">🖼️</div>
              <p className="text-sm text-gray-500 mb-2">
                Arrastra múltiples imágenes aquí o selecciona archivos
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                Seleccionar archivos
              </Button>
              <p className="text-xs text-gray-400 mt-2">
                JPG, PNG hasta {maxSize}MB cada una • {value.length}/{maxImages} imágenes
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}