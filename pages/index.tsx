import { NextPage } from "next";
import Image from "next/image";
import Header from "../components/header";

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
            src="/spices.jpg"
            alt="Spices"
            // width={3648}
            // height={5472}
            placeholder="blur"
            blurDataURL={`/_next/image?url=${"/spices.jpg"}&w=16&q=1`}
            layout="fill"
            className="object-cover"
          />
        </div>
      </main>
      <section className="h-[300rem] max-w-6xl px-8 mx-auto py-1">
        <h1 className="text-left text-3xl tracking-tight font-bold text-gray-700">
          Our Products
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
          <div className="aspect-[1/1.25] bg-red-300"></div>
          <div className="aspect-[1/1.25] bg-blue-300"></div>
          <div className="aspect-[1/1.25] bg-green-300"></div>
          <div className="aspect-[1/1.25] bg-gray-300"></div>
        </div>
      </section>
    </div>
  );
};

export default Index;
