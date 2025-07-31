import "@/styles/globals.css";
// import Navbar from "@/components/NewNavbar";
import Navbar from "@/components/Navbar4";
import Footer from "@/components/Footer";
import WhatsAppBubble from "@/components/whatsappIcon.jsx";

export default function App({ Component, pageProps }) {
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
