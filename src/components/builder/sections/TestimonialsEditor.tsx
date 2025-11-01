'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ui/image-upload';
import { SimpleColorPicker } from '@/components/ui/simple-color-picker';
import { useLandingStore } from '@/store/landingStore';

const RATINGS = [1, 2, 3, 4, 5];

export function TestimonialsEditor() {
  const { currentLanding, updateTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useLandingStore();
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
    image: undefined as string | undefined
  });

  if (!currentLanding) return null;

  const handleAddTestimonial = () => {
    if (newTestimonial.name && newTestimonial.content) {
      addTestimonial({
        id: Date.now().toString(),
        name: newTestimonial.name,
        rating: newTestimonial.rating,
        text: newTestimonial.content,
        image: newTestimonial.image
      });
      setNewTestimonial({
        name: '',
        role: '',
        content: '',
        rating: 5,
        image: undefined
      });
      setIsAddingTestimonial(false);
    }
  };

  const handleRatingChange = (rating: number, testimonialId?: string, isNew = false) => {
    if (isNew) {
      setNewTestimonial({ ...newTestimonial, rating });
    } else if (testimonialId) {
      updateTestimonial(testimonialId, { rating });
    }
  };

  const renderStarRating = (rating: number, onChange: (rating: number) => void) => (
    <div className="flex space-x-1">
      {RATINGS.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`w-6 h-6 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          } hover:text-yellow-400 transition-colors`}
        >
          ★
        </button>
      ))}
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Testimonios
        </h3>

        {/* Background Color */}
        <div className="mb-6">
          <SimpleColorPicker
            value={currentLanding.testimonials.backgroundColor}
            onChange={(value) => updateTestimonials({ backgroundColor: value })}
            label="Color de fondo de la sección"
            type="background"
          />
        </div>

        {/* Text Color */}
        <div className="mb-6">
          <SimpleColorPicker
            value={currentLanding.testimonials.textColor}
            onChange={(value) => updateTestimonials({ textColor: value })}
            label="Color del texto"
            type="text"
          />
        </div>

        {/* Existing Testimonials */}
        <div className="space-y-4 mb-6">
          {currentLanding.testimonials.items.map((testimonial) => (
            <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteTestimonial(testimonial.id)}
                >
                  Eliminar
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <Label>Nombre</Label>
                  <Input
                    value={testimonial.name}
                    onChange={(e) => updateTestimonial(testimonial.id, { name: e.target.value })}
                    placeholder="Ej: María García"
                  />
                </div>

                <div>
                  <Label>Testimonio</Label>
                  <Input
                    value={testimonial.text}
                    onChange={(e) => updateTestimonial(testimonial.id, { text: e.target.value })}
                    placeholder="Ej: Excelente escuela, muy recomendada..."
                  />
                </div>

                <div>
                  <Label>Puntuación</Label>
                  {renderStarRating(testimonial.rating, (rating) => handleRatingChange(rating, testimonial.id))}
                </div>

                <div>
                  <Label>Testimonio</Label>
                  <Textarea
                    value={testimonial.text}
                    onChange={(e) => updateTestimonial(testimonial.id, { text: e.target.value })}
                    rows={3}
                    placeholder="Opinión del cliente..."
                  />
                </div>

                <div>
                  <Label>Foto</Label>
                  <ImageUpload
                    value={testimonial.image}
                    onChange={(value) => updateTestimonial(testimonial.id, { image: value })}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Testimonial */}
        {!isAddingTestimonial ? (
          <Button onClick={() => setIsAddingTestimonial(true)}>
            + Añadir testimonio
          </Button>
        ) : (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium text-gray-900 mb-3">Nuevo testimonio</h4>

            <div className="space-y-3">
              <div>
                <Label>Nombre</Label>
                <Input
                  value={newTestimonial.name}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                  placeholder="Ej: María García"
                />
              </div>

              <div>
                <Label>Cargo/Descripción</Label>
                <Input
                  value={newTestimonial.role}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                  placeholder="Ej: Madre de alumno, Jugadora amateur..."
                />
              </div>

              <div>
                <Label>Puntuación</Label>
                {renderStarRating(newTestimonial.rating, (rating) => handleRatingChange(rating, undefined, true))}
              </div>

              <div>
                <Label>Testimonio</Label>
                <Textarea
                  value={newTestimonial.content}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                  rows={3}
                  placeholder="Opinión del cliente..."
                />
              </div>

              <div>
                <Label>Foto</Label>
                <ImageUpload
                  value={newTestimonial.image}
                  onChange={(value) => setNewTestimonial({ ...newTestimonial, image: value })}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddTestimonial}>
                  Añadir testimonio
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingTestimonial(false)}
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