import { Role } from "@prisma/client";
import { useState } from "react";
import useSWR from "swr";

import Dashboard from "../../components/dashboard";
import Modal from "../../components/modal";

export default function AdminUsersPage() {
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const { data, error, mutate } = useSWR("/api/users", (url) =>
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json())
  );

  if (error) {
    // console.error(error);
    return (
      <Dashboard>
        <div className="w-full h-96 flex justify-center items-center text-gray-500 border-4 border-dashed border-red-200 rounded-lg">
          Failed to fetch users!
        </div>
      </Dashboard>
    );
  }

  if (!data) {
    return <Dashboard />;
  }

  return (
    <Dashboard>
      <Modal
        title="Are you sure?"
        open={deleteUser !== null}
        setOpen={(val) => {
          if (!val) setDeleteUser(null);
        }}
      >
        <div className="flex flex-col justify-end py-4">
          <p className="mb-4 text-gray-700 min-w-[32rem]">
            User will be deleted permanently!
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => {
                setDeleteUser(null);
              }}
              className="relative p-2 flex justify-center uppercase tracking-widest text-sm text-white bg-gray-600 hover:bg-gray-500 rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                mutate(
                  data.filter((u) => u.id !== deleteUser.id),
                  false
                );
                setDeleteUser(null);
                fetch("/api/users/" + deleteUser.email, {
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
              className="relative p-2 flex justify-center uppercase tracking-widest text-sm text-white bg-[#5B9270] hover:bg-[#79ad8d] rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] transition duration-200"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        title="Edit User"
        open={editUser !== null}
        setOpen={(val) => {
          if (!val) setEditUser(null);
        }}
      >
        <EditUserForm
          user={editUser}
          onSubmit={async (body) => {
            mutate(
              data.map((user) => {
                if (user.email === editUser.email) {
                  return {
                    ...user,
                    name:
                      typeof body.name !== "undefined" ? body.name : user.name,
                    role: body.role,
                  };
                }
                return user;
              }),
              false
            );
            await fetch("/api/users/" + editUser.email, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
            setEditUser(null);
            mutate();
          }}
        />
      </Modal>
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
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => {
                      setEditUser(user);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={(e) => {
                      setDeleteUser(user);
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

function EditUserForm(props) {
  const [name, setName] = useState(props.user?.name);
  const [role, setRole] = useState(props.user?.role || Object.values(Role)[0]);
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="flex flex-col space-y-2 md:w-96"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const options = { name: name !== "" ? name : undefined, role };
        await props.onSubmit?.(options);
        setLoading(false);
      }}
    >
      <input
        id="name"
        type="text"
        name="name"
        autoFocus
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="relative p-2 mt-2 text-left text-gray-900 sm:text-sm border-2 border-gray-200 placeholder-gray-500 bg-gray-50 rounded-sm cursor-default focus:outline-none focus:bg-white focus:border-transparent focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
      />
      <select
        id="role"
        name="role"
        className="appearance-none relative p-2 mt-2 text-left text-gray-900 sm:text-sm border-2 border-gray-200 placeholder-gray-500 bg-gray-50 rounded-sm cursor-default focus:outline-none focus:bg-white focus:border-transparent focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
        onChange={(e) => setRole(Object.values(Role)[e.target.selectedIndex])}
        defaultValue={role}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
          backgroundPosition: "right 0.5rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1.5em 1.5em",
          paddingRight: "2.5rem",
        }}
      >
        {Object.values(Role).map((k, i) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={loading}
        className="relative p-3 flex justify-center uppercase tracking-widest text-sm text-white bg-[#5B9270] hover:bg-[#79ad8d] rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] transition duration-200"
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
        Save
      </button>
    </form>
  );
}
