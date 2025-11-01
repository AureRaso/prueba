import { Button } from '@/components/ui/button';
import { LandingData } from '@/lib/types';

interface PublicOfferProps {
  offer: LandingData['offer'];
  primaryColor: string;
}

export function PublicOffer({ offer, primaryColor }: PublicOfferProps) {
  if (!offer.enabled) return null;

  const textColor = offer.textColor || '#ffffff';
  const backgroundColor = offer.backgroundColor || primaryColor;

  return (
    <section
      className="py-16"
      style={{
        backgroundColor: backgroundColor,
        color: textColor
      }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-4">
          <h2 className="text-4xl font-bold mb-2" style={{ color: textColor }}>
            {offer.title}
          </h2>
          {offer.subtitle && (
            <p className="text-lg opacity-80" style={{ color: textColor }}>
              {offer.subtitle}
            </p>
          )}
        </div>

        <p className="text-xl mb-8 opacity-90" style={{ color: textColor }}>
          {offer.description}
        </p>

        {/* Price Display */}
        {(offer.originalPrice || offer.discountPrice) && (
          <div className="mb-8">
            {offer.originalPrice && (
              <span className="text-2xl line-through opacity-60 mr-4" style={{ color: textColor }}>
                €{offer.originalPrice}
              </span>
            )}
            {offer.discountPrice && (
              <span className="text-4xl font-bold" style={{ color: textColor }}>
                €{offer.discountPrice}
              </span>
            )}
          </div>
        )}

        {/* Features List */}
        {offer.features && offer.features.length > 0 && (
          <div className="mb-8">
            <ul className="space-y-2 max-w-md mx-auto">
              {offer.features.filter(feature => feature.trim()).map((feature, index) => (
                <li key={index} className="flex items-center justify-center">
                  <span className="mr-2">✓</span>
                  <span style={{ color: textColor }}>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Expiry Date */}
        {offer.expiryDate && (
          <div className="mb-6 text-sm opacity-80" style={{ color: textColor }}>
            Oferta válida hasta: {new Date(offer.expiryDate).toLocaleDateString('es-ES')}
          </div>
        )}

        <Button
          size="lg"
          className="text-lg px-8 py-4 h-auto"
          style={{
            backgroundColor: textColor === '#ffffff' ? '#000000' : '#ffffff',
            color: textColor === '#ffffff' ? '#ffffff' : '#000000',
            borderColor: textColor === '#ffffff' ? '#000000' : '#ffffff',
          }}
        >
          {offer.cta}
        </Button>
      </div>
    </section>
  );
}