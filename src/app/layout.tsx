import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Geetanjali High School, Maddur — Build Your Own Identity",
  description:
    "Geetanjali High School, Maddur is a VVM Group Institution offering quality education from Primary to Secondary level. School Code: 46117. Located in Narayanapet District, Telangana.",
  keywords: [
    "Geetanjali High School",
    "GHS Maddur",
    "VVM Group Institution",
    "School in Maddur",
    "CBSE School Narayanapet",
    "Best School Telangana",
    "School Code 46117",
  ],
  openGraph: {
    title: "Geetanjali High School, Maddur — Build Your Own Identity",
    description:
      "A VVM Group Institution providing quality education. Thought • Action • Progress.",
    url: "https://www.ghsmaddur.in",
    siteName: "Geetanjali High School, Maddur",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Geetanjali High School, Maddur",
    description: "Build Your Own Identity — A VVM Group Institution",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          <CustomCursor />
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
