import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";

import DefaultLayout from "../layouts/default-layout";
import { useCart } from "../lib/context/cart";
import { useRouter } from "next/router";

export default function CheckoutPage(props) {
  const router = useRouter();
  const { items: initialItems, setItems: setCartItems } = useCart();
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    // Place order
    const orderPlaceResponse = await (
      await fetch("/api/orders/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          items,
        }),
      })
    ).json();
    const order_id = orderPlaceResponse.data.razorpayOrder.id;
    const amount = orderPlaceResponse.data.razorpayOrder.amount;
    const currency = orderPlaceResponse.data.razorpayOrder.currency;
    // Empty cart
    setCartItems([]);

    // Initiate payment
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount,
      currency,
      order_id,
      name: "Embrandiri&#39;s Kitchen",
      description: "Test Transaction",
      image: "https://embrandiris.com/logo.svg",
      handler: async function (response) {
        let paymentPayload = {
          orderId: orderPlaceResponse.data.order.id,
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const orderPaymentResponse = await (
          await fetch("/api/orders/payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentPayload),
          })
        ).json();

        console.log(orderPaymentResponse);
        alert(
          "Order has been placed. Please wait for confirmation.\nContact support if you have any inquiries"
        );
        router.push("/");
      },
      prefill: {
        name: data["name"],
        email: data["email"],
        contact: data["phone"],
      },
      notes: {
        ...data,
      },
      theme: {
        color: "#61dafb",
      },
      modal: {
        escape: false,
        ondismiss: function () {
          const paymentPayload = {
            orderId: orderPlaceResponse.data.order.id,
          };
          // alert(response.error.code);
          // alert(response.error.description);
          // alert(response.error.source);
          // alert(response.error.step);
          // alert(response.error.reason);
          // alert(response.error.metadata.order_id);
          // alert(response.error.metadata.payment_id);

          fetch("/api/orders/cancel", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentPayload),
          })
            .then((res) => res.json())
            .then((resData) => {
              console.log(resData);
              alert(
                "Your order has been cancelled.\nContact support if you have any inquiries"
              );
              router.push("/");
            });
        },
      },
    };

    // @ts-ignore
    const paymentObject = new Razorpay(options);
    // paymentObject.on("payment.failed", async function (response) {
    //   const paymentPayload = {
    //     orderId: orderPlaceResponse.data.order.id,
    //   };
    //   // alert(response.error.code);
    //   // alert(response.error.description);
    //   // alert(response.error.source);
    //   // alert(response.error.step);
    //   // alert(response.error.reason);
    //   // alert(response.error.metadata.order_id);
    //   // alert(response.error.metadata.payment_id);

    //   const orderPaymentResponse = await (
    //     await fetch("/api/orders/paymentFailed", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(paymentPayload),
    //     })
    //   ).json();

    //   console.log(orderPaymentResponse);
    //   router.push("/");
    // });
    paymentObject.open();
  };

  // console.log(items);

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
              <label className="block text-slate-500 text-sm" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                {...register("email", {
                  required: "Email is required",
                  maxLength: {
                    value: 50,
                    message: "Maximum 50 characters",
                  },
                })}
                className="relative w-full p-2 mt-2 text-left text-gray-900 sm:text-sm ring-2 ring-opacity-50 ring-gray-200 placeholder-gray-500 rounded-sm cursor-default focus:outline-none focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.email.message}
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
            {items.map((item) => {
              return (
                <div
                  key={item.id}
                  className="grid grid-cols-4 overflow-hidden gap-6"
                >
                  <div className="block relative col-span-1 aspect-square rounded bg-gray-600 overflow-hidden border border-gray-200">
                    {/* <img
                          src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                          alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                        /> */}
                    <Image
                      src={item.imageUrl}
                      placeholder="blur"
                      blurDataURL={`/_next/image?url=${item.imageUrl}&w=16&q=1`}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                      // group-hover:scale-[1.2] transition-transform duration-300 ease-out
                      loading="lazy"
                      layout="fill"
                    />
                  </div>
                  <div className="col-span-3">
                    <div className="flex">
                      <h6 className="text-lg font-normal text-gray-800 flex-grow">
                        {item.name}
                      </h6>
                    </div>
                    {/* <p className="text-xs truncate text-gray-600">{item.id}</p> */}
                    <span className="text-md text-gray-500">
                      {item.quantity} &times; &#8377;{item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
            <div className="border-t border-gray-200 py-6 px-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>
                  &#8377;
                  {items
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Tax</p>
                <p>
                  &#8377;
                  {items
                    .reduce((total, item) => total + item.price * 0.08, 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="mt-2 flex justify-between text-xl font-bold text-gray-900">
                <p>Grand Total</p>
                <p>
                  &#8377;
                  {items
                    .reduce(
                      (total, item) =>
                        total + item.price * item.quantity + item.price * 0.08,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
