'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Editor, EditorTab } from '@/components/builder/Editor';
import { Preview } from '@/components/builder/Preview';
import { useLandingStore } from '@/store/landingStore';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import { PublishModal } from '@/components/ui/publish-modal';

export default function BuilderPage({ params }: { params: { id: string } }) {
  const { currentLanding, loadLanding, saveLanding, publishLanding } = useLandingStore();
  const { isAuthenticated, isGuest, setShowAuthModal, setAuthAction } = useAuth();
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<EditorTab>('config');
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState('');

  // Load landing page on mount
  useEffect(() => {
    loadLanding(params.id);
  }, [params.id, loadLanding]);

  const handleSectionClick = (sectionId: string) => {
    // Convert section IDs to tab IDs
    const tabMapping: Record<string, EditorTab> = {
      'hero': 'hero',
      'about': 'about',
      'classes': 'classes',
      'trainers': 'trainers',
      'testimonials': 'testimonials',
      'offer': 'offer',
      'faq': 'faq',
      'contact': 'contact'
    };

    const tab = tabMapping[sectionId];
    if (tab) {
      setActiveTab(tab);
    }
  };

  const handlePublish = async () => {
    if (isGuest) {
      setAuthAction('publish');
      setShowAuthModal(true);
    } else {
      const result = await publishLanding();
      if (result && result.published) {
        const fullUrl = `${window.location.origin}/${result.slug}`;
        setPublishedUrl(fullUrl);
        setShowPublishModal(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="text-xl">🏓</span>
              <span className="font-bold text-gray-900">PaddleBuilder</span>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {currentLanding?.academyName || 'Nueva Landing'}
              </h1>
              <p className="text-sm text-gray-500">
                /{currentLanding?.slug || 'nueva-landing'}
              </p>
            </div>
            {isGuest && (
              <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                Modo Invitado
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3">
            {currentLanding && (
              <Link href={`/${currentLanding.slug}`} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm">
                  👁️ Vista previa
                </Button>
              </Link>
            )}
            <Button variant="outline" onClick={saveLanding}>
              💾 Guardar
            </Button>
            <Button onClick={handlePublish}>
              {currentLanding?.published ? '📴 Despublicar' : '🚀 Publicar'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar Editor */}
        <div className="w-96 border-r border-gray-200 bg-gray-50 overflow-y-auto">
          <Editor
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-gray-100">
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex gap-2">
              <Button
                variant={previewMode === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('desktop')}
              >
                Desktop
              </Button>
              <Button
                variant={previewMode === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('mobile')}
              >
                Mobile
              </Button>
              <div className="text-xs text-gray-500 self-center ml-4">
                Click en cualquier sección para editarla
              </div>
            </div>
          </div>
          <div className="p-4 h-full overflow-y-auto">
            <div className={`mx-auto bg-white rounded-lg shadow-lg overflow-hidden ${
              previewMode === 'mobile' ? 'max-w-sm' : 'max-w-none'
            }`}>
              <Preview onSectionClick={handleSectionClick} />
            </div>
          </div>
        </div>
      </div>

      {/* Publish Modal */}
      <PublishModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        landingPageUrl={publishedUrl}
        academyName={currentLanding?.academyName || ''}
      />
    </div>
  );
}