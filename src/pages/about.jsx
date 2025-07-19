import Head from "next/head";
import Videosection from "@/components/homesections/Videosection";
import Overviewsection from "@/components/AboutSection/Overviewsection";
import Journeysection from "@/components/AboutSection/Journeysection";
import ValuesMission from "@/components/AboutSection/ValuesMission";
import QualityAssurance from "@/components/AboutSection/QualityAssurance";
import Leadershipsection from "@/components/AboutSection/Leadershipsection";

export default function About() {
  return (
    <>
      <Head>
        <title>About | SRO bearing</title>
      </Head>
      <Videosection />
      <Overviewsection />
      <Journeysection />
      <ValuesMission />
      <QualityAssurance />
      <Leadershipsection />
    </>
  );
}
