import Blogs from "@/components/homesections/Blogs";
import HeroVideoSection from "@/components/homesections/herovideosection";
import Homeabout from "@/components/homesections/Homeabout";
import IndustryApplications from "@/components/homesections/ResearchApplications";
import OurClient from "@/components/homesections/OurClient";
import ProductSlider from "@/components/homesections/Productslider";
import ExploreMore from "@/components/homesections/ExploreMoreSection";
import WhoWeAre from "@/components/homesections/WhoWeAre";
import ThisIsUs from "@/components/homesections/ThisIsUs";

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
      <ThisIsUs />
      <IndustryApplications />
      <ExploreMore />
      <Blogs />
      <OurClient />
    </>
  );
}