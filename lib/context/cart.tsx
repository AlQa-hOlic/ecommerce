import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext({
  items: [],
  setItems: (items) => void 0,
  itemCount: 0,
});

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, _setItems] = useState([]);

  const setItems = (_items) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cart", JSON.stringify(_items));
    }
    _setItems(_items);
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem("cart");
      // Parse stored json or if none return initialValue
      if (item) {
        _setItems(JSON.parse(item));
      }
    } catch (error) {
      // If error also return initialValue
      console.log(error);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        setItems,
        itemCount: items.reduce(
          (count, item) => count + (item?.quantity ? item.quantity : 1),
          0
        ),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
