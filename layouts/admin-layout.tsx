import { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";

const routes = [
  {
    name: "Home",
    href: "/admin",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-3 flex-shrink-0 h-6 w-6 group-hover:text-[#5B9270]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-3 flex-shrink-0 h-6 w-6 group-hover:text-[#5B9270]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-3 flex-shrink-0 h-6 w-6 group-hover:text-[#5B9270]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-3 flex-shrink-0 h-6 w-6 group-hover:text-[#5B9270]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
];

export default function AdminLayout(props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(true);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{
            margin: "auto",
            background: "none",
            display: "block",
            shapeRendering: "auto",
          }}
          width="151px"
          height="151px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <circle
            cx="50"
            cy="50"
            r="32"
            strokeWidth="8"
            stroke="#9ca3af"
            strokeDasharray="50.26548245743669 50.26548245743669"
            fill="none"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="1s"
              keyTimes="0;1"
              values="0 50 50;360 50 50"
            ></animateTransform>
          </circle>
        </svg>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  if (session.user.role !== "ADMIN") {
    router.push("/");
    return null;
  }

  return (
    <div className="flex justify-start items-stretch bg-gray-50">
      <MobileNav open={open} setOpen={setOpen} />
      <Sidebar />
      <div className="flex flex-col grow min-h-screen">
        <Header toggleNav={() => setOpen(!open)} />
        <main className="px-2 lg:px-4 py-4 w-full grow flex flex-col justify-start items-start">
          {props.children ? (
            props.children
          ) : (
            <div className="border-4 border-dashed border-gray-300 rounded-lg w-full h-full flex justify-center items-center text-gray-400 uppercase">
              No content
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function NavItems() {
  const router = useRouter();
  return (
    <nav className="flex-1 px-2 space-y-1">
      {routes.map((item) => (
        <Link href={item.href} key={item.name}>
          <a
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
              router.route === item.href
                ? "text-[#5B9270] cursor-default"
                : "text-gray-600 hover:bg-gray-50 hover:text-[#5B9270]"
            }`}
          >
            {item.icon}
            {item.name}
          </a>
        </Link>
      ))}
    </nav>
  );
}

function MobileNav(props) {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 flex z-40 md:hidden"
        open={props.open}
        onClose={props.setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-100">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => props.setOpen?.(false)}
                >
                  <span className="sr-only">Close sidebar</span>
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 flex items-center px-4">
              <h3 className="font-normal text-xl text-[#5B9270]">
                Embrandiri&#39;s Kitchen
              </h3>
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
              <NavItems />
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function Sidebar(props) {
  return (
    <aside className="hidden md:flex md:shrink-0 min-h-screen max-w-xs w-full border-r border-gray-100">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white">
        <div className="flex items-center flex-shrink-0 px-4">
          <Link href="/admin">
            <a>
              <h3 className="font-normal text-xl text-[#5B9270]">
                Embrandiri&#39;s Kitchen
              </h3>
            </a>
          </Link>
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <NavItems />
        </div>
      </div>
    </aside>
  );
}

function Header(props) {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <header className="px-4 h-16 w-full flex justify-between items-center bg-white border-b border-gray-100">
      <div className="">
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={() => props.toggleNav?.()}
        >
          <span className="sr-only">Open sidebar</span>
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
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
      </div>

      <div className="flex space-x-4">
        <p className="text-gray-400">
          {/* <span className="md:inline hidden">Signed in as </span> */}
          {session.user.name || session.user.email}
        </p>
        <button
          className="text-gray-500"
          onClick={async () => {
            const { url } = await signOut({
              redirect: false,
              callbackUrl: "/login",
            });
            router.push(url);
          }}
        >
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
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
