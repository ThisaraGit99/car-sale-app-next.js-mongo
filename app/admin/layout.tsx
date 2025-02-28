import type { Metadata } from "next";
import Providers from "@/app/components/Providers"; // Import SessionProvider wrapper
import Sidebar from "@/app/components/Sidebar"; // Import Sidebar
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Car Sale App",
  description: "Next.js car sale application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div style={{ display: "flex" }}>
            <Sidebar /> {/* ✅ Add Sidebar here */}
            <main style={{ flex: 1, padding: "16px" }}>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
