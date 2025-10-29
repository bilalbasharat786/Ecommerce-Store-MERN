import React from "react";

const TermsConditions = () => {
  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-40 py-10 bg-white text-gray-800">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Terms & Conditions
      </h1>

      <p className="mb-4">
        Welcome to <strong>Shanza Yousafzai</strong>. By accessing our website, social media pages,
        or making a purchase, you agree to the terms and conditions outlined below. Please read
        them carefully before proceeding.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Introduction</h2>
      <p className="mb-4">
        These Terms and Conditions govern your use of the official website and online store of{" "}
        <strong>Shanza Yousafzai</strong>. By accessing or using our services, you agree to be
        legally bound by these terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. General Terms</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>All products are subject to availability.</li>
        <li>Prices are subject to change without prior notice.</li>
        <li>We reserve the right to refuse service to anyone for any reason at any time.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Orders and Payments</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Orders can be placed only through our official website or verified social media channels.</li>
        <li>Payments must be completed in full at the time of order placement.</li>
        <li>
          Accepted payment methods are mentioned on our website. We are not responsible for payment
          failures due to technical errors or insufficient funds.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Shipping and Delivery</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Shipping and delivery times may vary depending on your location.</li>
        <li>We are not responsible for delays caused by unforeseen circumstances.</li>
        <li>Customers must provide accurate delivery details to ensure successful delivery.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Return and Exchange Policy</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>
          Returns and exchanges are accepted within <strong>7 days</strong> of delivery for unused,
          unwashed, and original packaged items.
        </li>
        <li>Customized or sale items are not eligible for return or exchange.</li>
        <li>Customers must bear the return shipping costs unless the item is defective or incorrect.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Intellectual Property</h2>
      <p className="mb-4">
        All product designs, brand logos, images, and content on{" "}
        <strong>shanzayousafzai.com</strong> are the exclusive intellectual property of{" "}
        <strong>Shanza Yousafzai</strong> and may not be reproduced, distributed, or modified
        without written permission.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Privacy</h2>
      <p className="mb-4">
        Customer information is collected and handled in accordance with our{" "}
        <a href="/privacy-policy" className="text-blue-600 hover:underline">
          Privacy Policy
        </a>
        . Your data will not be shared with third parties without your consent.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes to Terms and Conditions</h2>
      <p className="mb-4">
        <strong>Shanza Yousafzai</strong> reserves the right to modify or update these Terms and
        Conditions at any time without prior notice. Continued use of our website signifies
        acceptance of the updated terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact Information</h2>
      <p className="mb-4">
        For any questions, feedback, or concerns, please contact our support team:
      </p>
      <ul className="list-none space-y-1">
        <li>
          📧 Email:{" "}
          <a
            href="mailto:support@shanzayousafzai.com"
            className="text-blue-600 hover:underline"
          >
            support@shanzayousafzai.com
          </a>
        </li>
        <li>📞 Phone: 03105087313</li>
      </ul>

      <p className="mt-8 text-sm text-center text-gray-600">
        By purchasing from <strong>Shanza Yousafzai</strong>, you acknowledge that you have read,
        understood, and agreed to these Terms & Conditions.
      </p>
    </div>
  );
};

export default TermsConditions;
