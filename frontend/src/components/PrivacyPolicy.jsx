import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="px-4 sm:px-8 md:px-16 py-10 text-gray-700 leading-relaxed">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Privacy Policy
      </h1>

      <p className="mb-4">
        <strong>ShopGenie</strong> is dedicated to protecting your privacy. Our
        policy recognizes the importance of safeguarding your personal
        information, explaining what personal information constitutes, how we
        use it, who has access to your data, and your rights regarding your
        personal information. Please note that <strong>ShopGenie</strong> is not
        responsible for any personal information you submit to third parties via
        our website. Your use of <strong>shopgenie.com</strong> signifies
        agreement with our privacy policy and terms of use.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Use of Information</h2>
      <p className="mb-4">
        ShopGenie.com collects personal information during account creation or
        order placement. By registering, you consent to the collection of your
        personal data. To fulfill orders, we require details such as your name,
        email, phone number, delivery addresses, and billing address(es) for
        credit/debit cards. Card details remain confidential and are used solely
        for order processing. We may also obtain information during
        authentication or identity checks, including your telephone number,
        which may be shared with our courier for delivery services.
      </p>
      <p className="mb-4">
        Your privacy is a priority, and your personal information is secured
        with SSL encryption to ensure secure transmission through an encrypted
        link. Additionally, non-personal data obtained through temporary and
        permanent cookies enhances your user experience. Permanent cookies are
        stored on your device for no longer than 24 months and can be erased
        using your browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Information Collection</h2>
      <p className="mb-4">
        ShopGenie may use your personal data for the following purposes:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>To create your personal account on shopgenie.com</li>
        <li>To process and deliver your orders</li>
        <li>To provide order updates and delivery notifications</li>
        <li>To send marketing offers, newsletters, and catalogs</li>
        <li>To respond to your queries and feedback</li>
        <li>To notify winners of promotions</li>
        <li>To manage your account and perform credit checks</li>
        <li>To disclose your data to fraud prevention agencies</li>
        <li>To validate your legal age for online shopping</li>
      </ul>

      <p className="mb-4">
        Your data is retained only as long as necessary to fulfill services or
        as required by law. After this, personal data is deleted unless a legal
        requirement exists to retain it. ShopGenie does not sell your
        information to third-party marketing companies.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Marketing Updates</h2>
      <p className="mb-4">
        We communicate with subscribed users via email for notifications, order
        updates, and promotions. You can opt out of promotional messages anytime
        by clicking the "unsubscribe" link in our emails or contacting us at{" "}
        <a
          href="mailto:support@shopgenie.com"
          className="text-blue-600 hover:underline"
        >
          support@shopgenie.com
        </a>
        .
      </p>
      <p className="mb-4">
        Mobile users who provide their number consent to receiving calls or
        texts. Standard carrier rates may apply. To stop receiving such
        messages, contact us via the same email address above.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Your Rights</h2>
      <p className="mb-4">
        You have the right to request information about the personal data we
        hold about you. If your data is incorrect or incomplete, you can request
        corrections or removal by contacting{" "}
        <a
          href="mailto:support@shopgenie.com"
          className="text-blue-600 hover:underline"
        >
          support@shopgenie.com
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Facebook Application Privacy Statement
      </h2>
      <p className="mb-4">
        This privacy statement applies to the treatment of personally
        identifiable information submitted by, or obtained from, you in
        connection with the associated application. The application is provided
        by ShopGenie Retail. By using the application, you accept the practices
        and policies outlined in this privacy statement.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Changes to This Privacy Statement
      </h2>
      <p className="mb-4">
        ShopGenie may amend this privacy statement periodically. Any changes
        will be communicated via website announcements or email notifications.
        For any questions or concerns regarding privacy, contact us at{" "}
        <a
          href="mailto:support@shopgenie.com"
          className="text-blue-600 hover:underline"
        >
          support@shopgenie.com
        </a>
        .
      </p>

      <p className="mt-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ShopGenie. All rights reserved.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
