import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Loading from "../components/loading";

export default function DefaultLayout(props) {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  //   if (status === "unauthenticated") {
  //     router.push("/login");
  //     return null;
  //   }

  if (session?.user?.role === "ADMIN") {
    router.push("/admin");
    return null;
  }

  return (
    <div className="flex justify-start items-stretch bg-gray-50">
      <div className="flex flex-col grow min-h-screen">
        <main className="w-full grow flex flex-col justify-start items-start">
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
