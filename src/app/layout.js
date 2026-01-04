import "./globals.css"
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LoadingProvider from "@/components/ui/LoadingProvider";

export const metadata = {
  title: "CSI Official Website",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-csi-white`}
      >
        <LoadingProvider>
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </LoadingProvider>
      </body>
    </html>
  );
}
