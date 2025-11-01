'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { SimpleColorPicker } from '@/components/ui/simple-color-picker';
import { useLandingStore } from '@/store/landingStore';

export function OfferEditor() {
  const { currentLanding, updateOffer } = useLandingStore();

  if (!currentLanding) return null;

  const offer = currentLanding.offer;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Oferta Especial
        </h3>

        {/* Background Color */}
        <div className="mb-6">
          <SimpleColorPicker
            value={offer.backgroundColor}
            onChange={(value) => updateOffer({ backgroundColor: value })}
            label="Color de fondo de la sección"
            type="background"
          />
        </div>

        {/* Text Color */}
        <div className="mb-6">
          <SimpleColorPicker
            value={offer.textColor}
            onChange={(value) => updateOffer({ textColor: value })}
            label="Color del texto"
            type="text"
          />
        </div>

        {/* Enabled Toggle */}
        <div className="mb-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="offer-enabled"
              checked={offer.enabled}
              onCheckedChange={(checked) => updateOffer({ enabled: !!checked })}
            />
            <Label htmlFor="offer-enabled">Mostrar sección de oferta especial</Label>
          </div>
        </div>

        {/* Offer Content */}
        <div className="space-y-4">
          <div>
            <Label>Título de la oferta</Label>
            <Input
              value={offer.title}
              onChange={(e) => updateOffer({ title: e.target.value })}
              placeholder="Ej: ¡Oferta de lanzamiento!"
            />
          </div>

          <div>
            <Label>Subtítulo</Label>
            <Input
              value={offer.subtitle}
              onChange={(e) => updateOffer({ subtitle: e.target.value })}
              placeholder="Ej: Solo por tiempo limitado"
            />
          </div>

          <div>
            <Label>Descripción</Label>
            <Textarea
              value={offer.description}
              onChange={(e) => updateOffer({ description: e.target.value })}
              rows={3}
              placeholder="Describe la oferta y sus beneficios..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Precio original</Label>
              <Input
                type="number"
                value={offer.originalPrice}
                onChange={(e) => updateOffer({ originalPrice: Number(e.target.value) })}
                placeholder="100"
              />
            </div>
            <div>
              <Label>Precio con descuento</Label>
              <Input
                type="number"
                value={offer.discountPrice}
                onChange={(e) => updateOffer({ discountPrice: Number(e.target.value) })}
                placeholder="75"
              />
            </div>
          </div>

          <div>
            <Label>Fecha de vencimiento (opcional)</Label>
            <Input
              type="date"
              value={offer.expiryDate}
              onChange={(e) => updateOffer({ expiryDate: e.target.value })}
            />
            <p className="text-sm text-gray-500 mt-1">
              Si se establece, se mostrará un contador regresivo
            </p>
          </div>

          <div>
            <Label>Texto del botón</Label>
            <Input
              value={offer.cta}
              onChange={(e) => updateOffer({ cta: e.target.value })}
              placeholder="Ej: Aprovechar oferta"
            />
          </div>

          <div>
            <Label>Lista de beneficios</Label>
            <div className="space-y-2">
              {offer.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...offer.features];
                      newFeatures[index] = e.target.value;
                      updateOffer({ features: newFeatures });
                    }}
                    placeholder="Ej: Acceso ilimitado por 3 meses"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newFeatures = offer.features.filter((_, i) => i !== index);
                      updateOffer({ features: newFeatures });
                    }}
                  >
                    Eliminar
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => {
                  updateOffer({ features: [...offer.features, ''] });
                }}
              >
                + Añadir beneficio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}