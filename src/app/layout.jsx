import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from './components/Navbar';

export const metadata = {
  title: "My Website",
  description: "Smooth scroll enabled",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
