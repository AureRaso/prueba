'use client';

import { Label } from './label';

interface BackgroundColorPickerProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
}

const PRESET_COLORS = [
  { name: 'Blanco', value: '#ffffff' },
  { name: 'Gris claro', value: '#f8fafc' },
  { name: 'Gris suave', value: '#f1f5f9' },
  { name: 'Azul claro', value: '#dbeafe' },
  { name: 'Verde claro', value: '#dcfce7' },
  { name: 'Amarillo claro', value: '#fef3c7' },
  { name: 'Rosa claro', value: '#fce7f3' },
  { name: 'Azul', value: '#3b82f6' },
  { name: 'Verde', value: '#10b981' },
  { name: 'Naranja', value: '#f59e0b' },
  { name: 'Púrpura', value: '#8b5cf6' },
  { name: 'Gris oscuro', value: '#374151' },
];

export function BackgroundColorPicker({ value = '#ffffff', onChange, label = "Color de fondo" }: BackgroundColorPickerProps) {
  return (
    <div className="space-y-3">
      <Label>{label}</Label>

      {/* Preset Colors Grid */}
      <div className="grid grid-cols-4 gap-2">
        {PRESET_COLORS.map((color) => (
          <button
            key={color.value}
            type="button"
            className={`w-full h-10 rounded-lg border-2 transition-all hover:scale-105 ${
              value === color.value
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            style={{ backgroundColor: color.value }}
            onClick={() => onChange(color.value)}
            title={color.name}
          >
            {value === color.value && (
              <span className="text-xs font-medium px-1 py-0.5 bg-white bg-opacity-80 rounded text-gray-800">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Custom Color Picker */}
      <div className="flex gap-2 items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#ffffff"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Preview */}
      <div
        className="w-full h-16 rounded-lg border border-gray-300 flex items-center justify-center text-sm text-gray-600"
        style={{ backgroundColor: value }}
      >
        Vista previa del fondo
      </div>
    </div>
  );
}