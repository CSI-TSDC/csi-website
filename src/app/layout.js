import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LoadingProvider from "@/components/ui/LoadingProvider";
import EasterEgg from "@/components/ui/EasterEgg";
import {
  PRELOAD_IMAGES,
  PRELOAD_LINK_COUNT,
} from "@/config/preloadImages";
import { getEarlyPreloadScript } from "@/utils/earlyPreloadScript";

export const metadata = {
  title: "CSI Official Website",
  description: "",
};

export default function RootLayout({ children }) {
  const earlyPreloadScript = getEarlyPreloadScript();

  return (
    <html lang="en">
      <head>
        {PRELOAD_IMAGES.slice(0, PRELOAD_LINK_COUNT).map((href) => (
          <link key={href} rel="preload" as="image" href={href} />
        ))}
      </head>
      <body className="antialiased bg-csi-white">
        <div
          id="csi-load"
          className="fixed inset-0 z-[9999] bg-csi-white flex flex-col items-center justify-center"
        >
          <div className="text-center mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/Logos/csi_logo.webp"
              alt="CSI Logo"
              width={96}
              height={96}
              className="w-24 h-auto object-contain mb-10 mx-auto"
            />
            <h2 className="text-2xl md:text-3xl font-bold text-csi-black mb-2">
              Loading
            </h2>
          </div>
          <div className="w-full max-w-md px-8">
            <div className="w-full h-2 bg-csi-black/10 rounded-full overflow-hidden">
              <div
                id="csi-load-bar"
                className="h-full bg-csi-blue rounded-full"
                style={{ width: "0%" }}
                suppressHydrationWarning
              />
            </div>
            <div className="text-center mt-4">
              <span
                id="csi-load-perc"
                className="text-sm text-csi-black/60"
                suppressHydrationWarning
              >
                0
              </span>
            </div>
          </div>
        </div>

        <script
          dangerouslySetInnerHTML={{ __html: earlyPreloadScript }}
        />

        <LoadingProvider>
          <EasterEgg />
          <Navbar />
          {children}
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}
