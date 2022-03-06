import { useState } from "react";
import { useForm } from "react-hook-form";

import DefaultLayout from "../layouts/default-layout";

const staticCart = [
  {
    id: "ckzwccaiu0009r7s0pfgtr72m",
    quantity: 2,
  },
  {
    id: "ckzwccaiu0010r7s0bx0vjnin",
    quantity: 1,
  },
];

export default function CheckoutPage(props) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <DefaultLayout minimal={true}>
      <div className="container mx-auto p-4 grid grid-cols-1 gap-12 lg:grid-cols-10 lg:pt-6">
        <div className="col-span-1 lg:col-span-6">
          <h4 className="text-3xl text-gray-700 mb-5">Shipping Address</h4>
          <form
            className="p-4 rounded-md shadow bg-white space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
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
            <div>
              <label className="block text-slate-500 text-sm" htmlFor="address">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                {...register("address", {
                  required: "Address is required",
                  maxLength: {
                    value: 50,
                    message: "Maximum 50 characters",
                  },
                })}
                className="relative w-full p-2 mt-2 text-left text-gray-900 sm:text-sm ring-2 ring-opacity-50 ring-gray-200 placeholder-gray-500 rounded-sm cursor-default focus:outline-none focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
              />
              {errors.address && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>
            <div className="flex space-x-3">
              <div className="grow">
                <label className="block text-slate-500 text-sm" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  {...register("city", {
                    required: "City is required",
                    maxLength: {
                      value: 30,
                      message: "Maximum 30 characters",
                    },
                  })}
                  className="relative w-full p-2 mt-2 text-left text-gray-900 sm:text-sm ring-2 ring-opacity-50 ring-gray-200 placeholder-gray-500 rounded-sm cursor-default focus:outline-none focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
                />
                {errors.city && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div className="grow">
                <label className="block text-slate-500 text-sm" htmlFor="state">
                  State
                </label>
                <input
                  id="state"
                  type="text"
                  name="state"
                  {...register("state", {
                    required: "State is required",
                    maxLength: {
                      value: 30,
                      message: "Maximum 30 characters",
                    },
                  })}
                  className="relative w-full p-2 mt-2 text-left text-gray-900 sm:text-sm ring-2 ring-opacity-50 ring-gray-200 placeholder-gray-500 rounded-sm cursor-default focus:outline-none focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
                />
                {errors.state && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex space-x-3">
              <div className="grow">
                <label className="block text-slate-500 text-sm" htmlFor="pin">
                  Pincode
                </label>
                <input
                  id="pin"
                  type="number"
                  name="pin"
                  {...register("pin", {
                    required: "Pincode is required",
                    min: {
                      value: 1000,
                      message: "Minimum 4 digits",
                    },
                    max: {
                      value: 999999999,
                      message: "Maximum 10 digits",
                    },
                    valueAsNumber: true,
                  })}
                  className="relative w-full p-2 mt-2 text-left text-gray-900 sm:text-sm ring-2 ring-opacity-50 ring-gray-200 placeholder-gray-500 rounded-sm cursor-default focus:outline-none focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
                />
                {errors.pin && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.pin.message}
                  </p>
                )}
              </div>
              <div className="grow">
                <label className="block text-slate-500 text-sm" htmlFor="phone">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^([+][9][1]-?[7-9]\d{9})|^([7-9]\d{9})/i,
                      message: "Phone number must be valid",
                    },
                  })}
                  className="relative w-full p-2 mt-2 text-left text-gray-900 sm:text-sm ring-2 ring-opacity-50 ring-gray-200 placeholder-gray-500 rounded-sm cursor-default focus:outline-none focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.phone.message}
                  </p>
                )}
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
              Place Order
            </button>
          </form>
        </div>
        <div className="col-span-1 lg:col-span-4 order-first lg:order-last">
          <h4 className="text-3xl text-gray-700 mb-5">Order Summary</h4>
          <div className="p-4 rounded-md shadow bg-white space-y-5">
            {staticCart.map((item) => {
              return (
                <div
                  key={item.id}
                  className="grid grid-cols-6 overflow-hidden gap-6"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="block col-span-1 aspect-square rounded bg-gray-600"
                    src={null}
                    alt=""
                  />
                  <div className="col-span-5">
                    <div className="flex">
                      <h6 className="text-sm font-semibold text-gray-800 flex-grow">
                        {item.id}
                      </h6>
                      <button>
                        <svg
                          className="w-3"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                        </svg>
                      </button>
                    </div>
                    {/* <p className="text-xs truncate text-gray-600">{item.id}</p> */}
                    <span className="text-sm text-gray-800">
                      {item.quantity} &#10799; &#8377;{0}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
