/* eslint-disable no-undef */
import React from "react";
import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { CartProvider, CartContext } from "../context/CartContext";

describe("CartProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("provides initial cart context", () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => React.useContext(CartContext), {
      wrapper,
    });

    expect(result.current.cart).toEqual([]);
    expect(result.current.isCartOpen).toBe(false);
    expect(typeof result.current.addToCart).toBe("function");
    expect(typeof result.current.removeFromCart).toBe("function");
    expect(typeof result.current.updateQuantity).toBe("function");
    expect(typeof result.current.toggleCart).toBe("function");
  });

  test("loads cart from localStorage", () => {
    const initialCart = [{ id: 1, name: "Test Product", quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(initialCart));

    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => React.useContext(CartContext), {
      wrapper,
    });

    expect(result.current.cart).toEqual(initialCart);
  });

  test("addToCart adds a new item to the cart", () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => React.useContext(CartContext), {
      wrapper,
    });

    act(() => {
      result.current.addToCart({ id: 1, name: "Test Product" });
    });

    expect(result.current.cart).toEqual([
      { id: 1, name: "Test Product", quantity: 1 },
    ]);
  });

  test("addToCart increases quantity for existing item", () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => React.useContext(CartContext), {
      wrapper,
    });

    act(() => {
      result.current.addToCart({ id: 1, name: "Test Product" });
      result.current.addToCart({ id: 1, name: "Test Product" });
    });

    expect(result.current.cart).toEqual([
      { id: 1, name: "Test Product", quantity: 2 },
    ]);
  });

  test("removeFromCart removes an item from the cart", () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => React.useContext(CartContext), {
      wrapper,
    });

    act(() => {
      result.current.addToCart({ id: 1, name: "Test Product" });
      result.current.removeFromCart(1);
    });

    expect(result.current.cart).toEqual([]);
  });

  test("updateQuantity updates item quantity", () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => React.useContext(CartContext), {
      wrapper,
    });

    act(() => {
      result.current.addToCart({ id: 1, name: "Test Product" });
      result.current.updateQuantity(1, 3);
    });

    expect(result.current.cart).toEqual([
      { id: 1, name: "Test Product", quantity: 3 },
    ]);
  });

  test("updateQuantity removes item when quantity is less than 1", () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => React.useContext(CartContext), {
      wrapper,
    });

    act(() => {
      result.current.addToCart({ id: 1, name: "Test Product" });
      result.current.updateQuantity(1, 0);
    });

    expect(result.current.cart).toEqual([]);
  });

  test("toggleCart toggles isCartOpen state", () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => React.useContext(CartContext), {
      wrapper,
    });

    expect(result.current.isCartOpen).toBe(false);

    act(() => {
      result.current.toggleCart();
    });

    expect(result.current.isCartOpen).toBe(true);

    act(() => {
      result.current.toggleCart();
    });

    expect(result.current.isCartOpen).toBe(false);
  });

  test("cart is saved to localStorage when updated", () => {
    const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
    const { result } = renderHook(() => React.useContext(CartContext), {
      wrapper,
    });

    act(() => {
      result.current.addToCart({ id: 1, name: "Test Product" });
    });

    expect(JSON.parse(localStorage.getItem("cart"))).toEqual([
      { id: 1, name: "Test Product", quantity: 1 },
    ]);
  });
});
