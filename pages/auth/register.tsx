import { RegisterForm } from "@/components/register-form";

export default function Register() {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <div className="p-8">
                <div className="mx-auto flex w-[350px] flex-col justify-center space-y-6">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}
