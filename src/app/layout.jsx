import "./globals.css";
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import { LenisProvider } from './contexts/LenisContext';

export const metadata = {
  title: "My Website",
  description: "CSI x TSDC",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          <Navbar />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
