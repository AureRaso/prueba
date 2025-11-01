'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { AuthButton } from '@/components/auth/AuthButton';
import { useLandingStore } from '@/store/landingStore';

interface LandingPageItem {
  id: string;
  academyName: string;
  slug: string;
  createdAt: string;
  lastModified: string;
}

export default function DashboardPage() {
  const { isAuthenticated, isGuest, user, setShowAuthModal } = useAuth();
  const [landingPages, setLandingPages] = useState<LandingPageItem[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newLandingName, setNewLandingName] = useState('');
  const { loadUserLandings, createLanding, deleteLanding } = useLandingStore();

  // Load landing pages on mount
  useEffect(() => {
    const loadPages = async () => {
      const pages = await loadUserLandings();
      setLandingPages(pages.map(page => ({
        id: page.id,
        academyName: page.academyName,
        slug: page.slug,
        createdAt: page.createdAt?.toISOString() || new Date().toISOString(),
        lastModified: page.updatedAt?.toISOString() || new Date().toISOString()
      })));
    };
    loadPages();
  }, [loadUserLandings]);

  // Refresh landing pages list
  const refreshLandingPages = async () => {
    const pages = await loadUserLandings();
    setLandingPages(pages.map(page => ({
      id: page.id,
      academyName: page.academyName,
      slug: page.slug,
      createdAt: page.createdAt?.toISOString() || new Date().toISOString(),
      lastModified: page.updatedAt?.toISOString() || new Date().toISOString()
    })));
  };

  const createSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleCreateLanding = async () => {
    if (!newLandingName.trim()) return;

    const slug = createSlug(newLandingName);
    const success = await createLanding(newLandingName, slug);

    if (success) {
      await refreshLandingPages();
      setNewLandingName('');
      setShowCreateForm(false);
    } else {
      alert('Error al crear la landing page. Inténtalo de nuevo.');
    }
  };

  const handleDeleteLanding = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta landing page?')) {
      const success = await deleteLanding(id);
      if (success) {
        await refreshLandingPages();
      } else {
        alert('Error al eliminar la landing page. Inténtalo de nuevo.');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl">🏓</span>
              <h1 className="text-xl font-bold text-gray-900">PaddleBuilder</h1>
            </Link>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">Dashboard</Badge>
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Guest Banner */}
        {isGuest && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <div className="text-blue-600 mr-3">👋</div>
              <div>
                <h3 className="text-sm font-medium text-blue-800">¡Bienvenido a PaddleBuilder!</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Crea landing pages profesionales para tu escuela de pádel.
                  <button
                    onClick={() => setShowAuthModal && setShowAuthModal(true)}
                    className="ml-1 underline hover:no-underline"
                  >
                    Crear cuenta gratis
                  </button>
                  {" "}para guardar tus proyectos.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isAuthenticated ? `Hola ${user?.name}, tus` : 'Mis'} Landing Pages
            </h1>
            <p className="text-gray-600 mt-2">
              Gestiona todas tus landing pages de escuelas de pádel
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/builder/default-paddle-academy">
              <Button variant="outline">
                ⚡ Editor Rápido
              </Button>
            </Link>
            <Button onClick={() => setShowCreateForm(true)}>
              + Nueva Landing Page
            </Button>
          </div>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Crear Nueva Landing Page</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="academy-name">Nombre de la Academia</Label>
                  <Input
                    id="academy-name"
                    value={newLandingName}
                    onChange={(e) => setNewLandingName(e.target.value)}
                    placeholder="Ej: Club Pádel Sevilla"
                  />
                  {newLandingName && (
                    <p className="text-sm text-gray-500 mt-1">
                      URL: /{createSlug(newLandingName)}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleCreateLanding} disabled={!newLandingName.trim()}>
                    Crear Landing Page
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCreateForm(false);
                      setNewLandingName('');
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Landing Pages List */}
        {landingPages.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="text-6xl mb-4">🏓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No tienes landing pages aún
              </h3>
              <p className="text-gray-600 mb-6">
                Crea tu primera landing page para tu escuela de pádel
              </p>
              <Button onClick={() => setShowCreateForm(true)}>
                Crear mi primera landing page
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landingPages.map((page) => (
              <Card key={page.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{page.academyName}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      /{page.slug}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <p>Creada: {formatDate(page.createdAt)}</p>
                      <p>Modificada: {formatDate(page.lastModified)}</p>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/builder/${page.id}`} className="flex-1">
                        <Button className="w-full">
                          Editar
                        </Button>
                      </Link>
                      <Link href={`/${page.slug}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          Ver
                        </Button>
                      </Link>
                    </div>

                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => handleDeleteLanding(page.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Stats */}
        {landingPages.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              {landingPages.length === 1
                ? 'Tienes 1 landing page creada'
                : `Tienes ${landingPages.length} landing pages creadas`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}