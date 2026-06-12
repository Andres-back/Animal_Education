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
      <body className="min-h-screen bg-amber-50 text-slate-900 antialiased">
        <Navbar />
        {children}
        <footer className="border-t-4 border-emerald-200 bg-slate-900 px-4 py-8 text-center text-sm font-bold text-white">
          Aventura Animal - Aprendamos qué comen los animales
        </footer>
      </body>
    </html>
  );
}
