import React from "react";
import Banner from "./components/page/home/Banner";
import ProductPage from "./product/page";
import Services from "./components/page/home/Services";
import WhyChooseUs from "./components/page/home/WhyChooseUs";
import Testimonial from "./components/page/home/TestimonialSection";
import OfferSection from "./components/page/home/OfferSection";
import NewsletterForm from "./components/page/home/NewsLetter";

const HomePage = () => {
  return (
    <div className="dark:bg-gray-800">
      <Banner />
      <Services />
      <div className="max-w-screen-xl m-auto">
        <ProductPage />
        <OfferSection />
        <WhyChooseUs />
        <Testimonial />
      </div>
      <NewsletterForm />
    </div>
  );
};

export default HomePage;
