import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import Breadcrumb from "../../../components/breadcrumb";
import AdminLayout from "../../../layouts/admin-layout";

export default function AdminAddProductPage(props) {
  return (
    <AdminLayout>
      <div className="w-full p-4 flex flex-col">
        <Breadcrumb
          items={[
            {
              text: "Dashboard",
              icon: (
                <svg
                  className="mr-2 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
              ),
              href: "/admin",
            },
            {
              text: "Products",
              href: "/admin/products",
            },
            {
              text: "Add Product",
            },
          ]}
        />
        <div className="my-4 py-4 bg-white rounded shadow overflow-hidden">
          <ProductForm />
        </div>
      </div>
    </AdminLayout>
  );
}

function ProductForm(props) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("/placeholder_image.png");
  const [imageFile, setImageFile] = useState<File>();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      // console.log(data);
      setLoading(true);

      let imageUrl = "/placeholder_image.png";
      if (imageFile) {
        // Get S3 image upload URL
        const { url, imageUrl: s3ImageUrl } = await (
          await fetch(`/api/get-s3-image-upload-url?fileType=${imageFile.type}`)
        ).json();
        imageUrl = s3ImageUrl;

        // Upload to S3
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: imageFile,
        });
      }

      // Add product
      await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          imageUrl,
        }),
      });

      setLoading(false);
      setError(false);
      setSuccess(true);
      reset();
    } catch (e) {
      console.error(e);
      setLoading(false);
      setSuccess(false);
      setError(true);
    }
  };

  const updateImagePreview = (file: File) => {
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setImageUrl(e.target.result.toString());
    });

    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles);
    if (acceptedFiles[0].size > 1048576 * 3) {
      // 3MB limit
      alert("File is too big! Upload a smaller image.");
      return;
    }
    setImageFile(acceptedFiles[0]);
    updateImagePreview(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg,image/png",
  });

  return (
    <form
      className="flex flex-col px-4 space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {success && (
        <div className="px-4 py-2 block w-full text-base font-medium text-left text-green-900 bg-green-100 rounded whitespace-nowrap text-ellipsis overflow-hidden">
          <span>Product has been added!</span>
        </div>
      )}
      {error && (
        <div className="px-4 py-2 block w-full text-base font-medium text-left text-green-900 bg-green-100 rounded whitespace-nowrap text-ellipsis overflow-hidden">
          <span>Server error! Please try again later.</span>
        </div>
      )}
      <figure
        className="p-2 grow w-full flex flex-col lg:flex-row justify-center items-center lg:justify-start space-y-2 space-x-0 lg:space-y-0 lg:space-x-2 border-dotted border-4 border-slate-200 rounded-lg focus:outline-none"
        {...getRootProps()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt="New Product Image"
          className="w-full max-w-xs object-cover aspect-square rounded overflow-hidden"
        />
        <label className="text-slate-500 text-sm">
          Select an image / Drop an image
        </label>
      </figure>
      <input type="file" id="image" className="sr-only" {...getInputProps()} />
      <div>
        <label className="block text-slate-500 text-sm" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          autoFocus
          {...register("name", {
            required: "Name is required",
            maxLength: {
              value: 30,
              message: "Maximum 30 characters",
            },
          })}
          className="relative w-full p-2 mt-2 text-left text-gray-900 sm:text-sm ring-2 ring-opacity-50 ring-gray-200 placeholder-gray-500 rounded-sm cursor-default focus:outline-none focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-3 md:space-y-0">
        <div className="grow">
          <label className="block text-slate-500 text-sm" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            type="number"
            name="price"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
            className="relative w-full p-2 mt-2 text-left text-gray-900 sm:text-sm ring-2 ring-opacity-50 ring-gray-200 placeholder-gray-500 rounded-sm cursor-default focus:outline-none focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
          />
          {errors.price && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.price.message}
            </p>
          )}
        </div>
        <div className="grow">
          <label className="block text-slate-500 text-sm" htmlFor="tags">
            Tags
          </label>
          <input
            id="tags"
            type="text"
            name="tags"
            {...register("tags", {})}
            className="relative w-full p-2 mt-2 text-left text-gray-900 sm:text-sm ring-2 ring-opacity-50 ring-gray-200 placeholder-gray-500 rounded-sm cursor-default focus:outline-none focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
          />
          {errors.tags && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.tags.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="stock"
            aria-describedby="stock"
            type="checkbox"
            className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-[#5B9270]"
            {...register("stock", {})}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="stock" className="font-medium text-slate-500 text-sm">
            In Stock
          </label>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`!mt-8 relative w-full p-3 flex justify-center uppercase tracking-widest text-sm text-white bg-[#5B9270] hover:bg-[#79ad8d] rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] focus:bg-[#79ad8d] transition duration-200${
          loading
            ? " bg-gray-300 hover:bg-gray-300 focus:bg-gray-300 cursor-not-allowed"
            : ""
        }`}
      >
        {loading && (
          <svg
            className="animate-spin mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        Add Product
      </button>
    </form>
  );
}
