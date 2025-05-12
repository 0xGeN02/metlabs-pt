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

// Esquema Zod para registro
const registerSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Correo electrónico inválido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
      "La contraseña debe contener mayúscula, minúscula, número y un caracter especial"
    ),
  confirmPassword: z.string(),
  phone: z.string().min(9, "El teléfono es obligatorio"),
  nationality: z.string().min(2, "La nacionalidad es obligatoria"),
  sex: z.enum(["male", "female"], {required_error: "El sexo es obligatorio"}),
  birth_date: z.string().refine((date) => {
    const d = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - d.getFullYear();
    return !isNaN(d.getTime()) && age >= 18;
  }, "Debes tener al menos 18 años para registrarte"),
  accept: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar los términos y condiciones" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});
type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      nationality: "",
      birth_date: "",
      accept: undefined,
    },
  });
  const accepted = watch("accept");

  const togglePasswordVisibility = () => setShowPassword((v) => !v);
  const toggleConfirmVisibility = () => setShowConfirm((v) => !v);

  const handleGoogle = () => {
    authClient
      .signIn.social({ provider: "google", callbackURL: "/api/auth/sign-in/social" })
      .then(() => {
        toast.success("¡Registro correcto con Google!");
      })
      .catch(() => {
        toast.error("Error al registrarse con Google");
      });
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const loadingToast = toast.loading("Registrando usuario...");
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          nationality: data.nationality,
          sex: data.sex,
          birth_date: data.birth_date,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.dismiss(loadingToast);
        toast.error(errorData.error || "Error al registrar usuario");
        return;
      }
      
      // Redirigir al usuario a la página de perfil
      toast.dismiss(loadingToast);
      toast.success("¡Registro exitoso!");
      router.push("/profile");

    } catch (error) {
      toast.error("Error al registrar usuario");
      console.error("Error de registro:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu nombre"
            className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--bg-dark-blue)]`}
            {...register("name")}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="tu@email.com"
            className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--bg-dark-blue)]`}
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        {/* Teléfono */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            id="phone"
            type="text"
            placeholder="Tu teléfono"
            className={`w-full px-3 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--bg-dark-blue)]`}
            {...register("phone")}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        {/* Sexo */}
        <div>
          <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-1">
            Sexo
          </label>
          <select
            id="sex"
            className={`w-full px-3 py-2 border ${errors.sex ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--bg-dark-blue)]`}
            {...register("sex")}
            defaultValue=""
          >
            <option value="" disabled>Selecciona tu sexo</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>
          {errors.sex && <p className="text-red-500 text-xs mt-1">{errors.sex.message}</p>}
        </div>
        {/* Nacionalidad */}
        <div>
          <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
            Nacionalidad
          </label>
          <input
            id="nationality"
            type="text"
            placeholder="Tu nacionalidad"
            className={`w-full px-3 py-2 border ${errors.nationality ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--bg-dark-blue)]`}
            {...register("nationality")}
          />
          {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality.message}</p>}
        </div>
        {/* Fecha de nacimiento */}
        <div>
          <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de nacimiento
          </label>
          <input
            id="birth_date"
            type="date"
            className={`w-full px-3 py-2 border ${errors.birth_date ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--bg-dark-blue)]`}
            {...register("birth_date")}
          />
          {errors.birth_date && <p className="text-red-500 text-xs mt-1">{errors.birth_date.message}</p>}
        </div>
        {/* Contraseña */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--bg-dark-blue)] pr-10`}
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
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>
        {/* Confirmar contraseña */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar contraseña
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full px-3 py-2 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--bg-dark-blue)] pr-10`}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={toggleConfirmVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
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
        {errors.accept && <p className="text-red-500 text-xs">{errors.accept.message}</p>}
        {/* Botón registro */}
        <button
          type="submit"
          disabled={!accepted}
          className={`w-full py-3 rounded-lg ${accepted ? "bg-[var(--bg-dark-blue)] text-white hover:bg-[var(--bg-dark-blue)]/90" : "bg-gray-200 text-gray-500"} disabled:cursor-not-allowed transition`}
        >
          Registrarse
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
        <FcGoogle className="mr-3" size={20}/>
        Regístrate con Google
      </button>
      <p className="text-center text-sm mt-4">
        ¿Ya tienes cuenta?{' '}
        <a href="/?form=login" className="text-orange-500 hover:underline">
          Inicia sesión
        </a>
      </p>
    </>
  );
}