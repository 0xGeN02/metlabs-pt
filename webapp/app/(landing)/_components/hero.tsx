"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import LoginForm from "./login";
import RegisterForm from "./register";

export default function Hero() {
  const searchParams = useSearchParams();
  const [formType, setFormType] = useState<'login' | 'register'>('login');
  
  // Comprobar el parámetro de la URL cuando cambie
  useEffect(() => {
    const formParam = searchParams.get('form');
    if (formParam === 'register') {
      setFormType('register');
    } else if (formParam === 'login') {
      setFormType('login');
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen flex flex-col items-center pt-24 pb-12">
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full px-6 py-16">
        {/* Imagen hexagonal */}
        <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
          <div className="relative group">
            {/* Contenedor principal */}
            <div
              className="w-100 h-100 overflow-hidden relative transform transition-transform duration-300 group-hover:scale-[1.03] z-10"
              style={{
                clipPath: "polygon(25% 6.7%,75% 6.7%,100% 50%,75% 93.3%,25% 93.3%,0% 50%)",
              }}
            >
              {/* Imagen */}
              <Image
                src="/building.webp"
                alt="Edificio"
                width={400}
                height={400}
                className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                priority
              />
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="w-full md:w-1/2 max-w-md">
          <h2 className="text-3xl font-bold text-[var(--bg-dark-blue)] mb-8">
            {formType === 'login' ? '¡Bienvenido!' : 'Crear cuenta'}
          </h2>
          
          {formType === 'login' ? <LoginForm /> : <RegisterForm />}
        </div>
      </section>
    </main>
  );
}
