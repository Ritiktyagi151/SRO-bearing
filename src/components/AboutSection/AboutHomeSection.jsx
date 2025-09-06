// components/SROBearingsSection.jsx
import Image from "next/image";

const SROBearingsSection = () => {
  return (
    <section className="w-full bg-gray-100 py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Text Section - updated to match SKF style */}
        <div className="w-full lg:w-1/2">
          <p className="text-sm text-green-500 font-semibold mb-4">
            About SRO Bearings
          </p>
          <h2 className="text-5xl sm:text-6xl font-bold text-green-700 leading-tight tracking-tight">
            Engineered to handle
            <br />
            heavy loads and
            <br />
            misalignment with ease
          </h2>
          <div className="mt-12">
            <p className="text-gray-400 text-lg max-w-xl">
              Spherical Roller Bearings are designed to accommodate heavy radial
              and axial loads, while compensating for shaft misalignment. Ideal
              for demanding applications like mining, power generation, and
              heavy industry.
            </p>
          </div>
        </div>

        {/* Images Section */}
        <div className="w-full lg:w-1/2 relative flex justify-center items-center top-10">
          {/* Front Image */}
          <div className="relative w-[50%] sm:w-[50%] z-10 left-[-130px]">
            <Image
              src="https://images.unsplash.com/photo-1732791547509-f257f062eeb4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVhcmluZ3xlbnwwfHwwfHx8MA%3D%3D"
              alt="Spherical roller bearing"
              width={600}
              height={400}
              className="rounded-md shadow-md w-full h-auto object-cover"
            />
          </div>

          {/* Back Image */}
          <div className="absolute top-[-40px] right-[-50px] w-[60%] hidden md:block z-0">
            <Image
              src="https://images.unsplash.com/photo-1712045348056-773b912e8f7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVhcmluZ3N8ZW58MHx8MHx8fDA%3D"
              alt="Heavy machinery"
              width={800}
              height={600}
              className="rounded-md shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SROBearingsSection;
