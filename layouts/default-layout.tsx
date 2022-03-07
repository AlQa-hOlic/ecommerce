import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { Dialog, Transition } from "@headlessui/react";

import Loading from "../components/loading";
import { useCart } from "../lib/context/cart";

export default function DefaultLayout(props) {
  const { minimal = false } = props;
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  //   if (status === "unauthenticated") {
  //     router.push("/login");
  //     return null;
  //   }

  if (session?.user?.role === "ADMIN") {
    router.push("/admin");
    return null;
  }

  return (
    <div className="flex justify-start items-stretch bg-gray-50">
      <div className="flex flex-col grow min-h-screen">
        <Header isLoggedIn={session !== null} minimal={minimal} />
        <main className="w-full grow flex flex-col">
          {props.children ? (
            props.children
          ) : (
            <div className="border-4 border-dashed border-gray-300 rounded-lg w-full h-full flex justify-center items-center text-gray-400 uppercase">
              No content
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function Header(props) {
  const { isLoggedIn, minimal } = props;

  const [cartView, setCartView] = useState(false);

  const { itemCount } = useCart();

  return (
    <header className="z-40 sticky top-0 h-[72px] backdrop-filter backdrop-blur-md bg-white bg-opacity-70">
      <Head>
        <title>Embrandiri&#39;s Kitchen</title>
      </Head>
      <div className="sm:container mx-auto px-2 h-full flex justify-start items-center">
        <Link href="/" scroll={false}>
          <a>
            <h1 className="font-normal text-2xl text-[#5B9270] flex items-center">
              <svg
                width="64"
                height="64"
                view-box="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="leaf2_mask">
                  <rect x="0" y="0" height="64" width="64" fill="white" />
                  <path
                    d="M40.8064 14.7968C59.8528 30.1056 50.7041 39.7376 43.8271 39.9872C34.5354 40.3246 26.0097 30.8736 40.8064 14.7968Z"
                    fill="black"
                  />
                </mask>
                <path
                  mask="url(#leaf2_mask)"
                  d="M43.7069 41.6539L40.4897 40.7086C41.6465 37.781 42.1324 34.4566 41.011 31.8976L39.6363 31.4184C40.3965 33.529 40.2721 37.0803 38.9123 40.2452L34.7665 39.0271C35.8323 36.3686 36.1861 33.3731 35.1744 31.038L33.9968 31.038C34.6856 32.9752 34.7359 35.8066 33.4565 38.6423L28.6019 37.216C29.4477 35.1096 29.8496 32.78 29.0307 30.9249L28.0277 31.0379C28.5865 32.5762 28.7263 34.8187 27.5245 36.8994L23.0917 35.597C23.579 34.3503 23.8531 32.9966 23.3469 31.8976L22.6744 32.0138C23.0268 32.9377 22.7953 34.1107 22.3103 35.3675L13.0015 32.6325C41.3378 19.6794 44.7756 34.4619 43.7069 41.6539ZM22.0265 36.3509L12.8159 33.2509C25.9957 58.8731 40.4983 52.1405 43.2842 43.5056L39.9553 42.3852C39.2925 44.7987 38.1182 46.9961 35.5838 50.0736L33.7452 49.7344C36.8209 46.1154 37.5161 44.6774 38.3078 41.8307L34.273 40.4727C33.2499 43.6015 31.7599 45.342 30.1568 46.8479L28.928 46.2335C30.8821 44.3725 32.0751 42.5961 32.9298 40.0206L28.2244 38.4369C27.5796 41.0326 26.6667 42.3814 24.7811 44.0321L23.8083 43.2641C25.4976 42.1692 26.8045 40.0434 27.1204 38.0653L22.7619 36.5984C22.3084 38.2357 21.3936 39.3948 20.5446 39.9206L19.9165 39.3728C21.0282 38.4122 21.7546 37.4582 22.0265 36.3509Z"
                  fill="currentColor"
                />
                <path
                  d="M43.1153 38.3534C35.132 38.5543 29.5126 31.51 40.8525 16.3397L41.598 23.5927C40.974 23.7987 40.1838 23.7554 39.3222 23.3472L39.0834 23.7822C39.6199 24.1495 40.5596 24.3866 41.6613 24.2081L41.9476 26.994C40.703 27.3447 39.0766 27.1815 37.991 26.4704L37.7948 27.1905C38.6747 27.774 40.2232 28.1484 42.0357 27.8505L42.3494 30.9022C40.489 31.2152 38.551 30.792 37.1718 29.9008V30.8224C38.2699 31.5407 40.1822 32.1708 42.4435 31.8184L42.7283 34.5889C40.6405 34.9833 38.466 34.6995 36.9158 33.6896V34.7648C38.1422 35.5737 40.3072 36.0906 42.8388 35.664L43.1153 38.3534ZM42.3233 24.1428L42.704 26.9442C44.2028 27.1121 45.3827 26.5229 46.1318 25.8048L46.4902 26.2976C45.6372 27.2331 44.2307 27.6959 42.8167 27.7738L43.2323 30.8324C45.1447 30.794 46.5239 29.816 47.463 28.928L47.9238 29.7984C46.8546 30.9551 45.1208 31.6226 43.3542 31.7289L43.7336 34.5207C45.9073 34.4718 47.9159 33.4958 48.9478 32.512V33.536C47.7698 34.821 45.8286 35.458 43.8757 35.567L44.2409 38.2541C49.7149 37.4021 56.817 31.018 41.2666 16.3672L42.2372 23.5097C43.091 23.4899 43.6981 23.2164 44.135 22.784L44.4421 23.214C43.9457 23.7762 43.1449 24.0702 42.3233 24.1428Z"
                  fill="currentColor"
                />
              </svg>

              <span className={minimal ? "inline" : "hidden md:inline"}>
                Embrandiri&#39;s Kitchen
              </span>
            </h1>
          </a>
        </Link>
        {!minimal && (
          <nav className="flex-grow h-full flex justify-between items-center">
            <CartView open={cartView} setOpen={setCartView} />
            <div className="hidden md:flex">
              {/* <Link href="/">
            <a className="inline-flex mx-2 items-center leading-6 text-gray-500 transition-colors duration-400 hover:text-gray-900">
              Shop
            </a>
          </Link>
          <Link href="/about">
            <a className="inline-flex mx-2 items-center leading-6 text-gray-500 transition-colors duration-400 hover:text-gray-900">
              About
            </a>
          </Link> */}
            </div>
            {/* <input className="min-w-[280px] px-3 py-2 bg-white rounded-md text-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" placeholder="Search for products..." /> */}
            <form
              autoComplete="false"
              onSubmit={(e) => {
                e.preventDefault();
                // alert("Form submitted!");
              }}
              className="group flex items-center flex-grow md:flex-grow-0 md:max-w-[360px] w-full mx-4 bg-gray-50 rounded-md focus-within:border-gray-200 focus-within:ring-1 focus-within:ring-gray-200"
            >
              <input
                className="px-3 py-2 h-full w-full bg-transparent focus:outline-none text-sm placeholder-slate-400"
                placeholder="Search for products..."
              />
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-3 cursor-pointer text-gray-400 transition-colors group-focus-within:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
            <div className="flex items-center space-x-4 px-2">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setCartView(true);
                }}
                className="relative cursor-pointer text-gray-400 focus:text-gray-500 hover:text-gray-500"
              >
                <span className="sr-only">Cart</span>
                {itemCount > 0 && (
                  <div className="absolute inline-block top-0 right-0 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 py-1 px-1.5 text-xs leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#5B9270] text-white rounded-full z-10">
                    {itemCount}
                  </div>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* <Link href={isLoggedIn ? "/account" : "/login"}>
                <a className="cursor-pointer text-gray-400 focus:text-gray-500 hover:text-gray-500">
                  <span className="sr-only">My Account</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </Link> */}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

function CartView(props) {
  const { items, setItems } = useCart();
  // console.log(items);
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 flex justify-end z-40"
        open={props.open}
        onClose={props.setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-75" />
        </Transition.Child>

        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-md w-full pt-5 pb-4 bg-gray-100">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 left-0 -ml-12 pt-2">
                <button
                  tabIndex={0}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => props.setOpen?.(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
            </Transition.Child>
            <div className="flex-shrink-0 flex items-center px-4">
              <h3 className="font-normal text-xl text-[#5B9270]">
                Cart Summary
              </h3>
            </div>
            <div className="mt-8 px-4 overflow-y-scroll">
              <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li className="flex py-6" key={item.id}>
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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

                      <div className="ml-4 flex flex-1 flex-col select-none">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href="#"> {item.name} </a>
                            </h3>
                            <p className="ml-4">
                              &#8377;{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.id}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="flex items-center space-x-2 text-gray-500">
                            <a
                              onClick={(e) => {
                                e.preventDefault();

                                let newItems = [...items];

                                let match = newItems.find(
                                  (_item) => _item.id === item.id
                                );

                                if (match && match.quantity > 1) {
                                  match.quantity -= 1;
                                  setItems(newItems);
                                }
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M18 12H6"
                                />
                              </svg>
                            </a>
                            <span>Qty {item.quantity}</span>
                            <a
                              onClick={(e) => {
                                e.preventDefault();

                                let newItems = [...items];

                                let match = newItems.find(
                                  (_item) => _item.id === item.id
                                );

                                if (match && match.quantity < 10) {
                                  match.quantity += 1;
                                  setItems(newItems);
                                }
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                            </a>
                          </p>

                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-[#5B9270] hover:text-[#79ad8d]"
                              onClick={(e) => {
                                e.preventDefault();
                                let newItems = items.filter(
                                  (_item) => _item.id !== item.id
                                );

                                setItems(newItems);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {items.length === 0 ? (
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <p className="text-center text-base font-medium text-gray-500">
                  No items in cart!
                </p>
                <div className="mt-6">
                  <a
                    onClick={(e) => props.setOpen(false)}
                    className="flex items-center justify-center rounded-md border border-transparent bg-[#5B9270] hover:bg-[#79ad8d] cursor-pointer px-6 py-3 text-base font-medium text-white shadow-sm"
                  >
                    Back to shop
                  </a>
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
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
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link href="/checkout">
                    <a className="flex items-center justify-center rounded-md border border-transparent bg-[#5B9270] hover:bg-[#79ad8d] px-6 py-3 text-base font-medium text-white shadow-sm">
                      Checkout
                    </a>
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <button
                      type="button"
                      className="font-medium text-[#5B9270] hover:text-[#79ad8d]"
                    >
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            )}
            <div className="mt-5 px-4 flex-1 h-0 overflow-y-auto"></div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
