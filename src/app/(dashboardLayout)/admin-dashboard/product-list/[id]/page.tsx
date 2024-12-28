"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  useGetSingleProductQuery,
  useUpdateProductByIdMutation,
} from "../../../../../redux/features/product/productApi";

const UpdateProduct = () => {
  const productId = useParams();
  const { data: productData } = useGetSingleProductQuery(productId?.id);
  const product = productData?.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FieldValues>();

  const [updateProductById] = useUpdateProductByIdMutation();
  const router = useRouter();

  // Image upload function for multiple files
  const uploadImagesToImgBB = async (files: FileList): Promise<string[]> => {
    const urls: string[] = [];
    const url = `https://api.imgbb.com/1/upload?key=${"9b72c2e7f55726fd9a28bfb8bfedc08b"}`;

    // Upload each file one by one
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("image", files[i]);

      try {
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (data.success) {
          urls.push(data.data.url); // Add the uploaded image URL to the array
        } else {
          throw new Error("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    return urls;
  };

  // Set default values when product data is loaded
  useEffect(() => {
    if (product) {
      setValue("productName", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("stockQuantity", product.stockQuantity);
      setValue("category", product.category);
      setValue("ageValue", product.age?.value);
      setValue("ageUnit", product.age?.unit);
      setValue("color", product.color);
      setValue("sizeValue", product.size?.value);
      setValue("sizeUnit", product.size?.unit);
      setValue("img", product.img || []); // Array of images
    }
  }, [product, setValue]);

  // onSubmit function for updating product
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating...");

    try {
      let imgUrls = product?.img || []; // Default to existing images if no new images are uploaded

      // If new images are uploaded, handle the upload process
      if (data.img && data.img.length > 0) {
        const imgFiles = data.img as FileList; // Ensure this is a FileList
        imgUrls = await uploadImagesToImgBB(imgFiles);
        if (!imgUrls.length) {
          throw new Error("Image upload failed");
        }
      }

      // Construct updated product information
      const productInfo = {
        name: data.productName,
        description: data.description,
        price: Number(data.price),
        stockQuantity: Number(data.stockQuantity),
        category: data.category,
        img: imgUrls, // Use array of image URLs
        age: {
          value: Number(data.ageValue),
          unit: data.ageUnit,
        },
        color: data.color,
        size: {
          value: Number(data.sizeValue),
          unit: data.sizeUnit,
        },
      };

      // Update product by ID
      const res = await updateProductById({
        id: productId?.id,
        productInfo,
      }).unwrap();

      if (res) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        reset();
        router.push("/admin-dashboard/product-list");
      }
    } catch (err) {
      const serverMsgErr = (err as Error)?.message || "Something went wrong";
      toast.error(serverMsgErr, { id: toastId, duration: 3000 });
    }
  };

  return (
    <div className="mx-auto w-full bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-indigo-700 text-center mb-4">
        Update Product
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Product Name */}
        <div className="mb-5">
          <label
            htmlFor="product-name"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Product Name
          </label>
          <input
            type="text"
            {...register("productName", {
              required: "Product Name is required",
            })}
            id="product-name"
            placeholder="Product Name"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.productName && (
            <p className="text-red-500">
              {errors.productName.message as string}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="mb-5">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
              maxLength: {
                value: 500,
                message: "Description cannot exceed 500 characters",
              },
            })}
            id="description"
            placeholder="Product Description"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500">
              {errors.description.message as string}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="mb-5">
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Price
          </label>
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be at least 0" },
            })}
            id="price"
            placeholder="Enter price"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message as string}</p>
          )}
        </div>

        {/* Stock Quantity */}
        <div className="mb-5">
          <label
            htmlFor="stock-quantity"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Stock Quantity
          </label>
          <input
            type="number"
            {...register("stockQuantity", {
              required: "Stock Quantity is required",
              min: { value: 0, message: "Stock Quantity cannot be negative" },
            })}
            id="stock-quantity"
            placeholder="Enter stock quantity"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.stockQuantity && (
            <p className="text-red-500">
              {errors.stockQuantity.message as string}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="mb-5">
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            id="category"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          >
            <option value="">Select a category</option>
            <option value="Fish">Fish</option>
            <option value="Duck">Duck</option>
            <option value="Hen">Hen</option>
            <option value="Cow">Cow</option>
            <option value="Bird">Bird</option>
          </select>
          {errors.category && (
            <p className="text-red-500">{errors.category.message as string}</p>
          )}
        </div>

        {/* Age */}
        <div className="mb-5">
          <label
            htmlFor="age"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Age
          </label>
          <div className="flex space-x-4">
            <input
              type="number"
              {...register("ageValue", {
                required: "Age value is required",
              })}
              id="ageValue"
              placeholder="Age"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
            />
            <select
              {...register("ageUnit", { required: "Age unit is required" })}
              id="ageUnit"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
          {errors.ageValue && (
            <p className="text-red-500">{errors.ageValue.message as string}</p>
          )}
        </div>

        {/* Color */}
        <div className="mb-5">
          <label
            htmlFor="color"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Color
          </label>
          <input
            type="text"
            {...register("color", {
              required: "Color is required",
            })}
            id="color"
            placeholder="Enter color"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.color && (
            <p className="text-red-500">{errors.color.message as string}</p>
          )}
        </div>

        {/* Size */}
        <div className="mb-5">
          <label
            htmlFor="size"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Size
          </label>
          <div className="flex space-x-4">
            <input
              type="number"
              {...register("sizeValue", {
                required: "Size value is required",
              })}
              id="sizeValue"
              placeholder="Size"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
            />
            <select
              {...register("sizeUnit", { required: "Size unit is required" })}
              id="sizeUnit"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
            >
              <option value="kg">kg</option>
              <option value="gm">gm</option>
            </select>
          </div>
          {errors.sizeValue && (
            <p className="text-red-500">{errors.sizeValue.message as string}</p>
          )}
        </div>

        {/* Images */}
        <div className="mb-5">
          <label
            htmlFor="img"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            {...register("img", {})}
            id="img"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.img && (
            <p className="text-red-500">{errors.img.message as string}</p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-700 py-3 px-4 text-white text-sm font-medium focus:outline-none"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
