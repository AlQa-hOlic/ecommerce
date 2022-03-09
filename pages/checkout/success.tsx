import Link from "next/link";
import DefaultLayout from "../../layouts/default-layout";

export default function CheckoutSuccessPage(props) {
  return (
    <DefaultLayout minimal={true}>
      <div className="w-full max-w-lg mx-auto min-h-screen py-4 -my-16 flex flex-col justify-center items-start space-y-4">
        <div className="w-full max-w-lg space-y-2">
          <h3 className="text-lg text-[#5B9270]">Payment Successful</h3>
          <h1 className="text-5xl font-bold">Thanks for ordering</h1>
          <p className="text-base text-slate-500">
            We appreciate your order, we&apos;re currently processing it. So
            hang tight and We&apos;ll send you confirmation very soon!
          </p>
        </div>
        <hr />
        <Link href="/">
          <a className="flex space-x-2 text-[#5B9270] hover:text-[#79ad8d]">
            Continue shopping
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </Link>
      </div>
    </DefaultLayout>
  );
}
