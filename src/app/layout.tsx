import type { Metadata } from "next";
import { Anton, Archivo, Archivo_Black, Inter, Playfair_Display, Plus_Jakarta_Sans, Public_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/layout/Preloader";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
});

const archivo = Archivo({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-archivo",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const playfair = Playfair_Display({
  weight: ["500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair",
});

const publicSans = Public_Sans({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-public-sans",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "WYTES Studio — We Build Brands, We Build Digital",
  description:
    "We create brands, websites and digital experiences that refuse to blend in.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${archivo.variable} ${inter.variable} ${anton.variable} ${playfair.variable} ${publicSans.variable} ${plusJakartaSans.variable} antialiased`}
    >
      <body className="font-body">
        <SmoothScrollProvider>
          <Preloader />
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
