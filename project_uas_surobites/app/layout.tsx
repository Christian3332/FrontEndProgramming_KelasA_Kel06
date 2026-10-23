
import type { Metadata } from "next";
import "./styles/globals.css";

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
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
