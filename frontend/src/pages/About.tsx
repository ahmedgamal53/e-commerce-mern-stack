import aboutImage from "../assets/valna-studio-mU88MlEFcoU-unsplash.jpg";

const About = () => {
   return (
    <div className="w-full">

      {/* ================= ABOUT US ================= */}
      <section className="pt-10 sm:pt-14">

        {/* Title */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-700">
            ABOUT US
          </h1>

          <div className="w-8 h-[1.5px] bg-gray-700"></div>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-center">

          {/* Image */}
          <div className="w-full md:w-[45%]">
            <img
              src={aboutImage}
              alt="About us"
              className="w-full h-[350px] sm:h-[400px] object-cover"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-[55%] text-gray-600 text-sm leading-6">

            <p className="mb-5">
              Forever was born out of a passion for innovation and a desire
              to revolutionize the way people shop online. Our journey began
              with a simple idea: to provide a platform where customers can
              easily discover, explore, and purchase a wide range of products
              from the comfort of their homes.
            </p>

            <p className="mb-5">
              Since our inception, we've worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.
            </p>

            <h2 className="font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>

            <p>
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>

          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="mt-16 sm:mt-20">

        {/* Title */}
        <div className="flex items-center gap-2 mb-8">
          <h2 className="text-xl sm:text-2xl font-medium text-gray-700">
            WHY CHOOSE US
          </h2>

          <div className="w-8 h-[1.5px] bg-gray-700"></div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border border-gray-200">

          {/* Card 1 */}
          <div className="p-8 sm:p-10 border-b sm:border-b-0 sm:border-r border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">
              Quality Assurance
            </h3>

            <p className="text-sm text-gray-500 leading-6">
              We carefully select and inspect every product to make sure you
              receive the best quality.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 sm:p-10 border-b sm:border-b-0 sm:border-r border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">
              Convenience
            </h3>

            <p className="text-sm text-gray-500 leading-6">
              Enjoy a simple and convenient shopping experience from browsing
              to delivery.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 sm:p-10">
            <h3 className="font-semibold text-gray-800 mb-4">
              Excellent Customer Service
            </h3>

            <p className="text-sm text-gray-500 leading-6">
              Our team is always ready to help and make sure you have the best
              shopping experience.
            </p>
          </div>

        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="text-center py-16 sm:py-20">

        <h2 className="text-2xl font-medium text-gray-800 mb-3">
          Subscribe Now & Get 20% Off
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Subscribe to our newsletter and stay updated with our latest offers.
        </p>

        <div className="flex flex-col sm:flex-row max-w-lg mx-auto">

          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 border border-gray-300 px-4 py-3 outline-none focus:border-gray-600"
          />

          <button
            className="
              bg-black
              text-white
              px-7
              py-3
              hover:bg-gray-800
              transition
            "
          >
            SUBSCRIBE
          </button>

        </div>
      </section>

    </div>
  );
}

export default About