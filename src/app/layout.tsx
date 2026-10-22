import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import "@/styles.css";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cormorant",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: "BlueTown Fethiye — Sea-View Holiday Home by the Marina",
    template: "%s | BlueTown Fethiye",
  },
  description:
    "A two-bedroom sea-view holiday home in central Fethiye, steps from Paspatur Bazaar and the marina.",
  openGraph: {
    title: "BlueTown Fethiye — Where the sea becomes home",
    description:
      "A coastal escape in the heart of Fethiye: sea-view balcony, two bedrooms, full kitchen.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
