import "@/styles/globals.css";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: AuthLayoutProps) {
  return (
    <div className="mx-auto flex w-[350px] flex-col justify-center space-y-6">
      {children}
    </div>
  );
}
