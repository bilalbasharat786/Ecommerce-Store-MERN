import React from 'react';
// Icons aur Image import kar rahe hain
import walletIcon from '../assets/001-wallet.svg';
import cartIcon from '../assets/004-cart.svg';
import cardIcon from '../assets/006-credit-card.svg';
import aboutImg from '../assets/about_2.jpg';

const Features = () => {
  const features = [
    {
      title: "Money Savings",
      icon: walletIcon,
      desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
    },
    {
      title: "Online Shoppings",
      icon: cartIcon,
      desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
    },
    {
      title: "Credit / Debit Cards",
      icon: cardIcon,
      desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia."
    }
  ];

  return (
    <section id="features-section" className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Part: Three Feature Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center mb-32">
          {features.map((item, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="mb-8 transform transition duration-500 group-hover:-translate-y-2">
                <img src={item.icon} alt={item.title} className="w-20 h-20 object-contain" />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-4 tracking-tight">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-base font-light">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Part: Amortization Computation Section */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Left Side: Image */}
          <div className="w-full md:w-1/2">
            <img 
              src={aboutImg} 
              alt="About Us" 
              className="w-full h-auto rounded-sm shadow-sm" 
            />
          </div>

          {/* Right Side: Content */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6 tracking-tight">
              Amortization Computation
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed text-lg font-light">
              A small river named Duden flows by their place and supplies it with the necessary regelialia.
            </p>

            {/* Checklist */}
            <ul className="space-y-4 mb-10">
              {['Officia quaerat eaque neque', 'Lorem ipsum dolor sit amet', 'Consectetur adipisicing elit'].map((text, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-500 font-light">
                  <span className="text-green-500 text-xl font-bold">✓</span>
                  {text}
                </li>
              ))}
            </ul>

            {/* Email Subscription Form */}
            <form className="flex flex-col sm:flex-row gap-4 items-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full sm:flex-1 px-6 py-4 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              />
              <button 
                type="submit" 
                className="w-full sm:w-auto px-10 py-4 bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 transition-all shadow-md active:scale-95"
              >
                Submit Email
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;