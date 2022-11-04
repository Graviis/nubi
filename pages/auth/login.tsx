import { LoginForm } from "@/components/login-form";

export default function Login() {

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="p-8">
        <div className="mx-auto flex w-[350px] flex-col justify-center space-y-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
