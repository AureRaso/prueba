'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SimpleColorPicker } from '@/components/ui/simple-color-picker';
import { useLandingStore } from '@/store/landingStore';

export function ContactEditor() {
  const { currentLanding, updateContact } = useLandingStore();

  if (!currentLanding) return null;

  const contact = currentLanding.contact;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Contacto
        </h3>

        {/* Background Color */}
        <div className="mb-6">
          <SimpleColorPicker
            value={contact.backgroundColor}
            onChange={(value) => updateContact({ backgroundColor: value })}
            label="Color de fondo de la sección"
            type="background"
          />
        </div>

        {/* Text Color */}
        <div className="mb-6">
          <SimpleColorPicker
            value={contact.textColor}
            onChange={(value) => updateContact({ textColor: value })}
            label="Color del texto"
            type="text"
          />
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <div>
            <Label>Título de la sección</Label>
            <Input
              value={contact.title}
              onChange={(e) => updateContact({ title: e.target.value })}
              placeholder="Ej: Contáctanos"
            />
          </div>

          <div>
            <Label>Descripción</Label>
            <Textarea
              value={contact.description}
              onChange={(e) => updateContact({ description: e.target.value })}
              rows={2}
              placeholder="Descripción de la sección de contacto..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Teléfono</Label>
              <Input
                value={contact.phone}
                onChange={(e) => updateContact({ phone: e.target.value })}
                placeholder="Ej: +34 123 456 789"
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={contact.email}
                onChange={(e) => updateContact({ email: e.target.value })}
                placeholder="Ej: info@clubpadel.com"
              />
            </div>
          </div>

          <div>
            <Label>Dirección</Label>
            <Textarea
              value={contact.address}
              onChange={(e) => updateContact({ address: e.target.value })}
              rows={2}
              placeholder="Dirección completa del club..."
            />
          </div>

          <div>
            <Label>Horarios</Label>
            <Textarea
              value={contact.schedule}
              onChange={(e) => updateContact({ schedule: e.target.value })}
              rows={3}
              placeholder="Ej: Lunes a Viernes: 9:00 - 22:00&#10;Sábados: 9:00 - 20:00&#10;Domingos: 10:00 - 18:00"
            />
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-900 mb-3">Redes Sociales</h4>

            <div className="space-y-3">
              <div>
                <Label>Instagram</Label>
                <Input
                  value={contact.socialMedia.instagram}
                  onChange={(e) => updateContact({
                    socialMedia: { ...contact.socialMedia, instagram: e.target.value }
                  })}
                  placeholder="Ej: https://instagram.com/clubpadel"
                />
              </div>

              <div>
                <Label>Facebook</Label>
                <Input
                  value={contact.socialMedia.facebook}
                  onChange={(e) => updateContact({
                    socialMedia: { ...contact.socialMedia, facebook: e.target.value }
                  })}
                  placeholder="Ej: https://facebook.com/clubpadel"
                />
              </div>

              <div>
                <Label>Twitter</Label>
                <Input
                  value={contact.socialMedia.twitter}
                  onChange={(e) => updateContact({
                    socialMedia: { ...contact.socialMedia, twitter: e.target.value }
                  })}
                  placeholder="Ej: https://twitter.com/clubpadel"
                />
              </div>

              <div>
                <Label>YouTube</Label>
                <Input
                  value={contact.socialMedia.youtube}
                  onChange={(e) => updateContact({
                    socialMedia: { ...contact.socialMedia, youtube: e.target.value }
                  })}
                  placeholder="Ej: https://youtube.com/clubpadel"
                />
              </div>

              <div>
                <Label>WhatsApp</Label>
                <Input
                  value={contact.socialMedia.whatsapp}
                  onChange={(e) => updateContact({
                    socialMedia: { ...contact.socialMedia, whatsapp: e.target.value }
                  })}
                  placeholder="Ej: https://wa.me/34123456789"
                />
              </div>
            </div>
          </div>

          <div>
            <Label>Google Maps (URL del mapa)</Label>
            <Input
              value={contact.mapUrl}
              onChange={(e) => updateContact({ mapUrl: e.target.value })}
              placeholder="URL de Google Maps para mostrar la ubicación"
            />
            <p className="text-sm text-gray-500 mt-1">
              Puedes obtener la URL desde Google Maps → Compartir → Insertar un mapa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}