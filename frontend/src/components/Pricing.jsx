import React from 'react';

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "47",
      features: [
        { text: "Officia quaerat eaque neque", active: true },
        { text: "Possimus aut consequuntur incidunt", active: true },
        { text: "Lorem ipsum dolor sit amet", active: false },
        { text: "Consectetur adipisicing elit", active: false },
        { text: "Dolorum esse odio quas architecto sint", active: false },
      ],
      buttonClass: "bg-slate-600 hover:bg-slate-700",
    },
    {
      name: "Premium",
      price: "200",
      features: [
        { text: "Officia quaerat eaque neque", active: true },
        { text: "Possimus aut consequuntur incidunt", active: true },
        { text: "Lorem ipsum dolor sit amet", active: true },
        { text: "Consectetur adipisicing elit", active: true },
        { text: "Dolorum esse odio quas architecto sint", active: false },
      ],
      buttonClass: "bg-orange-500 hover:bg-orange-600",
      featured: true, // Darmiyan wala card thora bara aur shadow wala hai
    },
    {
      name: "Professional",
      price: "750",
      features: [
        { text: "Officia quaerat eaque neque", active: true },
        { text: "Possimus aut consequuntur incidunt", active: true },
        { text: "Lorem ipsum dolor sit amet", active: true },
        { text: "Consectetur adipisicing elit", active: true },
        { text: "Dolorum esse odio quas architecto sint", active: true },
      ],
      buttonClass: "bg-slate-600 hover:bg-slate-700",
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <h2 className="text-orange-500 text-4xl md:text-5xl font-bold text-center mb-20">
          Pricing
        </h2>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-0">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white p-12 text-center transition-all duration-300 ${
                plan.featured 
                ? 'shadow-2xl z-10 py-20 border-t-4 border-orange-500' 
                : 'border border-gray-100'
              }`}
            >
              <h3 className="text-2xl font-medium text-gray-800 mb-8">{plan.name}</h3>
              
              <div className="flex justify-center items-baseline mb-10">
                <span className="text-orange-500 text-4xl font-bold leading-none">$</span>
                <span className="text-orange-500 text-6xl font-bold leading-none mx-1">{plan.price}</span>
                <span className="text-gray-300 text-lg">/ year</span>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-12 text-left inline-block">
                {plan.features.map((feature, i) => (
                  <li key={i} className={`flex items-start gap-3 text-[15px] ${feature.active ? 'text-gray-600' : 'text-gray-200'}`}>
                    <span className={feature.active ? 'text-green-500' : 'text-gray-200'}>
                      {feature.active ? '✓' : '✓'}
                    </span>
                    {feature.text}
                  </li>
                ))}
              </ul>

              {/* Buy Now Button */}
              <div>
                <button className={`${plan.buttonClass} text-white px-10 py-3 rounded-full font-medium transition-colors shadow-md`}>
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;