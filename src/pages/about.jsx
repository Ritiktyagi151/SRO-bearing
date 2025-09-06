import Head from "next/head";
import AboutHomeSection from "@/components/AboutSection/AboutHomeSection";
import Overviewsection from "@/components/AboutSection/Overviewsection";
import Journeysection from "@/components/AboutSection/Journeysection";
import ValuesMission from "@/components/AboutSection/ValuesMission";
import Sustainability from "@/components/AboutSection/Sustainability";
import Ourpurpose from "@/components/AboutSection/Ourpurpose";
// import CodeOfConduct from "@/components/AboutSection/CodeOfConduct";
// import ThisIsUS from "@/components/homesections/ThisIsUs";
import ExploreMoreSection from "@/components/homesections/ExploreMoreSection";

export default function About() {
  return (
    <>
      <Head>
        <title>About | SRO bearing</title>
      </Head>
      <AboutHomeSection />
      <Overviewsection />
      <Journeysection />
      <ValuesMission />
      <Sustainability />
      {/* <ThisIsUS /> */}
      <Ourpurpose />
      {/* <CodeOfConduct /> */}
      <ExploreMoreSection />
    </>
  );
}
