import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Correct import
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "@/app/components/ProductCard";
import { TProduct } from "@/types/gobal";

const RelatedProduct = ({
  categoriesProduct,
}: {
  categoriesProduct: TProduct[];
}) => {
  return (
    <div className="w-full">
      {/* Heading for Related Products */}
      <h2 className="text-2xl font-bold divider mb-4 text-center text-gray-800 dark:text-gray-200">
        Recommended for You
      </h2>

      {/* Display message when no products match */}
      {categoriesProduct?.length === 0 ? (
        <p className="text-center text-red-500 font-semibold">
          Product Not Available
        </p>
      ) : (
        <div className="relative">
          <Swiper
            modules={[Navigation]} // Correct usage of the Navigation module
            slidesPerView={1}
            spaceBetween={20}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {categoriesProduct?.map((product: TProduct) => (
              <SwiperSlide key={product?._id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation buttons */}
          <button className="swiper-button-prev absolute top-1/2 left-2 transform -translate-y-1/2 z-10  text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-600 transition"></button>
          <button className="swiper-button-next absolute top-1/2 right-2 transform -translate-y-1/2 z-10 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-600 transition"></button>
        </div>
      )}
    </div>
  );
};

export default RelatedProduct;
