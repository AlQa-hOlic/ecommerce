import { GetStaticPropsContext } from "next";
import { useEffect } from "react";
import Image from "next/image";
import smoothscroll from "smoothscroll-polyfill";

import ProductCard from "../components/product-card";
import Header from "../components/header";

export default function IndexPage({ products }) {
  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  const heroImageSrc = "/dal_tadka.jpg";

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
      <section className="max-w-6xl px-8 mx-auto py-1" id="products-section">
        <h1 className="text-left text-3xl tracking-tight font-bold text-gray-700">
          Our Products
        </h1>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const response = await fetch(
    process.env.NODE_ENV === "production"
      ? process.env.VERCEL_URL
      : "http://localhost:3000" + "/api/products",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const products = await response.json();
  return {
    props: {
      products,
    },
    revalidate: 60 * 30,
  };
}

function ProductGrid(props) {
  const { products } = props;
  if (!products || products.length === 0) {
    return <div className="text-gray-400 py-8">No Products Found!</div>;
  }
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-8">
      {products.map((p) => (
        <ProductCard key={p.name} product={p} />
      ))}
    </div>
  );
}
