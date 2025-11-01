'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ui/image-upload';
import { useLandingStore } from '@/store/landingStore';

export function ConfigurationEditor() {
  const { currentLanding, updateConfig, setLanding } = useLandingStore();

  if (!currentLanding) return null;

  const handleAcademyNameChange = (academyName: string) => {
    setLanding({
      ...currentLanding,
      academyName,
      updatedAt: new Date()
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Configuración General
        </h3>

        <div className="space-y-4">
          {/* Academy Name */}
          <div>
            <Label htmlFor="academyName">Nombre de la academia</Label>
            <Input
              id="academyName"
              value={currentLanding.academyName}
              onChange={(e) => handleAcademyNameChange(e.target.value)}
              placeholder="Ej: Padel Pro Sevilla"
            />
          </div>

          {/* Tone of Voice */}
          <div>
            <Label htmlFor="toneOfVoice">Tono de voz</Label>
            <Select
              value={currentLanding.config.toneOfVoice}
              onChange={(e) => updateConfig({
                toneOfVoice: e.target.value as any
              })}
            >
              <option value="professional">Profesional</option>
              <option value="family">Familiar</option>
              <option value="premium">Premium</option>
            </Select>
          </div>

          {/* Unique Differentiator */}
          <div>
            <Label htmlFor="differentiator">Diferenciador único</Label>
            <div className="flex gap-2">
              <Input
                id="differentiator"
                value={currentLanding.config.uniqueDifferentiator || ''}
                onChange={(e) => updateConfig({
                  uniqueDifferentiator: e.target.value
                })}
                placeholder="Ej: La academia con más títulos de Andalucía"
                maxLength={60}
              />
              <Button variant="outline" size="sm">
                ✨ IA
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {(currentLanding.config.uniqueDifferentiator || '').length}/60 caracteres
            </p>
          </div>

          {/* Primary Color */}
          <div>
            <Label htmlFor="primaryColor">Color primario</Label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                id="primaryColor"
                value={currentLanding.config.primaryColor}
                onChange={(e) => updateConfig({
                  primaryColor: e.target.value
                })}
                className="w-10 h-10 rounded border border-gray-300"
              />
              <Input
                value={currentLanding.config.primaryColor}
                onChange={(e) => updateConfig({
                  primaryColor: e.target.value
                })}
                placeholder="#3B82F6"
                className="flex-1"
              />
            </div>
          </div>

          {/* Logo Upload */}
          <div>
            <Label htmlFor="logo">Logo</Label>
            <ImageUpload
              value={currentLanding.config.logo}
              onChange={(value) => updateConfig({ logo: value })}
              placeholder="Arrastra tu logo aquí o selecciona archivo"
              maxSize={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}