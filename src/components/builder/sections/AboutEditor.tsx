'use client';

import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MultiImageUpload } from '@/components/ui/multi-image-upload';
import { SimpleColorPicker } from '@/components/ui/simple-color-picker';
import { useLandingStore } from '@/store/landingStore';
import { ABOUT_TITLES, ADVANTAGES } from '@/lib/constants';

export function AboutEditor() {
  const { currentLanding, updateAbout } = useLandingStore();

  if (!currentLanding) return null;

  const toneOfVoice = currentLanding.config.toneOfVoice || 'professional';
  const selectedAdvantages = currentLanding.about.advantages;

  const handleAdvantageToggle = (advantage: string) => {
    const current = selectedAdvantages;
    if (current.includes(advantage)) {
      updateAbout({
        advantages: current.filter(a => a !== advantage)
      });
    } else if (current.length < 4) {
      updateAbout({
        advantages: [...current, advantage]
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Sobre nosotros
        </h3>

        <div className="space-y-4">
          {/* Section Title */}
          <div>
            <Label htmlFor="aboutTitle">Título de sección</Label>
            <Select
              value={currentLanding.about.title}
              onChange={(e) => updateAbout({ title: e.target.value })}
            >
              <option value="">Selecciona un título</option>
              {ABOUT_TITLES[toneOfVoice].map((title, index) => (
                <option key={index} value={title}>
                  {title}
                </option>
              ))}
            </Select>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Descripción (opcional)</Label>
            <Textarea
              id="description"
              value={currentLanding.about.description || ''}
              onChange={(e) => updateAbout({ description: e.target.value })}
              placeholder="Describe brevemente tu academia..."
              maxLength={140}
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">
              {(currentLanding.about.description || '').length}/140 caracteres
            </p>
          </div>

          {/* Advantages */}
          <div>
            <Label>Ventajas (máximo 4)</Label>
            <div className="grid grid-cols-1 gap-2 mt-2">
              {ADVANTAGES.map((advantage) => {
                const isSelected = selectedAdvantages.includes(advantage);
                const isDisabled = !isSelected && selectedAdvantages.length >= 4;

                return (
                  <label
                    key={advantage}
                    className={`flex items-center space-x-2 p-2 rounded border cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 border-blue-200'
                        : isDisabled
                        ? 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleAdvantageToggle(advantage)}
                      disabled={isDisabled}
                      className="rounded"
                    />
                    <span className="text-sm">{advantage}</span>
                  </label>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {selectedAdvantages.length}/4 ventajas seleccionadas
            </p>
          </div>

          {/* Images Upload */}
          <div>
            <Label>Imágenes</Label>
            <MultiImageUpload
              value={currentLanding.about.images}
              onChange={(value) => updateAbout({ images: value })}
              maxImages={6}
              maxSize={3}
            />
            <p className="text-xs text-gray-500 mt-1">
              Recomendado: 800x600px para mejor visualización
            </p>
          </div>

          {/* Background Color */}
          <div>
            <SimpleColorPicker
              value={currentLanding.about.backgroundColor}
              onChange={(value) => updateAbout({ backgroundColor: value })}
              label="Color de fondo de la sección"
              type="background"
            />
          </div>

          {/* Text Color */}
          <div>
            <SimpleColorPicker
              value={currentLanding.about.textColor}
              onChange={(value) => updateAbout({ textColor: value })}
              label="Color del texto"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
}