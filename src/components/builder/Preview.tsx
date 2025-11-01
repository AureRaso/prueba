'use client';

import { useLandingStore } from '@/store/landingStore';
import { PublicHero } from '@/components/landing/PublicHero';
import { PublicAbout } from '@/components/landing/PublicAbout';
import { PublicClasses } from '@/components/landing/PublicClasses';
import { PublicTrainers } from '@/components/landing/PublicTrainers';
import { PublicTestimonials } from '@/components/landing/PublicTestimonials';
import { PublicOffer } from '@/components/landing/PublicOffer';
import { PublicFAQ } from '@/components/landing/PublicFAQ';
import { PublicContact } from '@/components/landing/PublicContact';
import { PublicFooter } from '@/components/landing/PublicFooter';

interface PreviewProps {
  onSectionClick?: (sectionId: string) => void;
}

export function Preview({ onSectionClick }: PreviewProps) {
  const { currentLanding } = useLandingStore();

  if (!currentLanding) {
    return (
      <div className="min-h-96 flex items-center justify-center text-gray-500">
        No hay datos de landing para mostrar
      </div>
    );
  }

  const handleSectionClick = (sectionId: string) => {
    if (onSectionClick) {
      onSectionClick(sectionId);
    }
  };

  return (
    <div className="w-full">
      <div
        id="hero-section"
        className="cursor-pointer relative group"
        onClick={() => handleSectionClick('hero')}
      >
        <div className="absolute inset-0 ring-2 ring-blue-500 ring-opacity-0 md:group-hover:ring-opacity-50 transition-all duration-200 pointer-events-none"></div>
        <PublicHero
          hero={currentLanding.hero}
          config={currentLanding.config}
        />
      </div>

      <div
        id="about-section"
        className="cursor-pointer relative group"
        onClick={() => handleSectionClick('about')}
      >
        <div className="absolute inset-0 ring-2 ring-blue-500 ring-opacity-0 md:group-hover:ring-opacity-50 transition-all duration-200 pointer-events-none"></div>
        <PublicAbout
          about={currentLanding.about}
        />
      </div>

      <div
        id="classes-section"
        className="cursor-pointer relative group"
        onClick={() => handleSectionClick('classes')}
      >
        <div className="absolute inset-0 ring-2 ring-blue-500 ring-opacity-0 md:group-hover:ring-opacity-50 transition-all duration-200 pointer-events-none"></div>
        <PublicClasses
          classes={currentLanding.classes}
          primaryColor={currentLanding.config.primaryColor}
        />
      </div>

      <div
        id="trainers-section"
        className="cursor-pointer relative group"
        onClick={() => handleSectionClick('trainers')}
      >
        <div className="absolute inset-0 ring-2 ring-blue-500 ring-opacity-0 md:group-hover:ring-opacity-50 transition-all duration-200 pointer-events-none"></div>
        <PublicTrainers
          trainers={currentLanding.trainers}
        />
      </div>

      <div
        id="testimonials-section"
        className="cursor-pointer relative group"
        onClick={() => handleSectionClick('testimonials')}
      >
        <div className="absolute inset-0 ring-2 ring-blue-500 ring-opacity-0 md:group-hover:ring-opacity-50 transition-all duration-200 pointer-events-none"></div>
        <PublicTestimonials
          testimonials={currentLanding.testimonials}
        />
      </div>

      <div
        id="offer-section"
        className="cursor-pointer relative group"
        onClick={() => handleSectionClick('offer')}
      >
        <div className="absolute inset-0 ring-2 ring-blue-500 ring-opacity-0 md:group-hover:ring-opacity-50 transition-all duration-200 pointer-events-none"></div>
        <PublicOffer
          offer={currentLanding.offer}
          primaryColor={currentLanding.config.primaryColor}
        />
      </div>

      <div
        id="faq-section"
        className="cursor-pointer relative group"
        onClick={() => handleSectionClick('faq')}
      >
        <div className="absolute inset-0 ring-2 ring-blue-500 ring-opacity-0 md:group-hover:ring-opacity-50 transition-all duration-200 pointer-events-none"></div>
        <PublicFAQ
          faq={currentLanding.faq}
        />
      </div>

      <div
        id="contact-section"
        className="cursor-pointer relative group"
        onClick={() => handleSectionClick('contact')}
      >
        <div className="absolute inset-0 ring-2 ring-blue-500 ring-opacity-0 md:group-hover:ring-opacity-50 transition-all duration-200 pointer-events-none"></div>
        <PublicContact
          contact={currentLanding.contact}
          primaryColor={currentLanding.config.primaryColor}
        />
      </div>

      <PublicFooter
        contact={currentLanding.contact}
        academyName={currentLanding.academyName}
      />
    </div>
  );
}