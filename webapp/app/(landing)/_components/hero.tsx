"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { toast } from "sonner";
import { z } from "zod";
import { FaGoogle,
    FaEye,
    FaEyeSlash,
 } from "react-icons/fa6";

// Esquema Zod
const formSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "La contraseña debe contener mayúscula, minúscula y número"
    ),
  accept: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar los términos y condiciones" }),
  }),
});
type FormData = z.infer<typeof formSchema>;

export default function Hero() {
  const [accepted, setAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogle = () => {
    authClient
      .signIn.social({ provider: "google", callbackURL: "/profile" })
      .then(() => toast.success("¡Bienvenido!"))
      .catch(() => toast.error("Error al iniciar sesión con Google"));
  };

  const handleCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Fetch de valores del form
    const fd = new FormData(e.currentTarget);
    const data = {
      email: fd.get("email") as string,
      password: fd.get("password") as string,
      accept: fd.get("accept") === "on",
    };

    // Validación con Zod
    const result = formSchema.safeParse(data);
    if (!result.success) {
      result.error.errors.forEach(err => {
        toast.error(err.message);
      });
      return;
    }

    try {
      await authClient.signIn.email({
        email: result.data.email,
        password: result.data.password,
        callbackURL: "/profile",
      });
      toast.success("¡Inicio de sesión correcto!");
    } catch {
      toast.error("Credenciales incorrectas");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center pt-24 pb-12">
      <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl w-full px-6 py-16">
        {/* Imagen hexagonal */}
        <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
          <div
            className="w-80 h-80 overflow-hidden"
            style={{
              clipPath:
                "polygon(25% 6.7%,75% 6.7%,100% 50%,75% 93.3%,25% 93.3%,0% 50%)",
            }}
          >
            <Image
              src="/building.webp"
              alt="Edificio"
              width={320}
              height={320}
              className="object-cover"
            />
          </div>
        </div>

        {/* Formulario */}
        <div className="w-full md:w-1/2 max-w-md">
          <h2 className="text-3xl font-bold text-[var(--bg-dark-blue)] mb-8">
            ¡Bienvenido!
          </h2>

          <form onSubmit={handleCredentials} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--bg-dark-blue)]"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--bg-dark-blue)] pr-10"
                />
                <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Aceptar términos */}
            <div className="flex items-center">
              <input
                id="accept"
                name="accept"
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="h-4 w-4 text-indigo-600 rounded border-gray-300"
              />
              <label htmlFor="accept" className="ml-2 text-sm">
                Aceptar los términos y condiciones de privacidad
              </label>
            </div>

            {/* Botón login */}
            <button
              type="submit"
              disabled={!accepted}
              className="w-full py-3 rounded-lg bg-gray-200 text-gray-500 disabled:cursor-not-allowed"
            >
              Iniciar sesión
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-400 lowercase">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center border-2 border-[var(--bg-dark-blue)] rounded-lg py-3 hover:bg-[var(--bg-dark-blue)]/10 transition"
          >
            <FaGoogle className="mr-3" />
            Continúa con Google
          </button>

          <p className="text-center text-sm mt-4">
            Si no tienes cuenta,{" "}
            <a href="/auth/register" className="text-orange-500 hover:underline">
              regístrate ahora
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}