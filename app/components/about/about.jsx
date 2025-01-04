const About = () => {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                ABOUT
              </h2>
              <div className="w-24 h-1 bg-yellow-500 mb-8"></div>
              <p className="text-gray-600 text-lg mb-6">
                With over two decades of experience in the construction industry, we have established ourselves as leaders in quality construction and infrastructure development. Our commitment to excellence and innovation has made us the preferred choice for complex construction projects across the region.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                Our team of highly skilled professionals brings expertise in modern construction techniques, sustainable building practices, and cutting-edge project management. We pride ourselves on delivering projects that not only meet but exceed our clients' expectations.
              </p>
              <p className="text-gray-600 text-lg">
                From initial concept to final completion, we ensure every project benefits from our meticulous attention to detail, commitment to quality, and innovative solutions that set new standards in the construction industry.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative h-[400px] lg:h-[600px]">
              <img
                src="/images/about/construction-site.jpg"
                alt="Construction Site"
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
