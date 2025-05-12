import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');

  // Rutas protegidas para usuarios no autenticados
  const protectedRoutes = ['/auth/login', '/auth/register'];

  if (token && protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    // Si el usuario está autenticado y trata de acceder a login o register, redirigir al perfil
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/login', '/auth/register'],
};
