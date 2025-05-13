import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');

  // Rutas públicas a las que se puede acceder sin autenticación
  const publicRoutes = ['/', '/auth/login', '/auth/register', '/api/auth/callback/google'];

  if (!token && !publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    // Redirigir a login si no tiene token y está intentando acceder a una ruta protegida
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth/login', '/auth/register'],
};
