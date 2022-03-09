import { useRouter } from "next/router";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import AdminLayout from "../../layouts/admin-layout";
import prisma from "../../prisma/client";

const colors = [
  "#003f5c",
  "#2f4b7c",
  "#665191",
  "#a05195",
  "#d45087",
  "#f95d6a",
  "#ff7c43",
  "#ffa600",
  "#00876c",
  "#439981",
  "#6aaa96",
  "#8cbcac",
  "#aecdc2",
];

export default function AdminPage(props) {
  const router = useRouter();
  const { pieChartData, lineChartData } = props;
  console.log(lineChartData);
  return (
    <AdminLayout>
      <div className="w-full mt-8 px-4 flex flex-col">
        <h1 className="mb-4 text-3xl text-gray-700">Dashboard</h1>
        <div className="my-2 mx-auto w-full flex flex-wrap">
          {[
            {
              title: "Users",
              count: 34,
              color: "bg-red-100 text-red-600",
              icon: (
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ),
            },
            {
              title: "Products",
              count: 25,
              color: "bg-sky-100 text-sky-600",
              icon: (
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
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              ),
            },
            {
              title: "Orders",
              count: 126,
              color: "bg-amber-100 text-amber-600",
              icon: (
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              ),
            },
            {
              title: "Total Sales",
              count: 23423,
              color: "bg-green-100 text-green-600",
              icon: (
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
                    d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
            },
          ].map(({ title, count, icon, color }) => (
            <div key={title} className="w-full px-2 md:w-2/4 lg:w-1/4">
              <div className="mb-4 relative break-words rounded-lg overflow-hidden shadow-sm bg-white">
                <div className="px-6 py-6 relative flex justify-between">
                  <div className="relative">
                    <h5 className="uppercase font-semibold text-xs  text-gray-500 whitespace-nowrap text-ellipsis overflow-hidden">
                      <small>{title}</small>
                    </h5>
                    <span className="mb-0 font-semibold text-md text-lg text-current">
                      {count.toLocaleString()}
                    </span>
                  </div>
                  <button
                    className={`${color} overflow-hidden rounded-full flex justify-center items-center w-12 h-12 focus:outline-none`}
                  >
                    {icon}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <h1 className="mb-4 text-2xl text-gray-500">Sales Summary</h1> */}
        <div className="p-4 grid grid-cols-1 gap-4 lg:grid-cols-3 rounded bg-white shadow">
          <div className="col-span-1">
            <ResponsiveContainer className="p-2 relative" height={324}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <h3 className="mt-2 text-center text-sm text-gray-400">
              Product Price Summary
            </h3>
          </div>
          <div className="col-span-2">
            <ResponsiveContainer className="p-2 relative" height={324}>
              <LineChart data={lineChartData}>
                <Line
                  type="monotone"
                  dataKey="orderValue"
                  name="Order Value"
                  stroke={colors[0]}
                  activeDot={{
                    className: "cursor-pointer",
                    r: 8,
                    onClick: (_, e: any) => {
                      router.push(
                        "/admin/orders/view/" + lineChartData[e.index].id
                      );
                    },
                  }}
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="id" hide />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
              </LineChart>
            </ResponsiveContainer>
            <h3 className="mt-2 text-center text-sm text-gray-400">
              Sales Summary
            </h3>
          </div>
        </div>
        <div className="my-2 max-w-screen-lg w-full flex flex-col"></div>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps() {
  const products = await prisma.product.findMany({
    take: 8,
    orderBy: {
      price: "desc",
    },
  });

  const orders = await prisma.order.findMany({
    where: {
      status: {
        in: ["ORDER_COMPLETED", "ORDER_CONFIRMED", "PAYMENT_COMPLETED"],
      },
    },
    orderBy: {
      orderProducts: {
        _count: "desc",
      },
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return {
    props: {
      pieChartData: products.map((product) => ({
        name: product.name,
        value: product.price,
      })),
      lineChartData: orders.map((order) => ({
        id: order.id,
        orderValue: order.orderProducts.reduce(
          (amount, orderProduct) =>
            amount + orderProduct.quantity * orderProduct.product.price,
          0
        ),
      })),
    },
  };
}
