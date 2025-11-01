'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Auto-create a default landing page and redirect to builder
    const createDefaultLanding = () => {
      const defaultLandingId = 'default-paddle-academy';

      // Check if default landing already exists
      const existingLanding = localStorage.getItem(`paddle-landing-${defaultLandingId}`);

      if (!existingLanding) {
        // Create default landing data
        const defaultLanding = {
          id: defaultLandingId,
          academyName: 'Mi Academia de Pádel',
          slug: 'mi-academia-padel',
          config: {
            toneOfVoice: 'professional',
            primaryColor: '#3b82f6'
          },
          hero: {
            title: 'Descubre tu potencial en el pádel',
            subtitle: 'Clases personalizadas con entrenadores certificados',
            description: 'Únete a nuestra academia y mejora tu técnica con los mejores profesionales del pádel.',
            cta: 'Reserva tu clase gratuita',
            backgroundColor: '#3b82f6',
            textColor: '#ffffff'
          },
          about: {
            title: '¿Por qué elegirnos?',
            description: 'Más de 10 años formando campeones de pádel',
            advantages: [
              'Entrenadores certificados',
              'Instalaciones modernas',
              'Grupos reducidos',
              'Metodología personalizada'
            ],
            images: [],
            backgroundColor: '#ffffff',
            textColor: '#1f2937'
          },
          classes: {
            backgroundColor: '#f8fafc',
            textColor: '#1f2937',
            items: [
              {
                id: 'iniciacion',
                title: 'Iniciación al Pádel',
                description: 'Perfecto para empezar desde cero con una base sólida',
                price: 45,
                priceUnit: 'class',
                includes: ['Material incluido', 'Seguimiento personalizado'],
                cta: 'Apuntarse',
                image: undefined
              }
            ]
          },
          trainers: {
            backgroundColor: '#ffffff',
            textColor: '#1f2937',
            items: [
              {
                id: 'carlos-lopez',
                name: 'Carlos López',
                role: 'Director técnico',
                specialties: ['Competición', 'Táctica avanzada'],
                bio: 'Entrenador nacional con más de 15 años de experiencia',
                image: undefined
              }
            ]
          },
          testimonials: {
            backgroundColor: '#f1f5f9',
            textColor: '#1f2937',
            items: [
              {
                id: 'maria-garcia',
                name: 'María García',
                rating: 5,
                text: 'Excelente academia, he mejorado muchísimo en pocos meses',
                image: undefined
              }
            ]
          },
          offer: {
            enabled: false,
            title: '¡Oferta especial!',
            subtitle: 'Solo por tiempo limitado',
            description: 'Aprovecha nuestra oferta de lanzamiento',
            originalPrice: 100,
            discountPrice: 75,
            features: [],
            cta: 'Aprovechar oferta',
            expiryDate: '',
            backgroundColor: '#3b82f6',
            textColor: '#ffffff'
          },
          faq: {
            backgroundColor: '#ffffff',
            textColor: '#1f2937',
            items: [
              {
                id: 'experiencia',
                question: '¿Necesito experiencia previa para empezar?',
                answer: 'No es necesario tener experiencia previa. Tenemos clases para todos los niveles.',
                enabled: true
              },
              {
                id: 'material',
                question: '¿Qué material necesito?',
                answer: 'Solo necesitas ropa deportiva cómoda y zapatillas. Las palas están incluidas.',
                enabled: true
              }
            ]
          },
          contact: {
            title: 'Contáctanos',
            description: 'Estamos aquí para ayudarte a alcanzar tus objetivos',
            phone: '954 123 456',
            email: 'info@miacademiapadel.com',
            address: 'Calle Pádel, 123, Tu Ciudad',
            schedule: 'Lunes a Viernes: 9:00 - 22:00\nSábados: 9:00 - 20:00\nDomingos: 10:00 - 18:00',
            socialMedia: {
              instagram: '@miacademiapadel',
              facebook: 'Mi Academia Pádel',
              whatsapp: '634567890'
            },
            backgroundColor: '#f8fafc',
            textColor: '#1f2937'
          },
          published: false,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        // Save to localStorage
        localStorage.setItem(`paddle-landing-${defaultLandingId}`, JSON.stringify(defaultLanding));

        // Also save to landing pages list
        const landingPageItem = {
          id: defaultLandingId,
          academyName: defaultLanding.academyName,
          slug: defaultLanding.slug,
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString()
        };

        const existingPages = localStorage.getItem('paddle-landing-pages');
        const pages = existingPages ? JSON.parse(existingPages) : [];

        // Check if this page is already in the list
        if (!pages.find((p: any) => p.id === defaultLandingId)) {
          pages.push(landingPageItem);
          localStorage.setItem('paddle-landing-pages', JSON.stringify(pages));
        }
      }

      // Redirect to builder with the default landing
      router.push(`/builder/${defaultLandingId}`);
    };

    createDefaultLanding();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🏓</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">PaddleBuilder</h1>
        <p className="text-gray-600">Cargando tu editor de landing pages...</p>
        <div className="mt-6">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    </div>
  );
}