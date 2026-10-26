import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poetsen_One } from "next/font/google";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

// Font untuk judul
const poetsen = Poetsen_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poetsen",
});

export const metadata: Metadata = {
  title: "SuroBites - Kuliner Surabaya",
  description:
    "Temukan rekomendasi makanan khas Surabaya dan lokasi warung favoritmu di SuroBites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakarta.variable} ${poetsen.variable}`}>
      <body className={`${jakarta.className} d-flex flex-column min-vh-100`}>
        {children}
      </body>
    </html>
  );
}
