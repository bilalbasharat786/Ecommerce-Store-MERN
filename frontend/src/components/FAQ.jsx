import React from 'react';
// Assets import
import aboutUsImg from '../assets/aboutus.jpg';
import icon1Img from '../assets/icons1.jpeg'; // Bank Loan Icon
import icon2Img from '../assets/icons2.jpeg'; // Banking Consultation Icon

const FAQ = () => {
  const faqData = [
    {
      question: "Can I accept both Paypal and Stripe?",
      answer: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."
    },
    {
      question: "Where are you from?",
      answer: "Voluptatum nobis obcaecati perferendis dolor totam unde dolores quod maxime corporis officia et. Distinctio assumenda minima maiores."
    },
    {
      question: "What available is refund period?",
      answer: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."
    },
    {
      question: "What is your opening time?",
      answer: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."
    },
    {
      question: "Can I accept both Paypal and Stripe?",
      answer: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."
    },
    {
      question: "Can I accept both Paypal and Stripe?",
      answer: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."
    },
    {
      question: "What available is refund period?",
      answer: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."
    },
    {
      question: "What available is refund period?",
      answer: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."
    }
  ];

  return (
    <section id="faq" className="font-sans">
      
      {/* --- Part 1: 8 FAQ Questions (Background Grayish) --- */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-orange-500 text-4xl md:text-5xl font-bold text-center mb-24">
            Frequently Ask Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            {faqData.map((item, index) => (
              <div key={index} className="flex flex-col text-left">
                <h3 className="text-xl font-medium text-gray-800 mb-5">{item.question}</h3>
                <p className="text-gray-400 leading-relaxed font-light text-[15px]">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Part 2: Bank Loan Section (Pure White Background) --- */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            
            {/* Left side: Main Image (aboutus.jpg) */}
            <div className="w-full md:w-1/2">
              <img 
                src={aboutUsImg} 
                alt="About Us" 
                className="w-full rounded-sm shadow-sm object-cover" 
              />
            </div>

            {/* Right side: Content with Image Icons */}
            <div className="w-full md:w-1/2 space-y-12">
              
              {/* Feature 1: Bank Loan */}
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 flex-shrink-0">
                  <img 
                    src={icon1Img} 
                    alt="Bank Loan Icon" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3 text-left">Bank Loan</h3>
                  <p className="text-gray-400 leading-relaxed font-light mb-4 text-left">
                    Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
                  </p>
                  <a href="#" className="text-orange-500 font-medium hover:underline text-sm block text-left">Learn More</a>
                </div>
              </div>

              {/* Feature 2: Banking Consultation */}
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 flex-shrink-0">
                  <img 
                    src={icon2Img} 
                    alt="Consultation Icon" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3 text-left">Banking Consulation</h3>
                  <p className="text-gray-400 leading-relaxed font-light mb-4 text-left">
                    Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                  </p>
                  <a href="#" className="text-orange-500 font-medium hover:underline text-sm block text-left">Learn More</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default FAQ;