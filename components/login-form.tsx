import React from "react";
import { z } from "zod";
import { loginAuthSchema } from "@/lib/validations/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "./icons";
import { signIn } from "next-auth/react";
import Router, { useRouter } from "next/router";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> { }

type FormData = z.infer<typeof loginAuthSchema>;

export function LoginForm({ className, ...props }: LoginFormProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(loginAuthSchema) });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const response = await signIn("credentials", { ...data, redirect: false })

    if (response?.error && response.error == 'LoginWrongPasswordError') {
      setError('password', { "message": "The password is wrong" })
      return
    }

    if (response?.error && response.error == 'LoginWrongEmailError') {
      setError('email', {
        "message": "The email is wrong"
      })
      return
    }
    setIsLoading(false)
    router.push('/')
  }

  return (
    <div className="grid gap-6" {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="my-0 mb-3 h-10 py-2.5 px-3 w-full rounded-lg border border-slate-100 text-sm  hover:border-slate-300 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
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
              className="my-0 mb-3 h-10 py-2.5 px-3 w-full rounded-lg border border-slate-100 text-sm  hover:border-slate-300 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
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
          <button className="inline-flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-center text-sm font-medium bg-sky-500  text-white  focus:outline-none focus:ring-2 focus:ring-sky-600 hover:ring-sky-800">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
