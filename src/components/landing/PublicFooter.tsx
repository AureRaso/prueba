import { LandingData } from '@/lib/types';

interface PublicFooterProps {
  contact: LandingData['contact'];
  academyName: string;
}

export function PublicFooter({ contact, academyName }: PublicFooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Academy Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{academyName}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Tu academia de pádel de confianza. Ven a descubrir la pasión por este deporte.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>{contact.address}</p>
              <p>{contact.phone}</p>
              <p>{contact.email}</p>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Horarios</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>{contact.schedule}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
            <div className="space-y-2 text-sm">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors block">
                Sobre nosotros
              </a>
              <a href="#classes" className="text-gray-300 hover:text-white transition-colors block">
                Clases
              </a>
              <a href="#trainers" className="text-gray-300 hover:text-white transition-colors block">
                Entrenadores
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors block">
                Contacto
              </a>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Media */}
            <div className="flex space-x-4 mb-4 md:mb-0">
              {contact.socialMedia.instagram && (
                <a
                  href={`https://instagram.com/${contact.socialMedia.instagram.replace('@', '')}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  📷 Instagram
                </a>
              )}
              {contact.socialMedia.facebook && (
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  📘 Facebook
                </a>
              )}
              {contact.socialMedia.youtube && (
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  📺 YouTube
                </a>
              )}
              {contact.socialMedia.tiktok && (
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  🎵 TikTok
                </a>
              )}
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} {academyName}. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}