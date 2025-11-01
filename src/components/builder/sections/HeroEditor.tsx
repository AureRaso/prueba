'use client';

import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ui/image-upload';
import { SimpleColorPicker } from '@/components/ui/simple-color-picker';
import { useLandingStore } from '@/store/landingStore';
import { HERO_TITLES, HERO_SUBTITLES, HERO_CTAS } from '@/lib/constants';

export function HeroEditor() {
  const { currentLanding, updateHero } = useLandingStore();

  if (!currentLanding) return null;

  const toneOfVoice = currentLanding.config.toneOfVoice || 'professional';

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Sección Hero
        </h3>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Título principal</Label>
            <Select
              value={currentLanding.hero.title}
              onChange={(e) => updateHero({ title: e.target.value })}
            >
              <option value="">Selecciona un título</option>
              {HERO_TITLES[toneOfVoice].map((title, index) => (
                <option key={index} value={title}>
                  {title}
                </option>
              ))}
            </Select>
          </div>

          {/* Subtitle */}
          <div>
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Select
              value={currentLanding.hero.subtitle}
              onChange={(e) => updateHero({ subtitle: e.target.value })}
            >
              <option value="">Selecciona un subtítulo</option>
              {HERO_SUBTITLES[toneOfVoice].map((subtitle, index) => (
                <option key={index} value={subtitle}>
                  {subtitle}
                </option>
              ))}
            </Select>
          </div>

          {/* CTA */}
          <div>
            <Label htmlFor="cta">Llamada a la acción</Label>
            <Select
              value={currentLanding.hero.cta}
              onChange={(e) => updateHero({ cta: e.target.value })}
            >
              <option value="">Selecciona un CTA</option>
              {HERO_CTAS.map((cta, index) => (
                <option key={index} value={cta}>
                  {cta}
                </option>
              ))}
            </Select>
          </div>

          {/* Background Image */}
          <div>
            <Label htmlFor="backgroundImage">Imagen de fondo</Label>
            <ImageUpload
              value={currentLanding.hero.backgroundImage}
              onChange={(value) => updateHero({ backgroundImage: value })}
              placeholder="Arrastra tu imagen aquí o selecciona archivo"
              maxSize={5}
            />
            <p className="text-xs text-gray-500 mt-1">
              Recomendado: 1920x1080px para mejor calidad
            </p>
          </div>

          {/* Background Color */}
          <div>
            <SimpleColorPicker
              value={currentLanding.hero.backgroundColor}
              onChange={(value) => updateHero({ backgroundColor: value })}
              label="Color de fondo (si no hay imagen)"
              type="background"
            />
          </div>

          {/* Text Color */}
          <div>
            <SimpleColorPicker
              value={currentLanding.hero.textColor}
              onChange={(value) => updateHero({ textColor: value })}
              label="Color del texto"
              type="text"
            />
          </div>

          {/* AI Suggestions */}
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              ✨ Sugerir textos con IA
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}