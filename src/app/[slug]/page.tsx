'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { PublicHero } from '@/components/landing/PublicHero';
import { PublicAbout } from '@/components/landing/PublicAbout';
import { PublicClasses } from '@/components/landing/PublicClasses';
import { PublicTrainers } from '@/components/landing/PublicTrainers';
import { PublicTestimonials } from '@/components/landing/PublicTestimonials';
import { PublicOffer } from '@/components/landing/PublicOffer';
import { PublicFAQ } from '@/components/landing/PublicFAQ';
import { PublicContact } from '@/components/landing/PublicContact';
import { PublicFooter } from '@/components/landing/PublicFooter';
import { LandingData } from '@/lib/types';
import { useLandingStore } from '@/store/landingStore';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function PublicLandingPage({ params }: PageProps) {
  const [landingData, setLandingData] = useState<LandingData | null>(null);
  const [loading, setLoading] = useState(true);

  const { loadPublicLanding } = useLandingStore();

  useEffect(() => {
    const loadLandingData = async () => {
      try {
        const data = await loadPublicLanding(params.slug);
        setLandingData(data);
      } catch (error) {
        console.error('Error loading landing data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLandingData();
  }, [params.slug, loadPublicLanding]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🏓</div>
          <p className="text-gray-600">Cargando landing page...</p>
        </div>
      </div>
    );
  }

  if (!landingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Landing Page No Encontrada</h1>
          <p className="text-gray-600 mb-4">
            La landing page que buscas no existe o ha sido eliminada.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <PublicHero
        hero={landingData.hero}
        config={landingData.config}
      />

      <PublicAbout
        about={landingData.about}
      />

      <PublicClasses
        classes={landingData.classes}
        primaryColor={landingData.config.primaryColor}
      />

      <PublicTrainers
        trainers={landingData.trainers}
      />

      <PublicTestimonials
        testimonials={landingData.testimonials}
      />

      {landingData.offer.enabled && (
        <PublicOffer
          offer={landingData.offer}
          primaryColor={landingData.config.primaryColor}
        />
      )}

      <PublicFAQ
        faq={landingData.faq}
      />

      <PublicContact
        contact={landingData.contact}
        primaryColor={landingData.config.primaryColor}
      />

      <PublicFooter
        contact={landingData.contact}
        academyName={landingData.academyName}
      />
    </div>
  );
}