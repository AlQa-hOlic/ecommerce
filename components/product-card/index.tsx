import Image from "next/image";

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
        <div className="absolute bottom-2 left-[50%] translate-x-[-50%] translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 invisible group-hover:visible z-10 flex space-x-4 py-2 px-4 rounded text-gray-800 bg-white shadow-lg transition duration-300">
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

export default ProductCard;
