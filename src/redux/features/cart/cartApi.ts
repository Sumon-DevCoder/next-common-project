import { baseApi } from "../../api/baseApi";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCart: builder.query({
      query: () => ({
        method: "GET",
        url: `/carts`,
      }),
      providesTags: ["carts"],
    }),
    getSingleCart: builder.query({
      query: (cartId) => {
        console.log("api hitting", cartId);
        return {
          method: "GET",
          url: `/carts/${cartId}`,
        };
      },
    }),
    getCartByUser: builder.query({
      query: (email) => {
        console.log("api hitting", email);
        return {
          method: "GET",
          url: `/carts/user/${email}`,
        };
      },
    }),
    createCart: builder.mutation({
      query: (cartData) => ({
        method: "POST",
        url: `/carts`,
        body: cartData,
      }),
      invalidatesTags: ["carts"],
    }),
    deleteCartById: builder.mutation({
      query: (cartId) => ({
        method: "DELETE",
        url: `/carts/${cartId}`,
      }),
      invalidatesTags: ["carts"],
    }),
    updateCartById: builder.mutation({
      query: ({ id, status }) => {
        console.log("cart api hitting", { id, status });
        return {
          method: "PUT",
          url: `/carts/${id}`,
          body: status,
        };
      },
      invalidatesTags: ["carts"],
    }),
  }),
});

export const {
  useGetAllCartQuery,
  useGetCartByUserQuery,
  useGetSingleCartQuery,
  useCreateCartMutation,
  useDeleteCartByIdMutation,
  useUpdateCartByIdMutation,
} = cartApi;
