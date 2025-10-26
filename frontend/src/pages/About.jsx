import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetter from "../components/NewsLetter";

const About = () => {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24">
      {/* ABOUT TITLE */}
      <div className="text-2xl sm:text-3xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* ABOUT SECTION */}
      <div className="my-10 flex flex-col md:flex-row gap-10 md:gap-16 items-center">
        <img
          className="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] rounded-xl shadow-sm"
          src={assets.about_img}
          alt="about_img"
        />

        <div className="flex flex-col justify-center gap-5 md:w-2/4 text-gray-600 text-sm sm:text-base leading-relaxed">
          <p>
            <strong>Forever</strong> was born out of a passion for innovation
            and a desire to revolutionize the way people shop online. Our
            journey began with a simple idea — to provide a platform where
            customers can easily discover, explore, and purchase a wide range of
            products from the comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <b className="text-gray-800 text-base sm:text-lg mt-2">Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations — from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="text-xl sm:text-2xl py-4 text-center">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      {/* FEATURES GRID */}
      <div className="flex flex-col md:flex-row text-sm sm:text-base mb-20">
        {/* Box 1 */}
        <div className="border border-gray-200 rounded-lg px-6 sm:px-10 md:px-12 py-8 sm:py-12 flex flex-col gap-4 text-center md:text-left hover:shadow-md transition-all duration-300">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            We carefully select and test each product to ensure it meets our
            highest standards of quality and reliability.
          </p>
        </div>

        {/* Box 2 */}
        <div className="border border-gray-200 rounded-lg px-6 sm:px-10 md:px-12 py-8 sm:py-12 flex flex-col gap-4 text-center md:text-left hover:shadow-md transition-all duration-300">
          <b>Convenience</b>
          <p className="text-gray-600">
            With our user-friendly interface and smooth ordering process,
            shopping is easier, faster, and more enjoyable.
          </p>
        </div>

        {/* Box 3 */}
        <div className="border border-gray-200 rounded-lg px-6 sm:px-10 md:px-12 py-8 sm:py-12 flex flex-col gap-4 text-center md:text-left hover:shadow-md transition-all duration-300">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Our dedicated support team is available 24/7 to ensure your
            questions and concerns are handled promptly and professionally.
          </p>
        </div>
      </div>

      {/* NEWSLETTER */}
      <NewsLetter />
    </div>
  );
};

export default About;
