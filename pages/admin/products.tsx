import Image from "next/image";
import { useCallback, useEffect, useRef, useState, Fragment } from "react";
import useSWR from "swr";
import { useDropzone } from "react-dropzone";

import { Transition, Dialog } from "@headlessui/react";

import Dashboard from "../../components/dashboard";
import Modal from "../../components/modal";

export default function AdminProductsPage() {
  const [addProductModal, setAddProductModal] = useState(false);
  const [editProductModal, setEditProductModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const { data, error, mutate } = useSWR("/api/products", (url) =>
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json())
  );

  if (error) {
    // console.error(error);
    return (
      <Dashboard>
        <div className="w-full h-96 flex justify-center items-center text-gray-500 border-4 border-dashed border-red-200 rounded-lg">
          Failed to fetch products!
        </div>
      </Dashboard>
    );
  }

  if (!data) {
    return <Dashboard />;
  }
  return (
    <Dashboard>
      <AddProductForm
        open={addProductModal}
        setOpen={setAddProductModal}
        onSubmit={async ({ imageUrl, name, price, tags, stock }) => {
          await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              imageUrl,
              name,
              price,
              tags,
              stock,
            }),
          });
          setAddProductModal(false);
          mutate();
        }}
      />
      <Modal
        title="Are you sure?"
        open={deleteProductModal}
        setOpen={(val) => {
          setDeleteProduct(null);
          setDeleteProductModal(val);
        }}
      >
        <div className="flex flex-col justify-end py-4">
          <p className="mb-4 text-gray-700 min-w-[32rem]">
            Product will be deleted permanently!
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => {
                setDeleteProduct(null);
                setDeleteProductModal(false);
              }}
              className="relative p-2 flex justify-center uppercase tracking-widest text-sm text-white bg-gray-600 hover:bg-gray-500 rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                mutate(
                  data.filter((u) => u.id !== deleteProduct.id),
                  false
                );
                fetch("/api/products/" + deleteProduct.id, {
                  method: "DELETE",
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log("Deleted product", data);
                    mutate();
                  })
                  .catch((err) => {
                    console.error(err);
                  })
                  .finally(() => {
                    setDeleteProduct(null);
                    setDeleteProductModal(false);
                  });
              }}
              className="relative p-2 flex justify-center uppercase tracking-widest text-sm text-white bg-[#5B9270] hover:bg-[#79ad8d] rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] transition duration-200"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        title="Change Image"
        open={imageModal}
        setOpen={(val) => {
          setEditProduct(null);
          setImageModal(val);
        }}
      >
        <ImageForm
          product={editProduct}
          onSubmit={async (imageUrl) => {
            await fetch("/api/products/" + editProduct.id, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ imageUrl }),
            });
            setEditProduct(null);
            setImageModal(false);
            mutate();
          }}
        />
      </Modal>
      <Modal
        title="Edit Product"
        open={editProductModal}
        setOpen={(val) => {
          setEditProduct(null);
          setEditProductModal(val);
        }}
      >
        <EditProductForm
          product={editProduct}
          onSubmit={async (body) => {
            mutate(
              data.map((product) => {
                if (product.id === editProduct.id) {
                  return {
                    ...product,
                    name:
                      typeof body.name !== "undefined"
                        ? body.name
                        : product.name,
                    price:
                      typeof body.price !== "undefined"
                        ? body.price
                        : product.price,
                    sku:
                      typeof body.name !== "undefined"
                        ? body.name
                        : product.name,
                    tags:
                      typeof body.tags !== "undefined"
                        ? body.tags
                        : product.tags,
                    stock:
                      typeof body.stock !== "undefined"
                        ? body.stock
                        : product.stock,
                  };
                }
                return product;
              }),
              false
            );
            await fetch("/api/products/" + editProduct.id, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
            setEditProduct(null);
            setEditProductModal(false);
            mutate();
          }}
        />
      </Modal>
      {/* <h1 className="mb-4 text-3xl text-gray-700">Products</h1> */}
      <h1 className="w-full flex items-center justify-between mb-4">
        <span className="text-3xl text-gray-700">Products</span>
        <button
          onClick={() => setAddProductModal(true)}
          className="ml-auto px-3 py-2 rounded text-sm uppercase bg-transparent text-[#5B9270] focus:bg-[#5B9270] hover:bg-[#79ad8d] focus:text-white hover:text-white transition-colors duration-150 ease-linear"
        >
          Add Product
        </button>
      </h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="overflow-x-auto w-full my-2 -mr-96 rounded-lg shadow bg-white">
        <table className="max-w-full w-full whitespace-nowrap divide-y divide-gray-200 overflow-hidden">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stock
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <a
                      onClick={(e) => {
                        setEditProduct(product);
                        setImageModal(true);
                      }}
                    >
                      <div className="relative flex-shrink-0 h-10 w-10">
                        <Image
                          className="h-10 w-10 rounded-full object-cover overflow-hidden"
                          src={product.imageUrl}
                          placeholder="blur"
                          blurDataURL={`/_next/image?url=${product.imageUrl}&w=16&q=1`}
                          alt={product.name}
                          loading="lazy"
                          layout="fill"
                        />
                      </div>
                    </a>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.tags}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                  {new Date(product.createdAt).toLocaleString(undefined, {
                    hour12: true,
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.stock ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      In Stock
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Out of Stock
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.price}
                </td>
                <td className="px-6 py-4 space-x-2 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => {
                      setEditProduct(product);
                      setEditProductModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={(e) => {
                      setDeleteProduct(product);
                      setDeleteProductModal(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Dashboard>
  );
}

function EditProductForm(props) {
  const [name, setName] = useState(props.product?.name);
  const [sku, setSKU] = useState(props.product?.sku);
  const [price, setPrice] = useState(props.product?.price);
  const [tags, setTags] = useState(props.product?.tags);
  const [stock, setStock] = useState(props.product?.stock);
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="flex flex-col space-y-2 md:w-96"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        await props.onSubmit?.({ name, sku, price, tags, stock });
        setLoading(false);
      }}
    >
      <input
        id="name"
        type="text"
        name="name"
        autoFocus
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="relative p-2 mt-2 text-left text-gray-900 sm:text-sm border-2 border-gray-200 placeholder-gray-500 bg-gray-50 rounded-sm cursor-default focus:outline-none focus:bg-white focus:border-transparent focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
      />
      <input
        id="sku"
        type="text"
        name="sku"
        placeholder="SKU"
        value={sku}
        onChange={(e) => setSKU(e.target.value)}
        className="relative p-2 mt-2 text-left text-gray-900 sm:text-sm border-2 border-gray-200 placeholder-gray-500 bg-gray-50 rounded-sm cursor-default focus:outline-none focus:bg-white focus:border-transparent focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
      />
      <input
        id="price"
        type="number"
        name="price"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        className="relative p-2 mt-2 text-left text-gray-900 sm:text-sm border-2 border-gray-200 placeholder-gray-500 bg-gray-50 rounded-sm cursor-default focus:outline-none focus:bg-white focus:border-transparent focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
      />
      <input
        id="tags"
        type="text"
        name="tags"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="relative p-2 mt-2 text-left text-gray-900 sm:text-sm border-2 border-gray-200 placeholder-gray-500 bg-gray-50 rounded-sm cursor-default focus:outline-none focus:bg-white focus:border-transparent focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
      />
      <select
        id="stock"
        name="stock"
        className="appearance-none relative p-2 mt-2 text-left text-gray-900 sm:text-sm border-2 border-gray-200 placeholder-gray-500 bg-gray-50 rounded-sm cursor-default focus:outline-none focus:bg-white focus:border-transparent focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
        onChange={(e) => {
          setStock(e.target.options[e.target.selectedIndex].value === "true");
        }}
        defaultValue={stock}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
          backgroundPosition: "right 0.5rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1.5em 1.5em",
          paddingRight: "2.5rem",
        }}
      >
        <option value="true">In Stock</option>
        <option value="false">Out of Stock</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="relative p-3 flex justify-center uppercase tracking-widest text-sm text-white bg-[#5B9270] hover:bg-[#79ad8d] rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] transition duration-200"
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
        Save
      </button>
    </form>
  );
}

