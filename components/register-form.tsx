"use client";
import React from "react";
import { z } from "zod";
import { registerAuthSchema } from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof registerAuthSchema>;

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(registerAuthSchema) });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response?.ok) {
      if (response.status == 403) {
        const fieldToErrorMessage: { [key in keyof FormData]: string } =
          await response.json();

        type FormData = z.infer<typeof registerAuthSchema>;
        let k: keyof typeof fieldToErrorMessage;
        for (k in fieldToErrorMessage) {
          setError(k, { type: "custom", message: fieldToErrorMessage[k] });
        }
      }
      setIsLoading(false);
      return;
    }

    router.push("/");
    setIsLoading(false);
  }

  return (
    <div className="grid gap-16" {...props}>
      <h3 className="text-4xl font-semibold">Crear cuenta</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              className="my-0 mb-3 h-10 w-full rounded-lg border border-slate-100 py-2.5 px-3 text-sm  hover:border-slate-300 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="my-0 mb-3 h-10 w-full rounded-lg border border-slate-100 py-2.5 px-3 text-sm  hover:border-slate-300 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              placeholder=""
              className="my-0 mb-3 h-10 w-full rounded-lg border border-slate-100 py-2.5 px-3 text-sm  hover:border-slate-300 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className="inline-flex w-full items-center justify-center rounded-lg bg-sky-500 px-5 py-2.5 text-center text-sm font-medium  text-white  hover:ring-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-1">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}
