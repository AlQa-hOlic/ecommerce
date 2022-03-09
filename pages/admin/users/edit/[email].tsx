import { useState } from "react";
import Error from "next/error";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useSWR from "swr";

import { User } from "@prisma/client";
import Breadcrumb from "../../../../components/breadcrumb";
import AdminLayout from "../../../../layouts/admin-layout";

export default function AdminEditProductPage(props) {
  const router = useRouter();
  const {
    data: user,
    error,
    mutate,
  } = useSWR<User>(`/api/users/${router.query.email}`, async (url) => {
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
  });

  if (error) {
    return <Error statusCode={500} />;
  }

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
              text: "Users",
              href: "/admin/users",
            },
            {
              text: "Edit User",
            },
          ]}
        />
        <div className="my-4 py-4 bg-white rounded shadow overflow-hidden">
          {user ? (
            <UserForm {...user} mutate={mutate} />
          ) : (
            <svg viewBox="0 0 769 286" fill="none" className="w-full">
              <path d="M21 26H747V40H21V26Z" fill="#E5E5E5"></path>
              <path d="M21 70H747V84H21V70Z" fill="#E5E5E5"></path>
              <path d="M21 114H747V128H21V114Z" fill="#E5E5E5"></path>
              <path d="M21 158H747V172H21V158Z" fill="#E5E5E5"></path>
              <path d="M21 202H747V216H21V202Z" fill="#E5E5E5"></path>
              <path d="M21 246H747V260H21V246Z" fill="#E5E5E5"></path>
            </svg>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

function UserForm(props) {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: props.name,
      role: props.role === "ADMIN",
      email: props.email,
    },
  });
  const onSubmit = async (data) => {
    try {
      // console.log(data);
      //   setLoading(true);

      const response = await (
        await fetch(`/api/users/${props.email}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            role: data.role ? "ADMIN" : "USER",
          }),
        })
      ).json();

      if (response.status === "error") {
        setSuccess(false);
        setError(true);
        return;
      }

      props?.mutate();
      reset({
        ...data,
        email: props.email,
      });
      //   setLoading(false);
      setError(false);
      setSuccess(true);
      reset();
    } catch (e) {
      console.error(e);
      //   setLoading(false);
      setSuccess(false);
      setError(true);
    }
  };

  return (
    <form
      className="flex flex-col px-4 space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {success && (
        <div className="px-4 py-2 block w-full text-base font-medium text-left text-green-900 bg-green-100 rounded whitespace-nowrap text-ellipsis overflow-hidden">
          <span>User has been modified!</span>
        </div>
      )}
      {error && (
        <div className="px-4 py-2 block w-full text-base font-medium text-left text-red-900 bg-red-100 rounded whitespace-nowrap text-ellipsis overflow-hidden">
          <span>Unknown error! Please try again later.</span>
        </div>
      )}
      <div>
        <label className="block text-slate-500 text-sm" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          autoFocus
          {...register("name", {
            required: "Name is required",
            maxLength: {
              value: 30,
              message: "Maximum 30 characters",
            },
          })}
          className="relative w-full p-2 mt-2 text-left text-gray-900 sm:text-sm ring-2 ring-opacity-50 ring-gray-200 placeholder-gray-500 rounded-sm cursor-default focus:outline-none focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-slate-500 text-sm" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="text"
          name="email"
          {...register("email", {
            disabled: true,
            required: "Email is required",
            maxLength: {
              value: 40,
              message: "Maximum 40 characters",
            },
          })}
          className="relative w-full p-2 mt-2 text-left text-gray-900 sm:text-sm ring-2 ring-opacity-50 ring-gray-200 placeholder-gray-500 rounded-sm cursor-default focus:outline-none focus:ring-[#5B9270] transition duration-200 ease-linear overflow-hidden"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="role"
            aria-describedby="role"
            type="checkbox"
            className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-[#5B9270]"
            {...register("role", {
              value: props.role === "ADMIN",
            })}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="stock" className="font-medium text-slate-500 text-sm">
            Is Admin
          </label>
        </div>
      </div>
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-3 md:space-y-0">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`relative p-3 flex justify-center uppercase tracking-widest text-sm text-white bg-[#5B9270] hover:bg-[#79ad8d] rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] focus:bg-[#79ad8d] transition duration-200${
            isSubmitting
              ? " bg-gray-300 hover:bg-gray-300 focus:bg-gray-300 cursor-not-allowed"
              : ""
          }`}
        >
          {isSubmitting && (
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
          Update User
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (!confirm("Are you sure?")) return;
            fetch("/api/users/" + props.email, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.status === "ok") {
                  console.log("Deleted user", data);
                  router.push("/admin/users");
                }
              })
              .catch((err) => {
                console.error(err);
              });
          }}
          className={`relative p-3 flex justify-center uppercase tracking-widest text-sm text-red-400 border-1 hover:text-white hover:bg-red-500 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[#5B9270] focus:bg-[#79ad8d] transition duration-200${
            isSubmitting
              ? " bg-red-100 hover:bg-red-100 hover:text-red-400 focus:bg-red-100 cursor-not-allowed"
              : ""
          }`}
        >
          Delete User
        </button>
      </div>
    </form>
  );
}
