import { AuthProvider } from "@/context/UserContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "./globals.css";
import { ReactNode } from "react";
import Toast from "@/components/ui/Toast";


type Props = {
  children: ReactNode
}
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
        <Toast />
      </body>
    </html>
  );
}