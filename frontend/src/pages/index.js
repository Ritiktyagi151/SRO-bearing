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
import Videodemo from "@/components/homesections/videodemo";
import Journey from "@/components/homesections/Journey";

export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:5001/api/cms/about");
    const data = await res.json();
    return {
      props: {
        about: data.about || {},
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("Error fetching about CMS data on index page:", err);
    return {
      props: {
        about: {},
      },
      revalidate: 60,
    };
  }
}

export default function Home({ about = {} }) {
  return (
    <>
      <Head>
        <title>Home | SRO bearing</title>
      </Head>
      <Videodemo />
      {/* <HeroVideoSection /> */}
      <Homeabout />
      <ProductSlider />
      <Journey about={about} />
      <WhoWeAre />
      <ThisIsUs />
      <IndustryApplications />
      <ExploreMore />
      <Blogs />
      <OurClient />
    </>
  );
}
