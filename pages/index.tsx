import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Index: NextPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="sticky top-0 h-[72px] backdrop-filter backdrop-blur-md bg-white">
        <Head>
          <title>Embrandiri&#39;s Kitchen</title>
        </Head>
        <div className="container mx-auto h-full flex justify-start items-center">
          <Link href='/' scroll={false}>
            <a>
              <h1 className="font-normal text-2xl text-gray-600 flex items-center">
                <Image src="/logo.svg" alt="Ecommerce App" height={64} width={64} />
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
            <form autoComplete="false" onSubmit={e => {
              e.preventDefault()
              alert('Form submitted!')
            }} className="group flex items-center flex-grow md:flex-grow-0 md:max-w-[360px] w-full mx-4 bg-gray-50 rounded-md focus-within:border-gray-200 focus-within:ring-1 focus-within:ring-gray-200">
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
                  {/* <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  /> */}
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
              <a title="Cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer text-gray-400 transition-all duration-400 hover:scale-125 hover:text-gray-700"
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer text-gray-400 transition-all duration-400 hover:scale-125 hover:text-gray-700"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </nav>
        </div>
      </header>
      <main>
        <h1 className="text-3xl font-normal h-[300rem]">Hello world!</h1>
      </main>
    </div>
  );
};

export default Index;
