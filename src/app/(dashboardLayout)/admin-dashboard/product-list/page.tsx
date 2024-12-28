/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TProduct } from "@/app/(commonLayout)/product/page";
import {
  useDeleteProductByIdMutation,
  useGetProductsQuery,
} from "@/redux/features/product/productApi";
import { TError } from "@/types/gobal";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useState } from "react";
import DynamicLoader from "@/app/components/PercentageLoader";

const ProductList = () => {
  const { data, isLoading } = useGetProductsQuery(null);
  const [deleteProduct] = useDeleteProductByIdMutation();
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return <DynamicLoader />;
  }

  const products = data?.data?.result || [];

  const handleProductDelete = async (
    productId: string,
    productName: string
  ) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: `Are you sure you want to delete the product "${productName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting the product...");

        try {
          const res = await deleteProduct(productId).unwrap();

          if (res && res.message) {
            toast.success(res.message, { id: toastId, duration: 3000 });
          } else {
            toast.error("Unexpected response received.", {
              id: toastId,
              duration: 3000,
            });
          }
        } catch (err) {
          const serverMsgErr =
            (err as TError)?.data?.message ||
            "An error occurred while deleting the product. Please try again.";

          toast.error(serverMsgErr, {
            id: toastId,
            duration: 3000,
          });
        }
      }
    });
  };

  const filteredProducts = products.filter((product: { name: string }) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      {/* Header with search and add product button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
          Product List
        </h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <Link href="/admin-dashboard/create-product">
            <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-md hover:bg-gradient-to-l hover:from-purple-500 hover:to-indigo-500 flex items-center space-x-2">
              <span>Add Product</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Product List Table */}
      <div className="overflow-x-auto shadow-md rounded-lg bg-white dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Product Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Stock Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {filteredProducts?.map((product: TProduct) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Image
                    className="rounded"
                    src={product?.img[0]}
                    alt={product.name}
                    height={30}
                    width={30}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    ${product.price}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {product.stockQuantity}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {product.category}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={`/admin-dashboard/product-list/${product?._id}`}>
                    <button className="btn btn-sm px-3 py-2 text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md hover:bg-gradient-to-l hover:from-purple-500 hover:to-indigo-500">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() =>
                      handleProductDelete(
                        product._id as string,
                        product.name as string
                      )
                    }
                    className="btn btn-sm ml-2 px-3 py-2 text-white bg-gradient-to-r from-red-500 to-red-700 rounded-md hover:bg-gradient-to-l hover:from-red-700 hover:to-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing 1 to 10 of {filteredProducts.length} products
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 rounded-md text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            &lt;
          </button>
          <button className="px-3 py-2 rounded-md text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
