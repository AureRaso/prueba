import { create } from 'zustand';
import { LandingData } from '@/lib/types';
import { supabase } from '@/lib/supabase';

interface LandingStore {
  currentLanding: LandingData | null;
  landings: LandingData[];
  loading: boolean;

  // Actions
  setLanding: (landing: LandingData) => void;
  loadLanding: (id: string) => Promise<void>;
  loadUserLandings: () => Promise<LandingData[]>;
  saveLanding: () => Promise<void>;
  createLanding: (academyName: string, slug: string) => Promise<boolean>;
  deleteLanding: (id: string) => Promise<boolean>;
  updateConfig: (config: Partial<LandingData['config']>) => void;
  updateHero: (hero: Partial<LandingData['hero']>) => void;
  updateAbout: (about: Partial<LandingData['about']>) => void;
  updateClasses: (classes: Partial<LandingData['classes']>) => void;
  addClass: (classItem: LandingData['classes']['items'][0]) => void;
  updateClass: (id: string, classItem: Partial<LandingData['classes']['items'][0]>) => void;
  deleteClass: (id: string) => void;
  updateTrainers: (trainers: Partial<LandingData['trainers']>) => void;
  addTrainer: (trainer: LandingData['trainers']['items'][0]) => void;
  updateTrainer: (id: string, trainer: Partial<LandingData['trainers']['items'][0]>) => void;
  deleteTrainer: (id: string) => void;
  updateTestimonials: (testimonials: Partial<LandingData['testimonials']>) => void;
  addTestimonial: (testimonial: LandingData['testimonials']['items'][0]) => void;
  updateTestimonial: (id: string, testimonial: Partial<LandingData['testimonials']['items'][0]>) => void;
  deleteTestimonial: (id: string) => void;
  updateOffer: (offer: Partial<LandingData['offer']>) => void;
  updateFAQ: (faq: Partial<LandingData['faq']>) => void;
  addFAQItem: (faqItem: LandingData['faq']['items'][0]) => void;
  updateFAQItem: (id: string, faqItem: Partial<LandingData['faq']['items'][0]>) => void;
  deleteFAQItem: (id: string) => void;
  updateContact: (contact: Partial<LandingData['contact']>) => void;
  publishLanding: () => Promise<{ published: boolean; slug: string } | null>;
  loadPublicLanding: (slug: string) => Promise<LandingData | null>;
}

// Create default landing data
const createDefaultLanding = (academyName: string, slug: string): Omit<LandingData, 'id' | 'createdAt' | 'updatedAt'> => ({
  academyName,
  slug,
  config: {
    toneOfVoice: 'professional',
    primaryColor: '#3b82f6'
  },
  hero: {
    title: `Descubre tu potencial en el pádel`,
    subtitle: 'Clases personalizadas con entrenadores certificados',
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
    email: `info@${slug.replace(/-/g, '')}.com`,
    address: 'Calle Pádel, 123, Tu Ciudad',
    schedule: 'Lunes a Viernes: 9:00 - 22:00\nSábados: 9:00 - 20:00\nDomingos: 10:00 - 18:00',
    socialMedia: {
      instagram: `@${slug.replace(/-/g, '')}`,
      facebook: academyName,
      whatsapp: '634567890'
    },
    backgroundColor: '#f8fafc',
    textColor: '#1f2937'
  },
  published: false
});

