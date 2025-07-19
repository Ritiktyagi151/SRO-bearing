import "@/styles/globals.css";
// import Navbar from "@/components/NewNavbar";
import Navbar from "@/components/Navbar4";

import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
