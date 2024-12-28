"use client";

import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateProduct = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [CreateProduct] = useCreateProductMutation();

  // Image upload function
  const uploadImageToImgBB = async (file: File) => {
    const url = `https://api.imgbb.com/1/upload?key=${"9b72c2e7f55726fd9a28bfb8bfedc08b"}`;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        return data.data.url;
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // onSubmit function
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");

    try {
      // Upload the multiple images
      const imgUrls: string[] = [];
      for (const imgFile of data.img) {
        const imgUrl = await uploadImageToImgBB(imgFile);
        if (imgUrl) {
          imgUrls.push(imgUrl);
        } else {
          throw new Error("Image upload failed");
        }
      }

      console.log("imgUrl", imgUrls);

      const productInfo = {
        name: data.productName,
        description: data.description,
        price: Number(data.price),
        stockQuantity: Number(data.stockQuantity),
        category: data.category,
        img: imgUrls, // Multiple image URLs
        age: {
          value: Number(data.ageValue),
          unit: data.ageUnit,
        },
        size: {
          value: Number(data.sizeValue),
          unit: data.sizeUnit,
        },
        color: data.color,
      };

      console.log(productInfo);

      // Send data to the database
      const res = await CreateProduct(productInfo).unwrap();

      if (res) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        reset();
        router.push("/admin-dashboard/product-list");
      }

      console.log(res);
    } catch (err) {
      const serverMsgErr = (err as Error)?.message || "Something went wrong";

      toast.error(serverMsgErr, { id: toastId, duration: 3000 });
    }
  };

  // Validation for minimum 1 image upload
  const validateFiles = (files: FileList): Promise<string | true> => {
    return new Promise((resolve) => {
      if (files.length < 1) {
        resolve("At least 1 image is required");
      }
      resolve(true);
    });
  };

  return (
    <div className="mx-auto w-full bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-indigo-700 text-center mb-4">
        Create a Product
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

        <div className="mb-5">
          <label
            htmlFor="color"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Color Name
          </label>
          <input
            type="text"
            {...register("color", {
              required: "Color Name is required",
            })}
            id="color"
            placeholder="Color Name"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.colorName && (
            <p className="text-red-500">{errors.colorName.message as string}</p>
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
            <option value="fish">Fish</option>
            <option value="duck">Duck</option>
            <option value="hen">Hen</option>
            <option value="cow">Cow</option>
            <option value="bird">Bird</option>
          </select>
          {errors.category && (
            <p className="text-red-500">{errors.category.message as string}</p>
          )}
        </div>

        {/* Product Image */}
        <div className="mb-5">
          <label
            htmlFor="product-image"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Product Image
          </label>
          <input
            type="file"
            {...register("img", {
              required: "At least 1 image is required",
              validate: validateFiles,
            })}
            id="product-image"
            accept="image/*"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
            multiple
          />
          <small className="text-gray-500">Upload at least one image</small>
          {errors.img && (
            <p className="text-red-500">{errors.img.message as string}</p>
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
          <input
            type="number"
            {...register("ageValue", {
              required: "Age value is required",
              min: { value: 0, message: "Age must be positive" },
            })}
            id="age"
            placeholder="Age value"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          <select
            {...register("ageUnit", { required: "Age unit is required" })}
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          >
            <option value="">Select unit</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>

        {/* Size */}
        <div className="mb-5">
          <label
            htmlFor="size"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Size
          </label>
          <input
            type="number"
            {...register("sizeValue", {
              required: "Size value is required",
              min: { value: 0, message: "Size must be positive" },
            })}
            id="size"
            placeholder="Size value"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          <select
            {...register("sizeUnit", { required: "Size unit is required" })}
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          >
            <option value="">Select unit</option>
            <option value="kg">Kg</option>
            <option value="gm">Grams</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
