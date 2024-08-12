/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Cart } from "../components/ShoppingCart";

describe("Cart", () => {
  const mockCart = [
    { id: 1, title: "Product 1", price: 10, quantity: 2, image: "image1.jpg" },
    { id: 2, title: "Product 2", price: 20, quantity: 1, image: "image2.jpg" },
  ];
  const mockRemoveFromCart = jest.fn();
  const mockToggleCart = jest.fn();
  const mockUpdateQuantity = jest.fn();

  it("renders cart items and total price", () => {
    render(
      <Cart
        cart={mockCart}
        removeFromCart={mockRemoveFromCart}
        isCartOpen={true}
        toggleCart={mockToggleCart}
        updateQuantity={mockUpdateQuantity}
      />
    );

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Total: $40.00")).toBeInTheDocument();
  });

  it("calls removeFromCart when Remove button is clicked", () => {
    render(
      <Cart
        cart={mockCart}
        removeFromCart={mockRemoveFromCart}
        isCartOpen={true}
        toggleCart={mockToggleCart}
        updateQuantity={mockUpdateQuantity}
      />
    );

    fireEvent.click(screen.getAllByText("Remove")[0]);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  it("displays empty cart message when cart is empty", () => {
    render(
      <Cart
        cart={[]}
        removeFromCart={mockRemoveFromCart}
        isCartOpen={true}
        toggleCart={mockToggleCart}
        updateQuantity={mockUpdateQuantity}
      />
    );

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });
});
