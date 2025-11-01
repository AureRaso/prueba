'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, CopyIcon, ExternalLinkIcon, ShareIcon } from 'lucide-react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  landingPageUrl: string;
  academyName: string;
}

export function PublishModal({ isOpen, onClose, landingPageUrl, academyName }: PublishModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(landingPageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = landingPageUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${academyName} - Escuela de Pádel`,
          text: `Descubre ${academyName}, tu escuela de pádel de confianza`,
          url: landingPageUrl,
        });
      } catch (error) {
        // User cancelled sharing or share failed
        console.log('Sharing cancelled or failed');
      }
    } else {
      // Fallback to copy link
      handleCopyLink();
    }
  };

  const handleOpenInNewTab = () => {
    window.open(landingPageUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <span className="text-xl sm:text-2xl">🎉</span>
            ¡Landing Page Publicada!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          <div className="text-center">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🏓</div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
              {academyName}
            </h3>
            <Badge variant="secondary" className="mb-3 sm:mb-4 text-xs sm:text-sm">
              Publicada exitosamente
            </Badge>
            <p className="text-gray-600 text-xs sm:text-sm px-2">
              Tu landing page ya está disponible en internet y lista para compartir
            </p>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <Label htmlFor="url" className="text-xs sm:text-sm font-medium">
              URL de tu landing page
            </Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                id="url"
                value={landingPageUrl}
                readOnly
                className="flex-1 bg-gray-50 text-xs sm:text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="flex items-center gap-1 text-xs sm:text-sm shrink-0"
              >
                {copied ? (
                  <>
                    <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    <span className="text-green-600">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <Button
              variant="outline"
              onClick={handleOpenInNewTab}
              className="flex items-center gap-2 text-xs sm:text-sm"
              size="sm"
            >
              <ExternalLinkIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              Ver página
            </Button>
            <Button
              onClick={handleShare}
              className="flex items-center gap-2 text-xs sm:text-sm"
              size="sm"
            >
              <ShareIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              Compartir
            </Button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-start gap-2">
              <div className="text-blue-600 mt-0.5 text-sm sm:text-base">💡</div>
              <div className="text-xs sm:text-sm">
                <p className="font-medium text-blue-800 mb-1">Consejos para compartir:</p>
                <ul className="text-blue-700 space-y-0.5 sm:space-y-1">
                  <li>• Comparte en redes sociales para mayor alcance</li>
                  <li>• Incluye el link en tu bio de Instagram</li>
                  <li>• Envía por WhatsApp a tus clientes actuales</li>
                  <li>• Añade a tu firma de email</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} size="sm" className="text-xs sm:text-sm">
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}