'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

export function AuthModal() {
  const { showAuthModal, setShowAuthModal, login, signup, authAction } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!showAuthModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let success = false;

      if (mode === 'login') {
        success = await login(formData.email, formData.password);
        if (!success) {
          setError('Email o contraseña incorrectos');
        }
      } else {
        if (!formData.name.trim()) {
          setError('El nombre es requerido');
          setLoading(false);
          return;
        }
        success = await signup(formData.email, formData.password, formData.name);
        if (!success) {
          setError('Este email ya está registrado');
        }
      }

      if (success) {
        setFormData({ email: '', password: '', name: '' });
      }
    } catch (error) {
      setError('Ha ocurrido un error. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowAuthModal(false);
    setError('');
    setFormData({ email: '', password: '', name: '' });
  };

  const getTitle = () => {
    if (authAction === 'publish') {
      return mode === 'login'
        ? 'Inicia sesión para publicar'
        : 'Regístrate para publicar';
    }
    return mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta';
  };

  const getDescription = () => {
    if (authAction === 'publish') {
      return 'Para publicar tu landing page necesitas una cuenta gratuita.';
    }
    return '';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{getTitle()}</h2>
            {getDescription() && (
              <p className="text-sm text-gray-600 mt-1">{getDescription()}</p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Tu nombre"
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Procesando...' : (mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError('');
              }}
              className="ml-1 text-blue-600 hover:text-blue-800 font-medium"
            >
              {mode === 'login' ? 'Regístrate gratis' : 'Inicia sesión'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}