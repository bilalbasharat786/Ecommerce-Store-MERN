import React from "react";

const NewsLetter = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="text-center px-4 py-10 sm:py-16">
      {/* Heading */}
      <p className="text-lg sm:text-2xl font-medium text-gray-800">
        Subscribe now &amp; get 20% off
      </p>

      {/* Description */}
      <p className="text-gray-400 mt-2 text-xs sm:text-sm md:text-base leading-snug">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>

      {/* Form */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-3/4 md:w-1/2 flex flex-col sm:flex-row items-center gap-3 mx-auto my-6 border rounded-md overflow-hidden"
      >
        <input
          className="w-full outline-none text-sm sm:text-base px-3 py-2 sm:py-3"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs sm:text-sm px-6 sm:px-10 py-2 sm:py-3 border border-transparent hover:bg-white hover:text-black hover:border-black transition-all duration-700 w-full sm:w-auto"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
