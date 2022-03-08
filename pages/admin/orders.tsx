import { Order } from "@prisma/client";
import { useState } from "react";
import useSWR from "swr";
import Breadcrumb from "../../components/breadcrumb";
import AdminLayout from "../../layouts/admin-layout";

export default function AdminUsersPage(props) {
  const [filterInput, setFilterInput] = useState("");
  const [filter, setFilter] = useState("");
  const { data: orders, error } = useSWR<Order[]>(
    `/api/orders?page=${1}${
      filter && filter.trim() !== "" ? "&q=" + filter : ""
    }`,
    async (url) => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // await new Promise((res) => setTimeout(res, 40000));
      // throw new Error("Hello, world!");
      const { status, msg, data } = await response.json();
      if (status !== "ok") {
        // console.error(msg);
        throw new Error(msg);
      }
      return data;
    }
  );

  return (
    <AdminLayout>
      <div className="w-full p-4 flex flex-col">
        <Breadcrumb
          items={[
            {
              text: "Dashboard",
              icon: (
                <svg
                  className="mr-2 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
              ),
              href: "/admin",
            },
            {
              text: "Orders",
            },
          ]}
        />
        <div className="my-4 bg-white rounded shadow overflow-hidden">
          <div className="flex items-center p-4 space-x-2">
            <form
              className="relative"
              onSubmit={(e) => {
                e.preventDefault();
                setFilter(filterInput);
              }}
            >
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="w-80 pl-10 p-2.5 rounded-sm cursor-default text-left sm:text-sm text-gray-900 placeholder-gray-500 bg-gray-50 ring-2 ring-opacity-50 ring-gray-200 focus:outline-none focus:ring-[#5B9270] transition duration-200 ease-linear"
                placeholder="Search for orders"
                value={filterInput}
                onChange={(e) => setFilterInput(e.target.value)}
              />
            </form>
          </div>
          <div className="w-full max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-20rem-2rem)] overflow-scroll">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created At
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {error ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-red-400">
                      Could not fetch orders! Try again later.
                    </td>
                  </tr>
                ) : orders ? (
                  orders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-4 text-gray-400"
                      >
                        No results found!
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.id || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.userEmail}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.status === "PAYMENT_COMPLETED" ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Payment Completed
                            </span>
                          ) : order.status === "PAYMENT_ERROR" ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Payment Error
                            </span>
                          ) : order.status === "PAYMENT_INITIATED" ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Payment Initiated
                            </span>
                          ) : order.status === "ORDER_CONFIRMED" ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Order Confirmed
                            </span>
                          ) : order.status === "ORDER_COMPLETED" ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              Order Completed
                            </span>
                          ) : order.status === "ORDER_CANCELLED" ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              Order Cancelled
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              {order.status}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleString(undefined, {
                            hour12: true,
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href="#"
                            className="text-gray-400 hover:text-[#79ad8d] focus:text-[#79ad8d]"
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
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            <span className="sr-only">Edit</span>
                          </a>
                        </td>
                      </tr>
                    ))
                  )
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <svg viewBox="0 0 769 286" fill="none">
                        <path d="M21 26H747V40H21V26Z" fill="#E5E5E5"></path>
                        <path d="M21 70H747V84H21V70Z" fill="#E5E5E5"></path>
                        <path d="M21 114H747V128H21V114Z" fill="#E5E5E5"></path>
                        <path d="M21 158H747V172H21V158Z" fill="#E5E5E5"></path>
                        <path d="M21 202H747V216H21V202Z" fill="#E5E5E5"></path>
                        <path d="M21 246H747V260H21V246Z" fill="#E5E5E5"></path>
                      </svg>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className="my-2 flex flex-col items-center">
          <span className="text-sm text-gray-700">
            Showing <span className="font-semibold text-gray-900">1</span> to{" "}
            <span className="font-semibold text-gray-900">10</span> of{" "}
            <span className="font-semibold text-gray-900">100</span> Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-r border-0 hover:bg-gray-100 hover:text-gray-700">
              <svg
                className="mr-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Prev
            </button>
            <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-r border-0 hover:bg-gray-100 hover:text-gray-700">
              Next
              <svg
                className="ml-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div> */}
      </div>
    </AdminLayout>
  );
}
