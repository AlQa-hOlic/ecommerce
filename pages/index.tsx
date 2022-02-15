import { NextPage } from "next";
import Image from "next/image";
import Header from "../components/header";

const static_products = [
  {
    name: "Dal Tadka",
    image: "/dal_tadka.jpg",
    price: 249,
  },
  {
    name: "Spices",
    image: "/spices.jpg",
    price: 999,
  },
  {
    name: "Paneer Chawal",
    image: "/paneer_chawal.jpg",
    price: 230,
  },
  {
    name: "Paneer Salad",
    image: "/paneer_salad.jpg",
    price: 140,
  },
  {
    name: "Pizza",
    image: "/pizza.jpg",
    price: 480,
  },
  {
    name: "Rasberry Rush",
    image: "/rasberry_rush.jpg",
    price: 180,
  },
  {
    name: "Sandwich",
    image: "/sandwich.jpg",
    price: 110,
  },
  {
    name: "Waffles",
    image: "/waffles.jpg",
    price: 149,
  },
];

const Index: NextPage = () => {
  return (
    <div className="text-gray-900 bg-gray-50 bg-gradient-to-br from-white to-green-50">
      <Header />
      {/* <main style={{ minHeight: "calc(100vh - 72px)" }}>
        <Placeholder />
      </main> */}
      <main className="flex md:justify-between justify-center items-center max-w-6xl px-8 mx-auto pt-16 pb-32">
        <div className="">
          <h1 className="text-center md:text-left text-4xl tracking-tight font-bold text-gray-700 md:text-5xl lg:text-6xl">
            <span className="block">
              Traditional <span>Indian Food</span>
            </span>
            <span className="block text-[#5B9270]">at your fingertips!</span>
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
                className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-[#5B9270] hover:bg-[#518364]"
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
                className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-lg font-medium rounded-md text-[#518364] hover:text-[#5B9270]"
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
        <div className="hidden md:inline mx-2 rounded-xl overflow-hidden relative w-[24rem] w-full aspect-square">
          <Image
            src="/dal_tadka.jpg"
            alt="Dal Tadka"
            // width={3648}
            // height={5472}
            placeholder="blur"
            blurDataURL={`/_next/image?url=${"/dal_tadka.jpg"}&w=16&q=1`}
            layout="fill"
            className="object-cover"
          />
        </div>
      </main>
      <section className="h-[300rem] max-w-6xl px-8 mx-auto py-1">
        <h1 className="text-left text-3xl tracking-tight font-bold text-gray-700">
          Our Products
        </h1>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-4">
          {static_products.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

const ProductCard = (props) => {
  const { name, image, price } = props.product;
  // console.log(props.product);
  return (
    <div className="flex flex-col">
      <figure className="group mb-2 flex-grow relative aspect-square">
        <a
          href="#"
          className="group-hover:brightness-50 transition-filter duration-300"
        >
          <Image
            src={image}
            placeholder="blur"
            blurDataURL={`/_next/image?url=${image}&w=16&q=1`}
            alt={name}
            className="object-cover rounded overflow-hidden"
            loading="lazy"
            layout="fill"
          />
        </a>
        <div className="absolute bottom-2 left-[50%] translate-x-[-50%] translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 invisible group-hover:visible z-10 flex space-x-2 p-2 rounded text-gray-800 bg-white shadow-lg transition duration-300">
          <a href="#">
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </a>
          <a href="#">
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </a>
        </div>
      </figure>
      <div className="font-sans text-gray-700 flex flex-col items-center">
        <h3 className="text-base font-normal whitespace-nowrap text-ellipsis overflow-hidden">
          <a href="#">{name}</a>
        </h3>
        <div className="block text-lg whitespace-nowrap text-ellipsis overflow-hidden space-x-2">
          <ins className="no-underline font-bold">&#8360;&nbsp;{price}</ins>
          {/* <del className="line-through text-gray-400">&#8360;&nbsp;60.00</del> */}
        </div>
      </div>
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
};

export default Index;
