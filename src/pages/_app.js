import "@/styles/globals.css";
import Navbar from "@/components/Navbar4";
import Footer from "@/components/Footer";
import WhatsAppBubble from "@/components/whatsappIcon.jsx";

import { useEffect, useState } from "react";

import LoadingSpinner, { AnimatedLoader } from "@/components/LoadingBar";

export default function App({ Component, pageProps }) {
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    // Show loader for 2 seconds (you can adjust)
    const timer = setTimeout(() => setFirstLoad(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  if (firstLoad) {
    // Show only loader, nothing else
    return <AnimatedLoader />;
  }

  // After loader finishes
  return (
    <>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
      <WhatsAppBubble />
      <Footer />
    </>
  );
}
