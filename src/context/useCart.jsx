import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || {};
  });

  const addItemToCart = (name) => {
    let newCart = { ...cartItems, [name]: 1 };
    setCartItems({ ...newCart });
    localStorage.setItem("cart", JSON.stringify({ ...newCart }));
  };

  const deleteCartItem = (name) => {
    const newCart = { ...cartItems };
    delete newCart[name];
    setCartItems({ ...newCart });
    localStorage.setItem("cart", JSON.stringify({ ...newCart }));
  };

  const updateCartItemCount = (name, count) => {
    const newCart = { ...cartItems, [name]: count };
    setCartItems({ ...newCart });
    localStorage.setItem("cart", JSON.stringify({ ...newCart }));
  };

  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        deleteCartItem,
        updateCartItemCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
