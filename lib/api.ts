import useSWR from "swr";
import { useSession } from "next-auth/react";

export const gql = String.raw;

const fetcher = async (args: {
  query: string;
  variables: { [K: string]: string };
}) => {
  const options = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(args),
  };
  const res = await fetch("/api/graphql", options);
  const res_json = await res.json();
  if (res_json.errors) {
    throw JSON.stringify(res_json.errors);
  }
  return res_json.data;
};

export async function toggleWishlistItem(id: string) {
  return await fetcher({
    query: gql`
      mutation ToggleWishlistItem($id: String!) {
        toggleWishlistItem(id: $id)
      }
    `,
    variables: {
      id,
    },
  });
}

export function useProducts() {
  const { status: loginStatus } = useSession();

  const { data, error, mutate } = useSWR(
    {
      query: gql`
        query {
          products {
            id
            name
            imageUrl
            isWishlisted
            price
          }
        }
      `,
    },
    fetcher
  );

  return {
    products: data ? data.products : null,
    error,
    toggleWishlist: async (id: string) => {
      if (loginStatus === "loading" || loginStatus === "unauthenticated") {
        console.error("You must be logged in to add a product to wishlist");
        return;
      }

      await toggleWishlistItem(id);

      mutate({
        ...data,
        products: [
          ...data.products.map((p) => ({
            ...p,
            isWishlisted: p.id === id ? !p.isWishlisted : p.isWishlisted,
          })),
        ],
      });
    },
  };
}
