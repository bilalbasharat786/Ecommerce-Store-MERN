import React from "react";

const ReturnRefundPolicy = () => {
  return (
    <div className="px-4 sm:px-8 md:px-16 py-10 text-gray-700 leading-relaxed">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Return & Refund Policy</h1>

      <p className="mb-4">
        This Return & Refund Policy sets out the rules and procedures for returns, exchanges,
        and refunds at Jamal Collection. We aim to make returns straightforward while protecting both
        customers and our business from misuse. By placing an order, you agree to the following
        policies and processes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">1. Eligibility for Returns</h2>
      <p className="mb-4">
        Items are eligible for return if all of the following apply:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Return request is made within <strong>7 calendar days</strong> of delivery.</li>
        <li>Product is unused, unwashed, and in original packaging (tags attached).</li>
        <li>Product is delivered in a resaleable condition.</li>
      </ul>
      <p className="mb-4">
        Non-returnable items: perishable goods, custom-made or personalized items, and products
        marked "Final Sale" or "Non-returnable" on the product page.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">2. Return Process</h2>
      <ol className="list-decimal list-inside mb-4 space-y-2">
        <li>Contact our support team at <a href="mailto:officialjamalcollection@gmail.com" className="text-blue-600 hover:underline">officialjamalcollection@gmail.com</a> or call 03105087313 to initiate a return.</li>
        <li>Provide your order ID, reason for return, product details (size, color), and photos if the item is damaged or incorrect.</li>
        <li>Our team will verify your eligibility and provide return instructions and RMA (return authorization) if applicable.</li>
        <li>Ship the item back using a tracked courier. Keep the tracking number until the return is complete.</li>
      </ol>

      <h2 className="text-xl font-semibold mt-6 mb-3">3. Return Shipping Costs</h2>
      <p className="mb-4">
        Return shipping costs are the responsibility of the customer except when:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>The product is defective or damaged on arrival.</li>
        <li>We shipped the wrong product.</li>
      </ul>
      <p className="mb-4">
        For eligible defective or incorrect items, Jamal Collection will reimburse return shipping
        charges upon successful verification.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">4. Refunds</h2>
      <p className="mb-4">
        Once a returned item is received and inspected, refunds will be processed as follows:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Refunds to the original payment method typically take 7–14 business days depending on the bank or payment provider.</li>
        <li>If the original payment method is unavailable, we may issue store credit or process a refund by alternate means as agreed.</li>
        <li>Shipping charges (if paid by customer) are non-refundable unless the item was returned due to our error.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">5. Exchanges</h2>
      <p className="mb-4">
        If you want an exchange (for example size or color), please contact support with your
        request. Exchanges are subject to product availability. In case the requested item is
        unavailable, store credit or refund will be offered as per standard policy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">6. Damaged or Faulty Items</h2>
      <p className="mb-4">
        Inspect all items on delivery. For damaged or faulty items:
      </p>
      <ol className="list-decimal list-inside mb-4 space-y-2">
        <li>Do not accept the package if damage is extensive and note it on the courier receipt.</li>
        <li>Take photos of the packaging and the damaged product immediately.</li>
        <li>Contact support within 48 hours with photos and order details to start a damage claim.</li>
      </ol>

      <h2 className="text-xl font-semibold mt-6 mb-3">7. Return Exceptions & Restocking Fees</h2>
      <p className="mb-4">
        Items that are not returned in original condition may be subject to restocking fees.
        We reserve the right to refuse returns that do not meet policy requirements.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">8. Refunds for Promotions</h2>
      <p className="mb-4">
        If a refund is issued for an order that used promotional discounts, refunds will reflect
        any discounts applied at the time of purchase. Loyalty points or promotional credits
        used may be adjusted according to the promotion terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">9. Fraud & Abuse Prevention</h2>
      <p className="mb-4">
        We reserve the right to refuse returns or refunds where fraud or abuse is suspected,
        including multiple returns without valid reason, manipulated purchase records,
        or suspicious activity associated with an order.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">10. Contact & Support</h2>
      <p className="mb-4">
        To request a return, start an exchange or report a damaged product, contact:
      </p>
      <ul className="list-none space-y-1 mb-6">
        <li>📧 <a href="mailto:officialjamalcollection@gmail.com" className="text-blue-600 hover:underline">officialjamalcollection@gmail.com</a></li>
        <li>📞 Phone: 03105087313</li>
      </ul>

      <p className="mt-8 text-sm text-center text-gray-600">
        Jamal Collection processes returns and refunds in accordance with these terms. We may
        update this policy periodically; significant changes will be communicated on our website.
      </p>
    </div>
  );
};

export default ReturnRefundPolicy;
