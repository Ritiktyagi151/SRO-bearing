import Image from "next/image";

const ResearchDevelopmentSection = () => {
  // Random technology-related image from Unsplash
  const randomImageUrl = "/image/about/Indian-lady-sro.jpg";

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="md:w-1/2">
            <Image
              src={randomImageUrl}
              alt="Technology research and development"
              width={600}
              height={400}
              className="rounded-lg shadow-xl object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-400 mb-6">
              <span className="block text-green-600">
                Research and technology
              </span>
              <span className="block">development</span>
            </h2>

            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-green-500 mb-2">
                Co-innovating tomorrow's technologies
              </h3>
              <p className="text-gray-600">
                Saving energy by reducing friction is a concrete way towards a
                more sustainable world. Collaborating widely with other
                forward-thinking organizations, we're helping to make industry
                smarter, more competitive, and more energy efficient every day.
              </p>
            </div>

            <button className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md">
              Explore R&D
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchDevelopmentSection;
