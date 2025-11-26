import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import LazyImage from "./LazyImage";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around items-center gap-8 sm:gap-4 md:gap-2 text-center py-10 sm:py-16 md:py-20 text-[10px] sm:text-sm md:text-base text-gray-700 px-4">
      <div className="flex flex-col items-center w-[80%] sm:w-auto">
       <LazyImage src={assets.exchange_icon} alt="exchange_icon" w={56} h={56} className="w-10 sm:w-12 md:w-14 m-auto mb-3 sm:mb-5" />
        <p className="font-semibold text-xs sm:text-sm md:text-base">Easy Exchange Policy</p>
        <p className="text-gray-400 text-[10px] sm:text-sm leading-snug">
          We offer hassle free exchange policy
        </p>
      </div>

      <div className="flex flex-col items-center w-[80%] sm:w-auto">
       <LazyImage src={assets.quality_icon} alt="quality_icon" w={56} h={56} className="w-10 sm:w-12 md:w-14 m-auto mb-3 sm:mb-5" />
        <p className="font-semibold text-xs sm:text-sm md:text-base">7 Days Return Policy</p>
        <p className="text-gray-400 text-[10px] sm:text-sm leading-snug">
          We provide 7 days free return policy
        </p>
      </div>

      <div className="flex flex-col items-center w-[80%] sm:w-auto">
       <LazyImage src={assets.support_img} alt="support" w={56} h={56} className="w-10 sm:w-12 md:w-14 m-auto mb-3 sm:mb-5" />
        <p className="font-semibold text-xs sm:text-sm md:text-base">Best Customer Support</p>
        <p className="text-gray-400 text-[10px] sm:text-sm leading-snug">
          We provide 24/7 customer support
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;

