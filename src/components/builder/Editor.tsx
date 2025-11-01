'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ConfigurationEditor } from './sections/ConfigurationEditor';
import { HeroEditor } from './sections/HeroEditor';
import { AboutEditor } from './sections/AboutEditor';
import { ClassesEditor } from './sections/ClassesEditor';
import { TrainersEditor } from './sections/TrainersEditor';
import { TestimonialsEditor } from './sections/TestimonialsEditor';
import { OfferEditor } from './sections/OfferEditor';
import { FAQEditor } from './sections/FAQEditor';
import { ContactEditor } from './sections/ContactEditor';

export type EditorTab = 'config' | 'hero' | 'about' | 'classes' | 'trainers' | 'testimonials' | 'offer' | 'faq' | 'contact';

const tabs = [
  { id: 'config', label: 'Configuración', icon: '⚙️' },
  { id: 'hero', label: 'Hero', icon: '🎨' },
  { id: 'about', label: 'Sobre nosotros', icon: '📄' },
  { id: 'classes', label: 'Clases', icon: '🎓' },
  { id: 'trainers', label: 'Entrenadores', icon: '👨‍🏫' },
  { id: 'testimonials', label: 'Testimonios', icon: '⭐' },
  { id: 'offer', label: 'Oferta', icon: '🎁' },
  { id: 'faq', label: 'FAQ', icon: '❓' },
  { id: 'contact', label: 'Contacto', icon: '📞' },
];

interface EditorProps {
  activeTab?: EditorTab;
  onTabChange?: (tab: EditorTab) => void;
}

export function Editor({ activeTab: controlledActiveTab, onTabChange }: EditorProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<EditorTab>('config');

  const activeTab = controlledActiveTab ?? internalActiveTab;

  const handleTabChange = (tab: EditorTab) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };

  const renderEditor = () => {
    switch (activeTab) {
      case 'config':
        return <ConfigurationEditor />;
      case 'hero':
        return <HeroEditor />;
      case 'about':
        return <AboutEditor />;
      case 'classes':
        return <ClassesEditor />;
      case 'trainers':
        return <TrainersEditor />;
      case 'testimonials':
        return <TestimonialsEditor />;
      case 'offer':
        return <OfferEditor />;
      case 'faq':
        return <FAQEditor />;
      case 'contact':
        return <ContactEditor />;
      default:
        return (
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {tabs.find(t => t.id === activeTab)?.label}
            </h3>
            <p className="text-gray-500">Editor en desarrollo...</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="grid grid-cols-1 gap-1">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              size="sm"
              className="justify-start gap-2"
              onClick={() => handleTabChange(tab.id as EditorTab)}
            >
              <span>{tab.icon}</span>
              <span className="text-sm">{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {renderEditor()}
      </div>
    </div>
  );
}