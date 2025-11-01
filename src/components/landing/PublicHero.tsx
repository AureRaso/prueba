import { Button } from '@/components/ui/button';
import { LandingData } from '@/lib/types';

interface PublicHeroProps {
  hero: LandingData['hero'];
  config: LandingData['config'];
}

export function PublicHero({ hero, config }: PublicHeroProps) {
  const hasBackgroundImage = hero.backgroundImage;
  const backgroundColor = hero.backgroundColor || '#667eea';
  const textColor = hero.textColor || '#ffffff';

  return (
    <section
      className="relative min-h-[60vh] sm:min-h-screen flex items-center justify-center py-12 sm:py-16"
      style={hasBackgroundImage ? {
        backgroundImage: `url(${hero.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: textColor
      } : {
        backgroundColor,
        color: textColor
      }}
    >
      {/* Overlay */}
      {hasBackgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Logo */}
        {config.logo && (
          <div className="mb-6 sm:mb-8">
            <img
              src={config.logo}
              alt="Logo"
              className="h-12 sm:h-16 w-auto mx-auto object-contain"
            />
          </div>
        )}

        {/* Unique Differentiator Badge */}
        {config.uniqueDifferentiator && (
          <div className="mb-4 sm:mb-6">
            <span
              className="inline-block px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium border-2"
              style={{
                color: textColor,
                borderColor: textColor
              }}
            >
              {config.uniqueDifferentiator}
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2"
          style={{ color: textColor }}
        >
          {hero.title}
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto opacity-90 px-2"
          style={{ color: textColor }}
        >
          {hero.subtitle}
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto"
          style={{
            backgroundColor: config.primaryColor,
            borderColor: config.primaryColor,
            color: '#ffffff'
          }}
        >
          {hero.cta}
        </Button>
      </div>
    </section>
  );
}