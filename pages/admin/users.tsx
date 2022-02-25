import useSWR from "swr";
import Dashboard from "../../components/dashboard";

export default function AdminUsersPage() {
  const { data, error, mutate } = useSWR("/api/users", (url) =>
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
      <h1 className="mb-4 text-3xl text-gray-700">Users</h1>
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
                Role
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col items-start justify-center">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name || (
                        <span className="text-gray-400">No name Specified</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                  {new Date(user.createdAt).toLocaleString(undefined, {
                    hour12: true,
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role === "ADMIN" ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Admin
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      User
                    </span>
                  )}
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
                        data.filter((u) => u.id !== user.id),
                        false
                      );
                      fetch("/api/users/" + user.id, {
                        method: "DELETE",
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          console.log("Deleted user", data);
                          mutate();
                        })
                        .catch((err) => {
                          console.error(err);
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
