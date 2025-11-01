import { LandingData } from '@/lib/types';
import { ImageCarousel } from '@/components/ui/image-carousel';

interface PublicAboutProps {
  about: LandingData['about'];
}

// Mock icons for advantages
const getAdvantageIcon = (advantage: string) => {
  const iconMap: Record<string, string> = {
    'Entrenadores certificados': '🏆',
    'Instalaciones modernas': '🏢',
    'Grupos reducidos': '👥',
    'Metodología personalizada': '🎯',
    'Horarios flexibles': '⏰',
    'Precios competitivos': '💰',
    'Ambiente familiar': '👨‍👩‍👧‍👦',
    'Seguimiento personalizado': '📊',
    'Material incluido': '🎾',
    'Pistas profesionales': '🏟️',
    'Clases para todos los niveles': '📈',
    'Ubicación céntrica': '📍',
  };
  return iconMap[advantage] || '✅';
};

export function PublicAbout({ about }: PublicAboutProps) {
  const textColor = about.textColor || '#1f2937';

  return (
    <section
      className="py-8 sm:py-16"
      style={{
        backgroundColor: about.backgroundColor || '#ffffff',
        color: textColor
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 px-2"
            style={{ color: textColor }}
          >
            {about.title}
          </h2>
          {about.description && (
            <p
              className="text-base sm:text-xl max-w-3xl mx-auto opacity-80 px-2"
              style={{ color: textColor }}
            >
              {about.description}
            </p>
          )}
        </div>

        {/* Advantages Grid */}
        {about.advantages && about.advantages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 sm:mb-12">
            {about.advantages.map((advantage, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 md:p-6 bg-black/5 rounded-lg border border-black/10"
                style={{ backgroundColor: `${textColor}10`, borderColor: `${textColor}20` }}
              >
                <div className="text-2xl md:text-3xl flex-shrink-0">
                  {getAdvantageIcon(advantage)}
                </div>
                <div className="min-w-0">
                  <h3
                    className="text-sm md:text-lg font-semibold"
                    style={{ color: textColor }}
                  >
                    {advantage}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Images Carousel */}
        {about.images.length > 0 && (
          <div className="w-full max-w-4xl mx-auto">
            <ImageCarousel
              images={about.images}
              height="h-48 sm:h-64 md:h-96"
              className="rounded-lg overflow-hidden"
            />
          </div>
        )}

        {/* Placeholder when no images */}
        {about.images.length === 0 && (
          <div className="w-full max-w-4xl mx-auto">
            <div
              className="h-48 sm:h-64 md:h-96 rounded-lg flex items-center justify-center border"
              style={{
                backgroundColor: `${textColor}10`,
                borderColor: `${textColor}20`
              }}
            >
              <span
                className="text-sm md:text-lg opacity-60"
                style={{ color: textColor }}
              >
                Galería de imágenes
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}