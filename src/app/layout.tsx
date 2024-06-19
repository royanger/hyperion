import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, OrganizationSwitcher, UserButton } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <header className="flex justify-between">
            <div className="flex">
              <h1>Hyperion</h1>
              <OrganizationSwitcher />
            </div>
            <UserButton />
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
