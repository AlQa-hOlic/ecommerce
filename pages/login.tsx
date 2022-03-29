import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function LoginPage(props: any) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(false);
  const [verificationLinkSent, setVerificationLinkSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data: { [x: string]: any; }) => {
    // console.log(data);
    if (loading) return;
    setLoading(true);
    let result = await signIn("email", {
      redirect: false,
      email: data["email"],
      callbackUrl: "/admin",
    });
    setLoading(false);

    if (result.url === null || result.error !== null || !result.ok) {
      setVerificationLinkSent(false);
      setError("email", {});
      return;
    }

    setVerificationLinkSent(true);
  };

  if (status === "authenticated") {
    router.push(session.user.role === "ADMIN" ? "/admin" : "/");
    return null;
  }

  return (
    <div className="pt-12 flex flex-col justify-start items-center min-h-screen space-y-4 text-gray-900 bg-gray-50">
      <Head>
        <title>Login | Embrandiri&#39;s Kitchen</title>
      </Head>
      <div className="flex justify-center items-center">
        <svg
          className="h-24 w-24 text-[#5B9270]"
          viewBox="0 0 64 64"
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
        <h3 className="font-normal text-2xl text-[#5B9270]">
          Embrandiri&#39;s Kitchen
        </h3>
      </div>
      {verificationLinkSent && (
        <div className="mt-4 px-4 py-2 block w-full sm:max-w-md text-base font-medium text-left text-green-900 bg-green-100 rounded whitespace-nowrap text-ellipsis overflow-hidden">
          <span>A verification link has been sent to your email address.</span>
        </div>
      )}
      {errors["email"] && (
        <div className="mt-4 px-4 py-2 block w-full sm:max-w-md text-base font-medium text-left text-red-900 bg-red-100 rounded whitespace-nowrap text-ellipsis overflow-hidden">
          <span>An error has occured! Please try again later.</span>
        </div>
      )}
      <div className="px-4 py-6 bg-white rounded shadow-md w-full max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-slate-500 text-sm" htmlFor="email">
              Sign in with your Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoFocus
              required
              {...register("email")}
              className="relative w-full p-2 mt-2 text-left text-gray-900 sm:text-sm ring-2 ring-opacity-50 ring-gray-200 placeholder-gray-500 rounded-sm cursor-default focus:outline-none focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`relative w-full p-3 flex justify-center uppercase tracking-widest text-sm text-white bg-[#5B9270] hover:bg-[#79ad8d] rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] focus:bg-[#79ad8d] transition duration-200${
              loading
                ? " bg-gray-300 hover:bg-gray-300 focus:bg-gray-300 cursor-not-allowed"
                : ""
            }`}
          >
            {loading && (
              <svg
                className="animate-spin mr-3 h-5 w-5 text-white"
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
            )}
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
}
