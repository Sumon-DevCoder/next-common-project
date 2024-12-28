/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useGetCartByUserQuery,
  useDeleteCartByIdMutation,
} from "@/redux/features/cart/cartApi"; // Assuming you have a cart API
import useCurrentUserInfo from "../../../hooks/useCurrentUserInfo";
import { TCart, TError } from "@/types/gobal";
import useCurrentUserData from "@/hooks/useCurrentUserInfoData";
import { useCreateorderMutation } from "@/redux/features/order/orderApi";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { useEffect } from "react";

const MyCart = () => {
  const { email } = useCurrentUserInfo();
  const { user } = useCurrentUserData();
  const { data, refetch } = useGetCartByUserQuery(email);
  const [createOrder] = useCreateorderMutation();
  const [deleteCartById] = useDeleteCartByIdMutation();
  const cartItems = data?.data || [];

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleOrder = async () => {
    const orderInfo = {
      user,
      products: cartItems,
    };

    try {
      const res = await createOrder(orderInfo).unwrap();
      if (res.success) {
        console.log(res);
        window.location.href = res.data.payment_url;
      } else {
        console.error("Order creation failed:", res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = (itemId: string) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: `Are you sure you want to delete ?`,
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
          const res = await deleteCartById(itemId).unwrap();

          if (res && res.message) {
            toast.success(res.message, { id: toastId, duration: 3000 });
            refetch();
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

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total: any, item: { price: any }) => total + item.price,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    // Add logic for tax, shipping, or discounts if applicable
    const shippingCost = 20; // Example shipping cost
    const total = subtotal + shippingCost;
    return total;
  };

  return (
    <div className="p-5 space-y-6 md:space-y-0 flex justify-center items-center lg:items-start  flex-col lg:justify-between lg:px-48  lg:flex-row gap-y-5 justify-items-center md:space-x-6">
      {/* Left side: Cart Items */}
      <div className="flex-1">
        <h2 className="text-center text-black mb-4 text-xl font-bold">
          My Cart
        </h2>
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cartItems?.map((cartItem: TCart) => (
              <tr key={cartItem?._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {cartItem.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${cartItem.price}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-red-500 hover:text-red-700 btn btn-sm"
                    onClick={() => handleDeleteItem(cartItem._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right side: Order Summary */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Order Summary
        </h3>
        <div className="mb-4">
          <p className="text-gray-600">
            Subtotal: ${calculateSubtotal().toFixed(2)}
          </p>
          <p className="text-gray-600">Shipping: $20.00</p>
        </div>
        <div className="border-t border-gray-300 my-4"></div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-800">
            Total: ${calculateTotal().toFixed(2)}
          </p>
        </div>
        <button
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          onClick={handleOrder}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default MyCart;
