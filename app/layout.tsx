import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Faker",
  description: "Generates reproducible fake person data.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="garden">
      <body className="min-h-screen flex place-content-center">
        <div className="m-3">{children}</div>
      </body>
    </html>
  );
}
