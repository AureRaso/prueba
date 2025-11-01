'use client';

import { useState } from 'react';
import { LandingData } from '@/lib/types';

interface PublicFAQProps {
  faq: LandingData['faq'];
}

export function PublicFAQ({ faq }: PublicFAQProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const enabledFAQs = faq.items.filter(item => item.enabled);

  if (enabledFAQs.length === 0) return null;

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section
      className="py-16"
      style={{ backgroundColor: faq.backgroundColor || '#ffffff' }}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-600">
            Resolvemos todas tus dudas
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {enabledFAQs.map((item) => {
            const isOpen = openItems.includes(item.id);

            return (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {item.question}
                    </h3>
                    <span className="text-gray-400 text-xl flex-shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}