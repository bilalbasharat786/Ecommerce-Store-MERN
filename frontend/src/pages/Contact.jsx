import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const Contact = () => {
  return (
    <div className="px-4 sm:px-8">
      {/* Page Title */}
      <div className="text-center text-xl sm:text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* Contact Section */}
      <div className="my-10 flex flex-col md:flex-row justify-center items-center gap-10 mb-28">
        {/* Left Image */}
        <img
          className="w-full max-w-[500px] rounded-lg shadow-md object-cover"
          src={assets.contact_img}
          alt="contact_img"
        />

        {/* Right Content */}
        <div className="flex flex-col justify-center items-start gap-6 text-center md:text-left">
          {/* Store Info */}
          <div className="flex flex-col gap-4 text-gray-600">
            <p className="font-semibold text-lg sm:text-xl text-gray-800">
              Our Store
            </p>
            <p className="text-sm sm:text-base">
              54709 Willms Station <br /> Suite 350, Washington, USA
            </p>

            <p className="text-sm sm:text-base">
              Tel: (415) 555-0132 <br /> Email: admin@Jamal Collection.com
            </p>
          </div>

          {/* Careers Section */}
          <div className="flex flex-col gap-3 text-gray-600">
            <p className="font-semibold text-lg sm:text-xl text-gray-800">
              Careers at Jamal Collection
            </p>
            <p className="text-sm sm:text-base">
              Learn more about our teams and job openings.
            </p>

            {/* Button */}
            <button className="border border-black px-6 sm:px-8 py-3 sm:py-4 text-sm font-medium rounded-lg hover:bg-black hover:text-white transition-all duration-500 w-full sm:w-auto">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

