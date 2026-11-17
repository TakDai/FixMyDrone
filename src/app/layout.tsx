import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fixmydrone.fr"),
  title: "FixMyDrone.fr — Forum, Diagnostics & Catalogue Dépannage Drone FPV",
  description:
    "Plateforme communautaire d'entraide pour pilotes de drones FPV en France. Diagnostics de pannes par composant (Moteurs, ESC, FC Betaflight, DJI O3, ExpressLRS) et catalogue interconnecté.",
  keywords: [
    "drone fpv",
    "dépannage drone",
    "fixmydrone",
    "réparation drone fpv",
    "betaflight desync",
    "moteurs brushless",
    "esc stack 4in1",
    "dji o3 air unit",
    "expresslrs bind",
    "multi-motors",
  ],
  authors: [{ name: "Communauté FixMyDrone.fr" }],
  openGraph: {
    title: "FixMyDrone.fr — Dépannage & Catalogue Pièces FPV",
    description:
      "Toutes les pannes, solutions et fiches pièces interconnectées pour votre quad FPV.",
    url: "https://fixmydrone.fr",
    siteName: "FixMyDrone.fr",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FixMyDrone.fr — Entraide FPV",
    description: "Le forum de dépannage interactif pour tous les pilotes de quad FPV.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-zinc-100">{children}</body>
    </html>
  );
}
