import "styles/globals.css";
import "@tremor/react/dist/esm/tremor.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="bg-white text-slate-900 antialiased">
      <head />
      <body>
        <div className="min-h-screen bg-slate-50">
          <div className="mx-auto max-w-screen-xl pt-9 pb-16">{children}</div>
        </div>
      </body>
    </html>
  );
}
