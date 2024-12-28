// pages/terms-and-conditions.tsx
import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-4xl font-semibold mb-6 text-center text-green-600 animate__animated animate__fadeIn">
          Terms and Conditions
        </h1>
        <p className="text-lg text-gray-700 mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Welcome to Animal Bazaar. By using our website, you agree to these
          terms and conditions. Please read them carefully.
        </p>

        <div className="space-y-6">
          <section className="animate__animated animate__fadeIn animate__delay-2s">
            <h2 className="text-2xl font-semibold text-green-500">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700">
              By accessing or using this website, you agree to comply with and
              be bound by these terms. If you do not agree to these terms,
              please do not use the website.
            </p>
          </section>

          <section className="animate__animated animate__fadeIn animate__delay-3s">
            <h2 className="text-2xl font-semibold text-green-500">
              2. Use of Service
            </h2>
            <p className="text-gray-700">
              We grant you a non-exclusive, non-transferable license to use this
              website. You agree not to misuse or disrupt the services provided.
            </p>
          </section>

          <section className="animate__animated animate__fadeIn animate__delay-4s">
            <h2 className="text-2xl font-semibold text-green-500">
              3. User Responsibilities
            </h2>
            <p className="text-gray-700">
              You are responsible for maintaining the confidentiality of your
              account details and for all activities under your account.
            </p>
          </section>

          <section className="animate__animated animate__fadeIn animate__delay-5s">
            <h2 className="text-2xl font-semibold text-green-500">
              4. Prohibited Activities
            </h2>
            <p className="text-gray-700">
              You may not engage in any unlawful activities on this site, such
              as violating intellectual property rights or transmitting harmful
              software.
            </p>
          </section>

          <section className="animate__animated animate__fadeIn animate__delay-6s">
            <h2 className="text-2xl font-semibold text-green-500">
              5. Limitation of Liability
            </h2>
            <p className="text-gray-700">
              We are not liable for any indirect or consequential damages
              resulting from the use or inability to use our website.
            </p>
          </section>

          <section className="animate__animated animate__fadeIn animate__delay-7s">
            <h2 className="text-2xl font-semibold text-green-500">
              6. Changes to the Terms
            </h2>
            <p className="text-gray-700">
              We reserve the right to update these Terms and Conditions at any
              time. Please review them regularly for any changes.
            </p>
          </section>

          <section className="animate__animated animate__fadeIn animate__delay-8s">
            <h2 className="text-2xl font-semibold text-green-500">
              7. Contact Us
            </h2>
            <p className="text-gray-700">
              If you have any questions, feel free to reach out to us at{" "}
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

export default TermsAndConditions;
