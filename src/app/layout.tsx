import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Aventura Animal | Plataforma educativa",
  description:
    "Aprende a clasificar animales carnívoros, herbívoros y omnívoros con imágenes locales, vistas educativas y un juego 3D.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${baloo.variable} ${nunito.variable}`}>
      <body className="min-h-screen text-slate-900 antialiased">
        <Navbar />
        {children}
        <footer className="relative overflow-hidden border-t-4 border-emerald-300 bg-slate-950 px-4 py-10 text-center text-sm font-bold text-white">
          <div className="animal-pattern absolute inset-0 opacity-10" aria-hidden />
          <div className="relative mx-auto max-w-5xl">
            <div className="mb-3 text-4xl" aria-hidden>
              🐾
            </div>
            <p className="text-lg font-black">Aventura Animal</p>
            <p className="mt-1 text-white/70">
              Aprendamos qué comen los animales explorando, observando y jugando.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
