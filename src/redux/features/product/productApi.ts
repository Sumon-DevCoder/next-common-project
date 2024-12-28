import { baseApi } from "../../api/baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (category: string | null) => {
        if (category === null) {
          return {
            method: "GET",
            url: "/products",
          };
        }
        return {
          method: "GET",
          url: `/products?category=${category}`,
        };
      },
      providesTags: ["products"],
    }),
    getSingleProduct: builder.query({
      query: (productId) => {
        console.log("product get api hitting", productId);
        return {
          method: "GET",
          url: `/products/${productId}`,
        };
      },
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        method: "POST",
        url: `/products`,
        body: productData,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProductById: builder.mutation({
      query: (productId) => ({
        method: "DELETE",
        url: `/products/${productId}`,
      }),
      invalidatesTags: ["products"],
    }),
    updateProductById: builder.mutation({
      query: ({ id, productInfo }) => {
        console.log("product api hitting", { id, productInfo });
        return {
          method: "PUT",
          url: `/products/${id}`,
          body: productInfo,
        };
      },
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useDeleteProductByIdMutation,
  useUpdateProductByIdMutation,
} = productApi;
