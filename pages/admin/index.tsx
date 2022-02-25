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

export default function AdminPage() {
  return (
    <Dashboard>
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
                Title
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
                Role
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {people.map((person) => (
              <tr key={person.email}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="h-10 w-10 rounded-full"
                        src={person.image}
                        alt={person.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {person.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {person.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.title}</div>
                  <div className="text-sm text-gray-500">
                    {person.department}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {person.role}
                </td>
                <td className="px-6 py-4 space-x-2 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </a>
                  <a href="#" className="text-red-600 hover:text-red-900">
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Dashboard>
  );
}
