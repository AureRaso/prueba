export type ToneOfVoice = 'professional' | 'family' | 'premium';

export interface LandingData {
  id: string;
  academyName: string;
  slug: string;

  config: {
    toneOfVoice: ToneOfVoice;
    uniqueDifferentiator?: string;
    logo?: string;
    primaryColor: string;
  };

  hero: {
    title: string;
    subtitle: string;
    cta: string;
    backgroundImage?: string;
    backgroundColor?: string;
    textColor?: string;
  };

  about: {
    title: string;
    description?: string;
    advantages: string[];
    images: string[];
    backgroundColor?: string;
    textColor?: string;
  };

  classes: {
    backgroundColor?: string;
    textColor?: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      price: number;
      priceUnit: 'class' | 'month' | 'pack' | 'trimester';
      includes: string[];
      cta: string;
      image?: string;
    }>;
  };

  trainers: {
    backgroundColor?: string;
    textColor?: string;
    items: Array<{
      id: string;
      name: string;
      role: string;
      specialties: string[];
      bio: string;
      image?: string;
    }>;
  };

  testimonials: {
    backgroundColor?: string;
    textColor?: string;
    items: Array<{
      id: string;
      name: string;
      rating: number;
      text: string;
      image?: string;
    }>;
  };

  offer: {
    enabled: boolean;
    title: string;
    subtitle?: string;
    description: string;
    originalPrice?: number;
    discountPrice?: number;
    features: string[];
    cta: string;
    expiryDate?: string;
    backgroundColor?: string;
    textColor?: string;
  };

  faq: {
    backgroundColor?: string;
    textColor?: string;
    items: Array<{
      id: string;
      question: string;
      answer: string;
      enabled: boolean;
    }>;
  };

  contact: {
    title: string;
    description?: string;
    phone: string;
    email: string;
    address: string;
    schedule: string;
    socialMedia: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
      youtube?: string;
      tiktok?: string;
      whatsapp?: string;
    };
    mapUrl?: string;
    backgroundColor?: string;
    textColor?: string;
  };

  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}