import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "walk time babe",
  description: "A cute aesthetic garden walk website with flowers and rainy weather.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
