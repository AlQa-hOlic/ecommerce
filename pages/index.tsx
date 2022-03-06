import { useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";
import smoothscroll from "smoothscroll-polyfill";
import { Product } from "@prisma/client";

import DefaultLayout from "../layouts/default-layout";
import prisma from "../prisma/client";

export default function IndexPage(props) {
  const { products } = props;
  console.log(products);
  return (
    <DefaultLayout>
      <Hero heroImageSrc={"/dal_tadka.jpg"} />
      <ProductGrid products={products} />
    </DefaultLayout>
  );
}

export async function getStaticProps() {
  const products = await prisma.product.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  return {
    props: {
      products: products.map((product) => ({
        ...product,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
      })),
    },
  };
}

interface ProductGridProps {
  products: Product[];
}

function ProductGrid(props: ProductGridProps) {
  const { products } = props;
  // const { data: products, error } = useSWR<Product[]>(
  //   `/api/products`,
  //   async (url) => {
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     // await new Promise((res) => setTimeout(res, 40000));
  //     // throw new Error("Hello, world!");
  //     const { status, msg, data } = await response.json();
  //     if (status !== "ok") {
  //       // console.error(msg);
  //       throw new Error(msg);
  //     }
  //     return data;
  //   }
  // );

  // if (error) return null;

  return (
    <section
      className="w-full max-w-6xl px-8 mx-auto py-1"
      id="products-section"
    >
      <h1 className="text-left text-3xl tracking-tight font-bold text-gray-700">
        Our Products
      </h1>
      {!products ? (
        <div className="text-gray-400 py-8">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-gray-400 py-8">No Products Found!</div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-8">
          {products.map((product) => {
            const { name, id, imageUrl, price } = product;
            return (
              <div key={id} className="flex flex-col group">
                <figure className="mb-2 flex-grow relative aspect-square">
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
                      className="cursor-pointer text-gray-800 hover:text-primary flex space-x-1"
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
                      <svg
                        className="animate-spin h-6 w-6"
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
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
                <div className="font-sans text-gray-700 flex flex-col items-center">
                  <h3 className="text-base font-normal whitespace-nowrap text-ellipsis overflow-hidden">
                    {name}
                  </h3>
                  <div className="block text-lg whitespace-nowrap text-ellipsis overflow-hidden space-x-2">
                    <ins className="no-underline font-bold">
                      &#8360;&nbsp;{price}
                    </ins>
                    {/* <del className="line-through text-gray-400">&#8360;&nbsp;60.00</del> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function Hero(props) {
  const { heroImageSrc } = props;

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  return (
    <main className="w-full flex md:justify-between justify-center items-center max-w-6xl space-x-4 px-8 mx-auto pt-16 pb-32">
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
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua.
        </p>
        <div className="mt-8 max-w-xl flex flex-col md:flex-row items-center justify-start md:items-start">
          <div className="rounded-md shadow">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                let el = document.getElementById("products-section");

                if (!el) return;

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
          src={heroImageSrc}
          alt="Dal Tadka"
          // width={3648}
          // height={5472}
          placeholder="blur"
          blurDataURL={`/_next/image?url=${heroImageSrc}&w=16&q=1`}
          layout="fill"
          className="object-cover"
        />
      </div>
    </main>
  );
}
