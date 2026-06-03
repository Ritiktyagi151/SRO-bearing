import "@/styles/globals.css";
import Navbar from "@/components/Navbar4";
import Footer from "@/components/Footer";
import WhatsAppBubble from "@/components/whatsappIcon.jsx";
import { useEffect, useState } from "react";
import LoadingSpinner, { AnimatedLoader } from "@/components/LoadingBar";

const MAINTENANCE_MODE = true;

function MaintenancePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f0f0f",
        color: "#fff",
        fontFamily: "'Segoe UI', sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🔧</div>
      <h1
        style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "12px" }}
      >
        We Are Under Maintenance
      </h1>
      <p
        style={{
          color: "#aaaaaa",
          fontSize: "1.1rem",
          maxWidth: "450px",
          lineHeight: "1.6",
        }}
      >
        We will get back to you soon. Thank you for your patience! 🙏
      </p>
    </div>
  );
}

export default function App({ Component, pageProps }) {
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setFirstLoad(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (firstLoad) return <AnimatedLoader />;
  if (MAINTENANCE_MODE) return <MaintenancePage />;

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
