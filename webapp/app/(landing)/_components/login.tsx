"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

// Esquema Zod
const formSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
      "La contraseña debe contener mayúscula, minúscula, número y un caracter especial"
    ),
  accept: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar los términos y condiciones" }),
  }),
});
type FormData = z.infer<typeof formSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      accept: undefined,
    }
  });
  const accepted = watch("accept");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogle = () => {
    authClient
      .signIn.social({ provider: "google", callbackURL: "/api/auth/sign-in/social" })
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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        toast.dismiss(loadingToast);
        toast.error(responseData.error || "Error al iniciar sesión");
        return;
      }

      if (responseData.user && responseData.user.token) {
        toast.dismiss(loadingToast);
        toast.success("¡Inicio de sesión correcto!");

        // Guarda el token y los datos del usuario
        localStorage.setItem("user", JSON.stringify(responseData.user));

        router.push("/profile");
      } else {
        toast.dismiss(loadingToast);
        toast.error("Respuesta de inicio de sesión incompleta");
      }
    } catch (error) {
      toast.error("Error al iniciar sesión");
      console.error("Error de autenticación:", error);
    }
  };

  return (
    <>
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
        {/* Sección Recuperar Contraseña */}
        <div className="mt-2 text-left">
          <a
            href="/auth/forgot-password"
            className="text-sm text-orange-500 hover:underline"
          >
            ¿Has olvidado tu contraseña?
          </a>
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
        <FcGoogle className="mr-3" size={24}/>
        Continúa con Google
      </button>

      <p className="text-center text-sm mt-4">
        Si no tienes cuenta,{" "}
        <a href="/?form=register" className="text-orange-500 hover:underline">
          regístrate ahora
        </a>
      </p>
    </>
  );
}