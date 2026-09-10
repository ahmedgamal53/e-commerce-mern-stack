import { Link } from "react-router-dom";
import aboutImage from "../assets/valna-studio-mU88MlEFcoU-unsplash.jpg";

const Contact = () => {
  return (
    <div className="pt-10 sm:pt-14">
      {/* Title */}
      <div className="flex items-center justify-center gap-2 mb-10">
        <h1 className="text-2xl sm:text-3xl font-medium text-gray-700">
          CONTACT US
        </h1>

        <div className="w-8 h-[1.5px] bg-gray-700"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-center">
        {/* Image */}
        <div className="w-full md:w-[50%]">
          <img
            src={aboutImage}
            alt="Contact us"
            className="w-full h-[350px] sm:h-[400px] object-cover"
          />
        </div>

        {/* Information */}
        <div className="w-full md:w-[50%] text-gray-600">
          {/* Our Store */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              Our Store
            </h2>

            <p className="text-sm leading-6 mb-4">
              54709 Willms Station
              <br />
              Suite 350, Washington, USA
            </p>

            <p className="text-sm leading-6">
              Tel: (415) 555-0132
              <br />
              Email: admin@forever.com
            </p>
          </div>

          {/* Careers */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              Careers at Forever
            </h2>

            <p className="text-sm leading-6 mb-5">
              Learn more about our teams and job openings.
            </p>

            <Link
              to="/jobs"
              className="
                inline-block
                border border-gray-700
                px-7 py-3
                text-sm
                text-gray-700
                hover:bg-black
                hover:text-white
                transition
              "
            >
              Explore Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