export const useLandingStore = create<LandingStore>((set, get) => ({
  currentLanding: null,
  landings: [],
  loading: false,

  setLanding: (landing) => set({ currentLanding: landing }),

  loadLanding: async (id) => {
    set({ loading: true });
    try {
      // First try to load from authenticated user's data
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('landing_pages')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .single();

        if (data && !error) {
          const landingData: LandingData = {
            id: data.id,
            academyName: data.academy_name,
            slug: data.slug,
            published: data.published,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
            ...data.data
          };
          set({ currentLanding: landingData });
          return;
        }
      }

      // If not found in database or user not authenticated, check localStorage for guest mode
      const localData = localStorage.getItem(`paddle-landing-${id}`);
      if (localData) {
        const landingData = JSON.parse(localData);
        set({ currentLanding: landingData });
      } else {
        // Create default landing for guest mode
        const defaultData = createDefaultLanding('Mi Academia de Pádel', 'mi-academia-padel');
        const landingData: LandingData = {
          id,
          createdAt: new Date(),
          updatedAt: new Date(),
          ...defaultData
        };
        set({ currentLanding: landingData });
        localStorage.setItem(`paddle-landing-${id}`, JSON.stringify(landingData));
      }
    } catch (error) {
      console.error('Error loading landing:', error);
    } finally {
      set({ loading: false });
    }
  },

  loadUserLandings: async () => {
    set({ loading: true });
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // Guest user - return from localStorage
        const savedPages = localStorage.getItem('paddle-landing-pages');
        const localPages = savedPages ? JSON.parse(savedPages) : [];
        set({ loading: false });
        return localPages.map((page: any) => ({
          id: page.id,
          academyName: page.academyName,
          slug: page.slug,
          published: false,
          created_at: page.createdAt,
          updated_at: page.lastModified
        }));
      }

      // Authenticated user - get from Supabase
      const { data, error } = await supabase
        .from('landing_pages')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const landings: LandingData[] = data.map(item => ({
        id: item.id,
        academyName: item.academy_name,
        slug: item.slug,
        published: item.published,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at),
        ...item.data
      }));

      set({ landings });
      return landings;
    } catch (error) {
      console.error('Error loading user landings:', error);
      set({ landings: [] });
      return [];
    } finally {
      set({ loading: false });
    }
  },

  loadPublicLanding: async (slug) => {
    try {
      // First try to load from Supabase (for published authenticated user pages)
      const { data, error } = await supabase
        .from('landing_pages')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (data && !error) {
        return {
          id: data.id,
          academyName: data.academy_name,
          slug: data.slug,
          published: data.published,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
          ...data.data
        };
      }

      // If not found in Supabase, check localStorage (for guest user pages)
      const savedPages = localStorage.getItem('paddle-landing-pages');
      if (savedPages) {
        const pages = JSON.parse(savedPages);
        const page = pages.find((p: any) => p.slug === slug);

        if (page) {
          const landingDataString = localStorage.getItem(`paddle-landing-${page.id}`);
          if (landingDataString) {
            const landingData = JSON.parse(landingDataString);

            // For guest users, we'll show the page regardless of published status
            // since they might want to preview their unpublished pages
            return landingData;
          }
        }
      }

      return null;
    } catch (error) {
      console.error('Error loading public landing:', error);
      return null;
    }
  },

  createLanding: async (academyName, slug) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // Guest user - save to localStorage
        const newLanding = {
          id: Date.now().toString(),
          academyName,
          slug,
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
        };

        const savedPages = localStorage.getItem('paddle-landing-pages');
        const pages = savedPages ? JSON.parse(savedPages) : [];
        pages.push(newLanding);
        localStorage.setItem('paddle-landing-pages', JSON.stringify(pages));

        // Create empty landing data
        const emptyLandingData = createDefaultLanding(academyName, slug);
        localStorage.setItem(`paddle-landing-${newLanding.id}`, JSON.stringify({
          id: newLanding.id,
          ...emptyLandingData,
          createdAt: new Date(),
          updatedAt: new Date()
        }));

        return true;
      }

      // Authenticated user - save to Supabase
      const landingData = createDefaultLanding(academyName, slug);
      const { data, error } = await supabase
        .from('landing_pages')
        .insert({
          user_id: user.id,
          academy_name: academyName,
          slug: slug,
          data: landingData,
          published: false
        })
        .select()
        .single();

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error creating landing:', error);
      return false;
    }
  },

  deleteLanding: async (id) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // Guest user - remove from localStorage
        const savedPages = localStorage.getItem('paddle-landing-pages');
        if (savedPages) {
          const pages = JSON.parse(savedPages);
          const updatedPages = pages.filter((page: any) => page.id !== id);
          localStorage.setItem('paddle-landing-pages', JSON.stringify(updatedPages));
          localStorage.removeItem(`paddle-landing-${id}`);
        }
        return true;
      }

      // Authenticated user - delete from Supabase
      const { error } = await supabase
        .from('landing_pages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error deleting landing:', error);
      return false;
    }
  },

  saveLanding: async () => {
    const { currentLanding } = get();
    if (!currentLanding) return;

    set({ loading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Save to Supabase if user is authenticated
        const { error } = await supabase
          .from('landing_pages')
          .upsert({
            id: currentLanding.id,
            user_id: user.id,
            academy_name: currentLanding.academyName,
            slug: currentLanding.slug,
            data: currentLanding,
            published: currentLanding.published
          });

        if (error) throw error;
      } else {
        // Save to localStorage for guest mode
        localStorage.setItem(`paddle-landing-${currentLanding.id}`, JSON.stringify(currentLanding));

        // Also update the pages list if published status changed
        const savedPages = localStorage.getItem('paddle-landing-pages');
        if (savedPages) {
          const pages = JSON.parse(savedPages);
          const pageIndex = pages.findIndex((p: any) => p.id === currentLanding.id);
          if (pageIndex !== -1) {
            pages[pageIndex] = {
              ...pages[pageIndex],
              published: currentLanding.published,
              lastModified: new Date().toISOString()
            };
            localStorage.setItem('paddle-landing-pages', JSON.stringify(pages));
          }
        }
      }

      // Update the current landing with new timestamp
      const updatedLanding = {
        ...currentLanding,
        updatedAt: new Date()
      };
      set({ currentLanding: updatedLanding });

    } catch (error) {
      console.error('Error saving landing:', error);
    } finally {
      set({ loading: false });
    }
  },

  publishLanding: async () => {
    const { currentLanding } = get();
    if (!currentLanding) return null;

    const updatedLanding = {
      ...currentLanding,
      published: !currentLanding.published,
      updatedAt: new Date()
    };

    set({ currentLanding: updatedLanding });
    await get().saveLanding();

    return {
      published: updatedLanding.published,
      slug: updatedLanding.slug
    };
  },

  updateConfig: (config) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        config: { ...state.currentLanding.config, ...config },
        updatedAt: new Date()
      } : null
    }));
  },

  updateHero: (hero) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        hero: { ...state.currentLanding.hero, ...hero },
        updatedAt: new Date()
      } : null
    }));
  },

  updateAbout: (about) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        about: { ...state.currentLanding.about, ...about },
        updatedAt: new Date()
      } : null
    }));
  },

  updateClasses: (classes) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        classes: { ...state.currentLanding.classes, ...classes },
        updatedAt: new Date()
      } : null
    }));
  },

  addClass: (classItem) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        classes: {
          ...state.currentLanding.classes,
          items: [...state.currentLanding.classes.items, classItem]
        },
        updatedAt: new Date()
      } : null
    }));
  },

  updateClass: (id, classUpdate) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        classes: {
          ...state.currentLanding.classes,
          items: state.currentLanding.classes.items.map(c =>
            c.id === id ? { ...c, ...classUpdate } : c
          )
        },
        updatedAt: new Date()
      } : null
    }));
  },

  deleteClass: (id) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        classes: {
          ...state.currentLanding.classes,
          items: state.currentLanding.classes.items.filter(c => c.id !== id)
        },
        updatedAt: new Date()
      } : null
    }));
  },

  updateTrainers: (trainers) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        trainers: { ...state.currentLanding.trainers, ...trainers },
        updatedAt: new Date()
      } : null
    }));
  },

  addTrainer: (trainer) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        trainers: {
          ...state.currentLanding.trainers,
          items: [...state.currentLanding.trainers.items, trainer]
        },
        updatedAt: new Date()
      } : null
    }));
  },

  updateTrainer: (id, trainerUpdate) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        trainers: {
          ...state.currentLanding.trainers,
          items: state.currentLanding.trainers.items.map(t =>
            t.id === id ? { ...t, ...trainerUpdate } : t
          )
        },
        updatedAt: new Date()
      } : null
    }));
  },

  deleteTrainer: (id) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        trainers: {
          ...state.currentLanding.trainers,
          items: state.currentLanding.trainers.items.filter(t => t.id !== id)
        },
        updatedAt: new Date()
      } : null
    }));
  },

  updateTestimonials: (testimonials) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        testimonials: { ...state.currentLanding.testimonials, ...testimonials },
        updatedAt: new Date()
      } : null
    }));
  },

  addTestimonial: (testimonial) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        testimonials: {
          ...state.currentLanding.testimonials,
          items: [...state.currentLanding.testimonials.items, testimonial]
        },
        updatedAt: new Date()
      } : null
    }));
  },

  updateTestimonial: (id, testimonialUpdate) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        testimonials: {
          ...state.currentLanding.testimonials,
          items: state.currentLanding.testimonials.items.map(t =>
            t.id === id ? { ...t, ...testimonialUpdate } : t
          )
        },
        updatedAt: new Date()
      } : null
    }));
  },

  deleteTestimonial: (id) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        testimonials: {
          ...state.currentLanding.testimonials,
          items: state.currentLanding.testimonials.items.filter(t => t.id !== id)
        },
        updatedAt: new Date()
      } : null
    }));
  },

  updateOffer: (offer) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        offer: { ...state.currentLanding.offer, ...offer },
        updatedAt: new Date()
      } : null
    }));
  },

  updateFAQ: (faq) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        faq: { ...state.currentLanding.faq, ...faq },
        updatedAt: new Date()
      } : null
    }));
  },

  addFAQItem: (faqItem) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        faq: {
          ...state.currentLanding.faq,
          items: [...state.currentLanding.faq.items, faqItem]
        },
        updatedAt: new Date()
      } : null
    }));
  },

  updateFAQItem: (id, faqUpdate) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        faq: {
          ...state.currentLanding.faq,
          items: state.currentLanding.faq.items.map(f =>
            f.id === id ? { ...f, ...faqUpdate } : f
          )
        },
        updatedAt: new Date()
      } : null
    }));
  },

  deleteFAQItem: (id) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        faq: {
          ...state.currentLanding.faq,
          items: state.currentLanding.faq.items.filter(f => f.id !== id)
        },
        updatedAt: new Date()
      } : null
    }));
  },

  updateContact: (contact) => {
    set((state) => ({
      currentLanding: state.currentLanding ? {
        ...state.currentLanding,
        contact: { ...state.currentLanding.contact, ...contact },
        updatedAt: new Date()
      } : null
    }));
  },
}));