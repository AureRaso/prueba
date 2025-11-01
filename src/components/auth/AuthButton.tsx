'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export function AuthButton() {
  const { isAuthenticated, user, logout, setShowAuthModal } = useAuth();

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">
          Hola, {user.name}
        </span>
        <Link href="/dashboard">
          <Button variant="outline">Dashboard</Button>
        </Link>
        <Button variant="ghost" onClick={logout} size="sm">
          Cerrar sesión
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/dashboard">
        <Button variant="outline">Dashboard</Button>
      </Link>
      <Button
        variant="ghost"
        onClick={() => setShowAuthModal(true)}
        size="sm"
      >
        Iniciar sesión
      </Button>
    </div>
  );
}