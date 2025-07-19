import Blogs from "@/components/homesections/Blogs";
import HeroVideoSection from "@/components/homesections/herovideosection";
// import Herosection from "@/components/homesections/Herosection";

import Homeabout from "@/components/homesections/Homeabout";
import IndustryApplications from "@/components/homesections/IndustryApplications ";
import OurClient from "@/components/homesections/OurClient";
import ProductSlider from "@/components/homesections/Productslider";
import Testimonials from "@/components/homesections/Testimonials";
import WhoWeAre from "@/components/homesections/WhoWeAre";

import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | SRO bearing</title>
      </Head>
      <HeroVideoSection />
      <Homeabout />
      <ProductSlider />
      <WhoWeAre />
      <IndustryApplications />
      <Testimonials />
      <Blogs />
      <OurClient />
    </>
  );
}
