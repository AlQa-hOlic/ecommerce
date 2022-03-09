import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";

import AdminLayout from "../../../../layouts/admin-layout";
import Breadcrumb from "../../../../components/breadcrumb";
import prisma from "../../../../prisma/client";

export default function AdminViewOrderPage(props) {
  const router = useRouter();
  const { order } = props;
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
              href: "/admin/orders",
            },
            {
              text: "View Order",
            },
          ]}
        />
        <div className="mt-6 mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl text-slate-700">Order {order.id}</h1>
            <p className="text-lg text-slate-500">
              {new Date(order.createdAt).toLocaleString(undefined, {
                hour12: true,
                dateStyle: "short",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>
        <div
          className={`px-4 py-4 space-x-4 block w-full text-base font-medium text-left rounded whitespace-nowrap text-ellipsis overflow-hidden ${
            order.status === "PAYMENT_COMPLETED"
              ? "text-green-900 bg-green-50"
              : order.status === "PAYMENT_INITIATED"
              ? "text-yellow-900 bg-yellow-50"
              : order.status === "ORDER_COMPLETED"
              ? "text-slate-900 bg-slate-200"
              : order.status === "ORDER_CONFIRMED"
              ? "text-sky-900 bg-sky-200"
              : "text-red-900 bg-red-50"
          }`}
        >
          <span>{order.status}</span>
        </div>
        {order.status === "PAYMENT_COMPLETED" ||
        order.status === "ORDER_CONFIRMED" ? (
          <div className="py-4 flex space-x-4">
            {order.status === "PAYMENT_COMPLETED" ? (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  if (!confirm("Are you sure?")) return;
                  fetch("/api/orders/" + order.id, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      status: "ORDER_CONFIRMED",
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.status === "ok") {
                        router.push("/admin/orders");
                      } else {
                      }
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                }}
                className="px-3 py-2 rounded cursor-pointer text-white bg-slate-600 hover:bg-slate-800 focus:bg-slate-800"
              >
                Confirm order
              </a>
            ) : (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  if (!confirm("Are you sure?")) return;
                  fetch("/api/orders/" + order.id, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      status: "ORDER_COMPLETED",
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.status === "ok") {
                        router.push("/admin/orders");
                      } else {
                      }
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                }}
                className="px-3 py-2 rounded cursor-pointer text-white bg-slate-600 hover:bg-slate-800 focus:bg-slate-800"
              >
                Complete order
              </a>
            )}
            <a
              onClick={(e) => {
                e.preventDefault();
                if (!confirm("Are you sure?")) return;
                fetch("/api/orders/" + order.id, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    status: "ORDER_CANCELLED",
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.status === "ok") {
                      router.push("/admin/orders");
                    } else {
                    }
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }}
              className="px-3 py-2 rounded cursor-pointer text-white bg-red-400 hover:bg-red-500 focus:bg-red-500"
            >
              Cancel Order
            </a>
          </div>
        ) : null}
        <div className="my-4 bg-white rounded shadow overflow-hidden">
          <div className="w-full max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-20rem-2rem)] overflow-scroll">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Quantity
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.orderProducts.map((orderProduct) => (
                  <tr key={orderProduct.product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="relative flex-shrink-0 h-10 w-10">
                          <Image
                            className="h-10 w-10 rounded-full object-cover overflow-hidden"
                            src={orderProduct.product.imageUrl}
                            placeholder="blur"
                            blurDataURL={`/_next/image?url=${orderProduct.product.imageUrl}&w=16&q=1`}
                            alt={orderProduct.product.name}
                            loading="lazy"
                            layout="fill"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {orderProduct.product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {orderProduct.product.sku}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {orderProduct.product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {orderProduct.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(
                        orderProduct.product.price * orderProduct.quantity
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">
                    {order.orderProducts
                      .reduce(
                        (amount, orderProduct) =>
                          amount +
                          orderProduct.product.price * orderProduct.quantity,
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <h1 className="text-xl text-slate-700">User Details</h1>
        <div className="my-4 bg-white rounded shadow overflow-hidden">
          <div className="w-full max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-20rem-2rem)] overflow-scroll">
            <table className="min-w-full divide-y divide-gray-200">
              <tr>
                <th
                  scope="row"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.userName}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.userEmail}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Address
                </th>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.address}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  City
                </th>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.city}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  State
                </th>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.state}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Pincode
                </th>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.pin}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Phone number
                </th>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.phone}
                </td>
              </tr>
            </table>
          </div>
        </div>
        {/* <pre>{JSON.stringify(order, null, 4)}</pre> */}
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (typeof context.query.id !== "string") {
    throw Error("Invalid Order ID");
  }
  const order = await prisma.order.findUnique({
    where: { id: context.query.id },
    include: { orderProducts: { include: { product: true } } },
  });
  return {
    props: {
      order: {
        ...order,
        createdAt: order.createdAt.getTime(),
        updatedAt: order.updatedAt.getTime(),
        orderProducts: order.orderProducts.map((orderProduct) => ({
          ...orderProduct,
          product: {
            ...orderProduct.product,
            createdAt: orderProduct.product.createdAt.getTime(),
            updatedAt: orderProduct.product.updatedAt.getTime(),
          },
        })),
      },
    },
  };
}
