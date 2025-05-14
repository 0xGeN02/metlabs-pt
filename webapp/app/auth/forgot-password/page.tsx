"use client";

import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

// Zod schema for form validation
const formSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
});

type FormData = z.infer<typeof formSchema>;

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      const loadingToast = toast.loading("Enviando...");

      const response = await fetch("http://localhost:3000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      toast.dismiss(loadingToast);

      if (response.ok) {
        toast.success(result.message || "Instrucciones enviadas a tu correo");
        setEmailSent(true);
      } else {
        toast.error(result.error || "Error al enviar");
      }
    } catch (error) {
      toast.error("Error al enviar");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center pt-24 pb-12">
      <section className="flex flex-col items-center justify-center max-w-6xl w-full px-6 py-16">
        {/* Form container */}
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-[var(--bg-dark-blue)] mb-4">
            Recuperar contraseña
          </h2>
          
          <p className="text-gray-600 mb-8">
            {!emailSent 
              ? "Introduce tu correo electrónico y te enviaremos instrucciones para recuperar tu contraseña."
              : "Hemos enviado un enlace a tu correo para restablecer tu contraseña. Revisa tu bandeja de entrada y sigue las instrucciones."
            }
          </p>

          {!emailSent ? (
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
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg bg-[var(--bg-dark-blue)] text-white hover:bg-[var(--bg-dark-blue)]/90 transition ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Enviando..." : "Enviar correo"}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <button
                onClick={() => setEmailSent(false)}
                className="w-full py-3 rounded-lg bg-[var(--bg-dark-blue)] text-white hover:bg-[var(--bg-dark-blue)]/90 transition"
              >
                Intentar con otro correo
              </button>
            </div>
          )}

          {/* Back to login link */}
          <div className="mt-6 text-center">
            <Link
              href="/?form=login"
              className="text-orange-500 hover:underline"
            >
              Volver a iniciar sesión
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
