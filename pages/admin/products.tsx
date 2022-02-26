import Image from "next/image";
import useSWR from "swr";

import Dashboard from "../../components/dashboard";

const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    role: "Admin",
    email: "jane.cooper@example.com",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  // More people...
];

export default function AdminProductsPage() {
  const { data, error, mutate } = useSWR("/api/products", (url) =>
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json())
  );

  if (error) {
    console.error(error);
    return <Dashboard />;
  }

  if (!data) {
    return <Dashboard />;
  }
  return (
    <Dashboard>
      <h1 className="mb-4 text-3xl text-gray-700">Products</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="overflow-x-auto w-full my-2 -mr-96 rounded-lg shadow bg-white">
        <table className="max-w-full w-full whitespace-nowrap divide-y divide-gray-200 overflow-hidden">
          <thead>
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
                Created At
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stock
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="relative flex-shrink-0 h-10 w-10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <Image
                        className="h-10 w-10 rounded-full object-cover overflow-hidden"
                        src={product.imageUrl}
                        placeholder="blur"
                        blurDataURL={`/_next/image?url=${product.imageUrl}&w=16&q=1`}
                        alt={product.name}
                        loading="lazy"
                        layout="fill"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.tags}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                  {new Date(product.createdAt).toLocaleString(undefined, {
                    hour12: true,
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.stock ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      In Stock
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Out of Stock
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.price}
                </td>
                <td className="px-6 py-4 space-x-2 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={(e) => {
                      if (!confirm("Are you sure?")) return;
                      mutate(
                        data.filter((u) => u.id !== product.id),
                        false
                      );
                      fetch("/api/products/" + product.id, {
                        method: "DELETE",
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          console.log("Deleted product", data);
                          mutate();
                        })
                        .catch((err) => {
                          console.error(err);
                          mutate();
                        });
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Dashboard>
  );
}
