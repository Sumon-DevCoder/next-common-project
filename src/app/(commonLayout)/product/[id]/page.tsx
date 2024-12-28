"use client";

import { useParams } from "next/navigation";
import {
  useGetProductsQuery,
  useGetSingleProductQuery,
} from "@/redux/features/product/productApi";

import RelatedProudct from "../../components/page/product/productDetails/RelatedProudct";
import ProductDetailsInfo from "../../components/page/product/productDetails/ProductDetailsInfo";
import DynamicLoader from "@/app/components/PercentageLoader";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { data: singleProudct, isLoading: singleProudctLoading } =
    useGetSingleProductQuery(id);
  const { data, isLoading: categoriesProductLoading } = useGetProductsQuery(
    singleProudct?.data?.category
  );

  if (singleProudctLoading || categoriesProductLoading) {
    return <DynamicLoader />;
  }

  const product = singleProudct?.data || {};
  const categoriesProduct = data?.data?.result || [];

  return (
    <div className="max-w-screen-xl mx-auto px-5 md:px-16 py-10">
      <ProductDetailsInfo product={product} />
      <RelatedProudct categoriesProduct={categoriesProduct} />
    </div>
  );
};

export default ProductDetailsPage;