function ImageForm(props) {
  const [imageUrl, setImageUrl] = useState(props.product?.imageUrl);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles);
    if (acceptedFiles[0].size > 1048576 * 3) {
      // 3MB limit
      alert("File is too big! Upload a smaller image.");
      return;
    }
    setFile(acceptedFiles[0]);
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setImageUrl(e.target.result);
    });

    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg,image/png",
  });

  return (
    <form
      className="flex flex-col space-y-2 md:w-96"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);

        // Get S3 image upload URL
        const { url, imageUrl } = await (
          await fetch(`/api/get-s3-image-upload-url?fileType=${file.type}`)
        ).json();

        // Upload to S3
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: file,
        });

        // Update image url in the database
        await props.onSubmit?.(imageUrl);
        setLoading(false);
      }}
    >
      <div
        className="relative flex flex-col focus:outline-none"
        {...getRootProps()}
      >
        <span className="sr-only">Product Image</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={props.product?.name}
          className="w-full aspect-square object-cover"
        />

        <input
          type="file"
          id="imageInput"
          className="sr-only"
          {...getInputProps()}
        />
      </div>
      <p className="text-gray-500 text-sm">Drag &amp; drop an image</p>
      <button
        type="submit"
        disabled={loading}
        className="relative p-3 flex justify-center uppercase tracking-widest text-sm text-white bg-[#5B9270] hover:bg-[#79ad8d] rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] transition duration-200"
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
        Save
      </button>
    </form>
  );
}

