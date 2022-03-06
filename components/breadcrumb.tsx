import Link from "next/link";
import { ReactNode } from "react";

export interface BreadcrumbProps {
  items: {
    icon?: ReactNode;
    text: string;
    href?: string;
  }[];
}
export default function Breadcrumb(props: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {props.items.map((item, index) =>
          index !== props.items.length - 1 ? (
            <li className="inline-flex items-center" key={item.text}>
              <Link href={item.href || "#"}>
                <a className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  {item.icon}
                  {item.text}
                </a>
              </Link>
            </li>
          ) : (
            <li aria-current="page" key={item.text}>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-400 md:ml-2">
                  {item.icon}
                  {item.text}
                </span>
              </div>
            </li>
          )
        )}
      </ol>
    </nav>
  );
}
