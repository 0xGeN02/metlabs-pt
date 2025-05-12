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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const [showPassword, setShowPassword] = useState(false);
  
    const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Validación en tiempo real
    defaultValues: {
      email: "",
      password: "",
      accept: false,
    }
  });
  const accepted = watch("accept");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogle = () => {
    authClient
        .signIn.social({ provider: "google", callbackURL: "/profile" })
        .then(() => {
            toast.success("¡Inicio de sesión correcto!");
        })
        .catch(() => {
            toast.error("Error al iniciar sesión con Google");
        });
  };

  const onSubmit = async (data: FormData) => {
    try {
      const loadingToast = toast.loading("Iniciando sesión...");
      
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/profile",
      });
      
      toast.dismiss(loadingToast);
      toast.success("¡Inicio de sesión correcto!");
    } catch (error) {
      toast.error("Credenciales incorrectas");
      console.error("Error de autenticación:", error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center pt-24 pb-12">
      <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl w-full px-6 py-16">
        {/* Imagen hexagonal */}
        <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
            <div className="relative group">
                {/* Sombra y efecto de brillo */}
                <div 
                className="absolute inset-0 w-80 h-80 bg-gradient-to-r from-blue-500 to-purple-600 opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    clipPath: "polygon(25% 6.7%,75% 6.7%,100% 50%,75% 93.3%,25% 93.3%,0% 50%)",
                    transform: "scale(1.05)",
                }}
                ></div>
                
                {/* Borde */}
                <div 
                className="absolute inset-0 w-80 h-80 bg-white"
                style={{
                    clipPath: "polygon(25% 6.7%,75% 6.7%,100% 50%,75% 93.3%,25% 93.3%,0% 50%)",
                    transform: "scale(1.02)",
                }}
                ></div>
                
                {/* Contenedor principal */}
                <div
                className="w-80 h-80 overflow-hidden relative transform transition-transform duration-300 group-hover:scale-[1.03] z-10"
                style={{
                    clipPath: "polygon(25% 6.7%,75% 6.7%,100% 50%,75% 93.3%,25% 93.3%,0% 50%)",
                }}
                >
                {/* Overlay de color */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-dark-blue)]/0 to-[var(--bg-dark-blue)]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                
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
            ¡Bienvenido!
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                type="email"
                placeholder="tu@email.com"
                className={`w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--bg-dark-blue)]`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
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
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--bg-dark-blue)] pr-10`}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Aceptar términos */}
            <div className="flex items-center">
              <input
                id="accept"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                {...register("accept")}
              />
              <label htmlFor="accept" className="ml-2 text-sm">
                Aceptar los términos y condiciones de privacidad
              </label>
            </div>
            {errors.accept && (
              <p className="text-red-500 text-xs">{errors.accept.message}</p>
            )}

            {/* Botón login */}
            <button
              type="submit"
              disabled={!accepted}
              className={`w-full py-3 rounded-lg ${
                accepted
                  ? "bg-[var(--bg-dark-blue)] text-white hover:bg-[var(--bg-dark-blue)]/90"
                  : "bg-gray-200 text-gray-500"
              } disabled:cursor-not-allowed transition`}
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