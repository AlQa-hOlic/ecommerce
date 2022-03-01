import { Fragment, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import smoothscroll from "smoothscroll-polyfill";

import products from "./../prisma/productData.json";

function Header() {
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

              <span className="hidden md:inline">Embrandiri&#39;s Kitchen</span>
            </h1>
          </a>
        </Link>
        <nav className="flex-grow h-full flex justify-between items-center">
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
              alert("Form submitted!");
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
              onClick={(e) => e.preventDefault()}
              title="Cart"
              className="cursor-pointer text-gray-400 hover:text-gray-700"
            >
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </a>
            <Menu as="div" className="relative inline-flex">
              {({ open }) => (
                <>
                  <Menu.Button className="rounded-full text-gray-600 dark:text-gray-400 focus:outline-none">
                    <span className="sr-only">My Account</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600 dark:text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Menu.Button>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      as="ul"
                      className="origin-top-right absolute right-0 mt-8 w-64 rounded-md shadow-lg py-1 bg-white border border-gray-100 focus:outline-none"
                    >
                      <Menu.Item
                        as="li"
                        disabled
                        className="p-2 text-gray-400 select-none whitespace-nowrap text-ellipsis overflow-hidden"
                      >
                        Signed in as user
                      </Menu.Item>
                      <Menu.Item
                        as="li"
                        className="p-2 text-gray-600 focus:outline-none select-none whitespace-nowrap text-ellipsis overflow-hidden"
                      >
                        <button onClick={() => signOut()}>Logout</button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </nav>
      </div>
    </header>
  );
}

function ProductCard(props) {
  const { id, name, imageUrl, price } = props.product;
  return (
    <div className="flex flex-col">
      <figure className="group mb-2 flex-grow relative aspect-square">
        <Image
          src={imageUrl}
          placeholder="blur"
          blurDataURL={`/_next/image?url=${imageUrl}&w=16&q=1`}
          alt={name}
          className="object-cover rounded overflow-hidden"
          // group-hover:scale-[1.2] transition-transform duration-300 ease-out
          loading="lazy"
          layout="fill"
        />
        {/* Overlay */}
        <div className="absolute inset-0 rounded overflow-hidden opacity-0 group-hover:opacity-25 bg-black transition-opacity duration-300"></div>
        {/* Card Actions */}
        <div className="absolute bottom-2 left-[50%] translate-x-[-50%] translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 invisible group-hover:visible z-10 flex space-x-4 py-2 px-4 rounded bg-white shadow-lg transition duration-300">
          <a
            href="#"
            className="cursor-pointer text-gray-800 hover:text-primary"
          >
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {/* Tick svg */}
            {/* <svg
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
                d="M5 13l4 4L19 7"
              />
            </svg> */}
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              props.toggleWishlist(id);
            }}
            className={`cursor-pointer ${"text-gray-800 hover:text-red-400"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill={"none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </a>
        </div>
      </figure>
      <Link href="#">
        <a className="font-sans text-gray-700 flex flex-col items-center">
          <h3 className="text-base font-normal whitespace-nowrap text-ellipsis overflow-hidden">
            {name}
          </h3>
          <div className="block text-lg whitespace-nowrap text-ellipsis overflow-hidden space-x-2">
            <ins className="no-underline font-bold">&#8360;&nbsp;{price}</ins>
            {/* <del className="line-through text-gray-400">&#8360;&nbsp;60.00</del> */}
          </div>
        </a>
      </Link>
      {/* <div className="flex w-full">
                <h3 className="mb-1 text-md font-bold whitespace-nowrap text-ellipsis overflow-hidden">
                  <a href="#">
                    Pizza Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Et adipisci alias vel impedit voluptate expedita recusandae
                    doloremque quasi a. Voluptas a reprehenderit quasi neque est
                    nihil, voluptatibus hic! Velit, repellat.
                  </a>
                </h3>
              </div> */}
    </div>
  );
}

function ProductGrid() {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-4">
      {products.map((p) => (
        <ProductCard key={p.name} product={p} />
      ))}
    </div>
  );
}

export default function IndexPage() {
  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  return (
    <div className="text-gray-900 bg-gray-50 bg-gradient-to-br from-white to-green-50 min-h-screen">
      <Header />
      <main className="flex md:justify-between justify-center items-center max-w-6xl space-x-4 px-8 mx-auto pt-16 pb-32">
        <div className="">
          <h1 className="text-center md:text-left text-4xl tracking-tight font-bold text-gray-700 md:text-5xl lg:text-6xl whitespace-nowrap text-ellipsis overflow-hidden">
            <span className="block">
              Traditional <span>Indian Food</span>
            </span>
            <span className="block leading-relaxed text-[#5B9270] whitespace-nowrap text-ellipsis overflow-hidden">
              at your fingertips!
            </span>
          </h1>
          <p className="text-base text-gray-500 mt-5 text-md lg:text-lg max-w-xl">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <div className="mt-8 max-w-xl flex flex-col md:flex-row items-center justify-start md:items-start">
            <div className="rounded-md shadow">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  let el = document.getElementById("products-section");
                  window.scrollTo({
                    top: el.getBoundingClientRect().top + window.scrollY - 92,
                    behavior: "smooth",
                  });
                }}
                className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-[#5B9270] hover:bg-[#477257] transition-colors duration-150 ease-linear"
              >
                Order Now
                {/* <svg
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
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg> */}
              </a>
            </div>
            <div className="">
              <a
                href="#"
                className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-lg font-medium whitespace-nowrap text-ellipsis overflow-hidden rounded-md text-[#5B9270] hover:text-[#477257] transition-colors duration-150 ease-linear"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                Find a pickup location near you
              </a>
            </div>
          </div>
        </div>
        <div className="hidden md:inline mx-2 rounded-xl overflow-hidden relative max-w-[24rem] w-full aspect-square">
          <Image
            src="https://embrandiris.s3.amazonaws.com/dal_tadka.jpg"
            alt="Dal Tadka"
            // width={3648}
            // height={5472}
            placeholder="blur"
            blurDataURL={`/_next/image?url=${"https://embrandiris.s3.amazonaws.com/dal_tadka.jpg"}&w=16&q=1`}
            layout="fill"
            className="object-cover"
          />
        </div>
      </main>
      <section className="max-w-6xl px-8 mx-auto py-1" id="products-section">
        <h1 className="text-left text-3xl tracking-tight font-bold text-gray-700">
          Our Products
        </h1>
        <ProductGrid />
      </section>
    </div>
  );
}
