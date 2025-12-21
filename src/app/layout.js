import "./globals.css"
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
export const metadata = {
  title: "CSI Official Website",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
