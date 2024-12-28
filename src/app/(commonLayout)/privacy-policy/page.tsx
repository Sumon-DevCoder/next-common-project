// pages/privacy-policy.tsx
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-6 text-black max-w-4xl">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 animate__animated animate__fadeIn">
        <h1 className="text-4xl font-semibold mb-6 text-center text-green-600 animate__animated animate__fadeIn">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-700 mb-6 animate__animated animate__fadeIn animate__delay-1s">
          This Privacy Policy explains how we collect, use, and protect your
          personal information when you use our website.
        </p>

        <div className="space-y-6">
          {/* Information Collection Section */}
          <section className="animate__animated animate__fadeIn animate__delay-2s">
            <h2 className="text-2xl font-semibold text-green-500">
              1. Information Collection
            </h2>
            <p className="text-gray-700">
              We collect personal information when you interact with our
              website. This includes your name, email address, and other
              necessary details.
            </p>
          </section>

          {/* Use of Information Section */}
          <section className="animate__animated animate__fadeIn animate__delay-3s">
            <h2 className="text-2xl font-semibold text-green-500">
              2. Use of Information
            </h2>
            <p className="text-gray-700">
              The information we collect is used to improve your experience on
              our website and to process transactions.
            </p>
          </section>

          {/* Data Protection Section */}
          <section className="animate__animated animate__fadeIn animate__delay-4s">
            <h2 className="text-2xl font-semibold text-green-500">
              3. Data Protection
            </h2>
            <p className="text-gray-700">
              We take necessary steps to protect your personal data and ensure
              it is securely stored and transmitted.
            </p>
          </section>

          {/* Sharing Information Section */}
          <section className="animate__animated animate__fadeIn animate__delay-5s">
            <h2 className="text-2xl font-semibold text-green-500">
              4. Sharing Information
            </h2>
            <p className="text-gray-700">
              We do not share your personal information with third parties
              unless required by law or necessary for service provision.
            </p>
          </section>

          {/* Changes to the Policy Section */}
          <section className="animate__animated animate__fadeIn animate__delay-6s">
            <h2 className="text-2xl font-semibold text-green-500">
              5. Changes to the Policy
            </h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. Any changes
              will be reflected on this page with an updated date.
            </p>
          </section>

          {/* Contact Us Section */}
          <section className="animate__animated animate__fadeIn animate__delay-7s">
            <h2 className="text-2xl font-semibold text-green-500">
              6. Contact Us
            </h2>
            <p className="text-gray-700">
              If you have any questions about our Privacy Policy, feel free to
              contact us at{" "}
              <a
                href="mailto:support@example.com"
                className="text-blue-500 hover:underline"
              >
                support@example.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
