'use client';

import { Label } from './label';

interface SimpleColorPickerProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  type?: 'background' | 'text';
}

const BACKGROUND_COLORS = [
  '#ffffff', // Blanco
  '#f8fafc', // Gris claro
  '#f1f5f9', // Gris suave
  '#dbeafe', // Azul claro
  '#dcfce7', // Verde claro
  '#fef3c7', // Amarillo claro
  '#3b82f6', // Azul
  '#10b981', // Verde
];

const TEXT_COLORS = [
  '#000000', // Negro
  '#1f2937', // Gris oscuro
  '#374151', // Gris medio
  '#6b7280', // Gris
  '#ffffff', // Blanco
  '#3b82f6', // Azul
  '#10b981', // Verde
  '#f59e0b', // Amarillo
];

export function SimpleColorPicker({
  value = '#ffffff',
  onChange,
  label = "Color de fondo",
  type = 'background'
}: SimpleColorPickerProps) {
  const presetColors = type === 'text' ? TEXT_COLORS : BACKGROUND_COLORS;
  return (
    <div className="space-y-3">
      <Label>{label}</Label>

      {/* Preset Colors */}
      <div className="grid grid-cols-4 gap-2">
        {presetColors.map((color) => (
          <button
            key={color}
            type="button"
            className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-105 ${
              value === color
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-300'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
          />
        ))}
      </div>

      {/* Custom Color */}
      <div className="flex gap-2 items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-8 rounded border border-gray-300"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
        />
      </div>
    </div>
  );
}