import heroImage from "../assets/hero_2.jpg";

const Hero = () => {
  const scrollToFeatures = () => {
    const nextSection = document.getElementById("features-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <section className="h-screen bg-cover bg-center relative font-sans" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="absolute inset-0 bg-black/30 backdrop-contrast-125 flex flex-col items-center justify-center text-center px-4 text-white">
        
        <h1 className="text-5xl md:text-[85px] font-bold tracking-[0.1em] leading-none mb-4 uppercase">
          Banking Solutions
        </h1>

        <p className="max-w-3xl mt-4 text-lg md:text-xl font-normal opacity-90 leading-snug">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident cupiditate suscipit...
        </p>

        {/* Mouse Scroll Icon - Ab ye clickable hai */}
        <div 
          onClick={scrollToFeatures}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hover:scale-110 transition-all"
        >
          <div className="w-[24px] h-[40px] border-2 border-white rounded-full flex justify-center p-1 opacity-80">
            <div className="w-1 h-1.5 bg-white rounded-full animate-bounce mt-1"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
