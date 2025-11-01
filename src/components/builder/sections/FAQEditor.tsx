'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SimpleColorPicker } from '@/components/ui/simple-color-picker';
import { useLandingStore } from '@/store/landingStore';

export function FAQEditor() {
  const { currentLanding, updateFAQ, addFAQItem, updateFAQItem, deleteFAQItem } = useLandingStore();
  const [isAddingFAQ, setIsAddingFAQ] = useState(false);
  const [newFAQ, setNewFAQ] = useState({
    question: '',
    answer: ''
  });

  if (!currentLanding) return null;

  const handleAddFAQ = () => {
    if (newFAQ.question && newFAQ.answer) {
      addFAQItem({
        id: Date.now().toString(),
        enabled: true,
        ...newFAQ
      });
      setNewFAQ({
        question: '',
        answer: ''
      });
      setIsAddingFAQ(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Preguntas Frecuentes
        </h3>

        {/* Background Color */}
        <div className="mb-6">
          <SimpleColorPicker
            value={currentLanding.faq.backgroundColor}
            onChange={(value) => updateFAQ({ backgroundColor: value })}
            label="Color de fondo de la sección"
            type="background"
          />
        </div>

        {/* Text Color */}
        <div className="mb-6">
          <SimpleColorPicker
            value={currentLanding.faq.textColor}
            onChange={(value) => updateFAQ({ textColor: value })}
            label="Color del texto"
            type="text"
          />
        </div>

        {/* Existing FAQ Items */}
        <div className="space-y-4 mb-6">
          {currentLanding.faq.items.map((faqItem, index) => (
            <div key={faqItem.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900">FAQ #{index + 1}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteFAQItem(faqItem.id)}
                >
                  Eliminar
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Pregunta</Label>
                  <Input
                    value={faqItem.question}
                    onChange={(e) => updateFAQItem(faqItem.id, { question: e.target.value })}
                    placeholder="Ej: ¿Cuánto duran las clases?"
                  />
                </div>

                <div>
                  <Label>Respuesta</Label>
                  <Textarea
                    value={faqItem.answer}
                    onChange={(e) => updateFAQItem(faqItem.id, { answer: e.target.value })}
                    rows={3}
                    placeholder="Respuesta detallada a la pregunta..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New FAQ */}
        {!isAddingFAQ ? (
          <Button onClick={() => setIsAddingFAQ(true)}>
            + Añadir pregunta frecuente
          </Button>
        ) : (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium text-gray-900 mb-3">Nueva pregunta frecuente</h4>

            <div className="space-y-3">
              <div>
                <Label>Pregunta</Label>
                <Input
                  value={newFAQ.question}
                  onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                  placeholder="Ej: ¿Cuánto duran las clases?"
                />
              </div>

              <div>
                <Label>Respuesta</Label>
                <Textarea
                  value={newFAQ.answer}
                  onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                  rows={3}
                  placeholder="Respuesta detallada a la pregunta..."
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddFAQ}>
                  Añadir pregunta
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingFAQ(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}