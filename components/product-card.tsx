import Image from "next/image";
// import Link from "next/link";

export default function ProductCard(props) {
  const { id, name, imageUrl, price } = props.product;
  return (
    <div className="flex flex-col group">
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
          <ins className="no-underline font-bold">&#8360;&nbsp;{price}</ins>
          {/* <del className="line-through text-gray-400">&#8360;&nbsp;60.00</del> */}
        </div>
      </div>
    </div>
  );
}
