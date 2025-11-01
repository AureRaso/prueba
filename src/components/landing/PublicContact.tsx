import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { LandingData } from '@/lib/types';

interface PublicContactProps {
  contact: LandingData['contact'];
  primaryColor: string;
}

export function PublicContact({ contact, primaryColor }: PublicContactProps) {
  const textColor = contact.textColor || '#1f2937';
  const backgroundColor = contact.backgroundColor || '#f8fafc';

  return (
    <section
      className="py-16"
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ color: textColor }}
          >
            {contact.title || 'Contacto'}
          </h2>
          {contact.description && (
            <p
              className="text-xl opacity-80"
              style={{ color: textColor }}
            >
              {contact.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Envíanos un mensaje
            </h3>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre *</Label>
                  <Input id="name" placeholder="Tu nombre" required />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" type="tel" placeholder="600 123 456" />
                </div>
                <div>
                  <Label htmlFor="level">Nivel de juego</Label>
                  <Select id="level">
                    <option value="">Selecciona tu nivel</option>
                    <option value="principiante">Principiante</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="avanzado">Avanzado</option>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                style={{
                  backgroundColor: primaryColor,
                  borderColor: primaryColor,
                }}
              >
                Enviar mensaje
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Address */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                📍 Ubicación
              </h4>
              <p className="text-gray-600">{contact.address}</p>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                📞 Contacto
              </h4>
              <div className="space-y-2">
                {contact.phone && (
                  <p className="text-gray-600">
                    <strong>Teléfono:</strong> {contact.phone}
                  </p>
                )}
                {contact.email && (
                  <p className="text-gray-600">
                    <strong>Email:</strong> {contact.email}
                  </p>
                )}
                {contact.socialMedia?.whatsapp && (
                  <p className="text-gray-600">
                    <strong>WhatsApp:</strong>
                    <a
                      href={`https://wa.me/${contact.socialMedia.whatsapp.replace(/\s/g, '')}`}
                      className="ml-1 hover:underline"
                      style={{ color: primaryColor }}
                    >
                      {contact.socialMedia.whatsapp}
                    </a>
                  </p>
                )}
              </div>
            </div>

            {/* Schedule */}
            {contact.schedule && (
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  ⏰ Horarios
                </h4>
                <div className="space-y-2">
                  <p className="text-gray-600 whitespace-pre-line">
                    {contact.schedule}
                  </p>
                </div>
              </div>
            )}

            {/* Social Media */}
            {Object.values(contact.socialMedia).some(value => value) && (
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  📱 Síguenos
                </h4>
                <div className="space-y-2">
                  {contact.socialMedia.instagram && (
                    <p className="text-gray-600">
                      <strong>Instagram:</strong>
                      <a
                        href={`https://instagram.com/${contact.socialMedia.instagram.replace('@', '')}`}
                        className="ml-1 hover:underline"
                        style={{ color: primaryColor }}
                      >
                        {contact.socialMedia.instagram}
                      </a>
                    </p>
                  )}
                  {contact.socialMedia.facebook && (
                    <p className="text-gray-600">
                      <strong>Facebook:</strong>
                      <span className="ml-1">{contact.socialMedia.facebook}</span>
                    </p>
                  )}
                  {contact.socialMedia.youtube && (
                    <p className="text-gray-600">
                      <strong>YouTube:</strong>
                      <span className="ml-1">{contact.socialMedia.youtube}</span>
                    </p>
                  )}
                  {contact.socialMedia.tiktok && (
                    <p className="text-gray-600">
                      <strong>TikTok:</strong>
                      <span className="ml-1">{contact.socialMedia.tiktok}</span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}