function ImageInput({
  imageUrl,
  altText = "Image Alt Text",
  setImageUrl,
  setFile,
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      // console.log(acceptedFiles);
      if (acceptedFiles[0].size > 1048576 * 3) {
        // 3MB limit
        alert("File is too big! Upload a smaller image.");
        return;
      }
      setFile(acceptedFiles[0]);
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setImageUrl?.(e.target.result);
      });

      reader.readAsDataURL(acceptedFiles[0]);
    },
    [setImageUrl, setFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg,image/png",
  });

  return (
    <div
      className="relative flex flex-col focus:outline-none"
      {...getRootProps()}
    >
      <span className="sr-only">Image Input</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={altText}
        className="w-full aspect-square object-cover"
      />

      <input
        type="file"
        id="imageInput"
        className="sr-only"
        {...getInputProps()}
      />
    </div>
  );
}

function AddProductForm(props) {
  const [imageUrl, setImageUrl] = useState("/placeholder_image.png");
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [tags, setTags] = useState("");
  const [stock, setStock] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <Transition.Root show={props?.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={props?.setOpen}
      >
        <div className="flex min-h-screen text-center md:block md:px-2 lg:px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="hidden md:block fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <div className="flex transform transition w-full md:w-max text-left md:mt-32 md:align-middle md:inline-block md:max-w-2xl lg:max-w-4xl">
              <div className="p-4 relative w-full flex flex-col md:rounded-lg overflow-hidden bg-gray-50 text-gray-900">
                <div className="w-full flex justify-between items-center">
                  <div className="grow mr-4">
                    <h1 className="text-xl font-normal text-gray-800">
                      Add Product
                    </h1>
                  </div>
                  <button
                    type="button"
                    tabIndex={-1}
                    className="text-gray-800 hover:text-red-500 focus:text-red-500 focus:outline-none"
                    onClick={() => props.setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <form
                  className="flex flex-wrap w-full mt-4 justify-center items-center"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);

                    if (imageFile) {
                      // Get S3 image upload URL
                      const { url, imageUrl } = await (
                        await fetch(
                          `/api/get-s3-image-upload-url?fileType=${imageFile.type}`
                        )
                      ).json();

                      // Upload to S3
                      await fetch(url, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                        body: imageFile,
                      });
                    }

                    // Update image url in the database
                    await props.onSubmit?.({
                      imageUrl,
                      name,
                      price,
                      tags,
                      stock,
                    });

                    // Cleanup
                    setLoading(false);
                    setName("");
                    setPrice(0);
                    setTags("");
                    setStock(true);
                    setImageUrl("/placeholder_image.png");
                    setImageFile(null);
                  }}
                >
                  <div className="w-full max-w-xs overflow-hidden rounded">
                    <ImageInput
                      altText="New Product Image"
                      setFile={setImageFile}
                      setImageUrl={setImageUrl}
                      imageUrl={imageUrl}
                    />
                  </div>
                  <div className="w-full pt-4 shrink-0 flex flex-col space-y-2">
                    <label htmlFor="name" className="text-gray-700">
                      Name:
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      autoFocus
                      placeholder="Enter a product name..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="relative w-full p-2 text-left text-gray-900 sm:text-sm border-2 border-gray-200 placeholder-gray-500 bg-gray-50 rounded-sm cursor-default focus:outline-none focus:bg-white focus:border-transparent focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
                    />

                    <label htmlFor="price" className="text-gray-700">
                      Price:
                    </label>
                    <input
                      id="price"
                      type="number"
                      name="price"
                      placeholder="Price"
                      value={price}
                      onChange={(e) => setPrice(parseFloat(e.target.value))}
                      min="0"
                      step={10}
                      className="relative w-full p-2 mt-2 text-left text-gray-900 sm:text-sm border-2 border-gray-200 placeholder-gray-500 bg-gray-50 rounded-sm cursor-default focus:outline-none focus:bg-white focus:border-transparent focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
                    />

                    <label htmlFor="tags" className="text-gray-700">
                      Tags:
                    </label>
                    <input
                      id="tags"
                      type="text"
                      name="tags"
                      placeholder="Tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="relative w-full p-2 mt-2 text-left text-gray-900 sm:text-sm border-2 border-gray-200 placeholder-gray-500 bg-gray-50 rounded-sm cursor-default focus:outline-none focus:bg-white focus:border-transparent focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
                    />

                    <label htmlFor="stock" className="text-gray-700">
                      Stock:
                    </label>
                    <select
                      id="stock"
                      name="stock"
                      className="appearance-none relative w-full p-2 mt-2 text-left text-gray-900 sm:text-sm border-2 border-gray-200 placeholder-gray-500 bg-gray-50 rounded-sm cursor-default focus:outline-none focus:bg-white focus:border-transparent focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
                      onChange={(e) => {
                        setStock(
                          e.target.options[e.target.selectedIndex].value ===
                            "true"
                        );
                      }}
                      defaultValue={stock.toString()}
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      <option value="true">In Stock</option>
                      <option value="false">Out of Stock</option>
                    </select>
                    <button
                      type="submit"
                      disabled={loading}
                      className="relative p-3 flex justify-center uppercase tracking-widest text-sm text-white bg-[#5B9270] hover:bg-[#79ad8d] rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] transition duration-200"
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
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
