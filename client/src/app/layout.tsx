import type { Metadata } from "next";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";
export const metadata: Metadata = {
  title: "Inventory managment",
  description: "All data at one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
