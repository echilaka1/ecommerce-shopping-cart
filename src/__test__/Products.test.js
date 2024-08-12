/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Product } from "../components/Products";

describe("Product", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 9.99,
    category: "electronics",
    image: "test-image.jpg",
  };
  const mockAddToCart = jest.fn();
  const mockSetSelectedProduct = jest.fn();

  it("renders product details", () => {
    render(
      <Product
        product={mockProduct}
        addToCart={mockAddToCart}
        setSelectedProduct={mockSetSelectedProduct}
      />
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$9.99")).toBeInTheDocument();
    expect(screen.getByText("electronics")).toBeInTheDocument();
  });

  it("calls addToCart when Add to Cart button is clicked", () => {
    render(
      <Product
        product={mockProduct}
        addToCart={mockAddToCart}
        setSelectedProduct={mockSetSelectedProduct}
      />
    );

    fireEvent.click(screen.getByText("Add to Cart"));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it("calls setSelectedProduct when product is clicked", () => {
    render(
      <Product
        product={mockProduct}
        addToCart={mockAddToCart}
        setSelectedProduct={mockSetSelectedProduct}
      />
    );

    fireEvent.click(screen.getByText("Test Product"));
    expect(mockSetSelectedProduct).toHaveBeenCalledWith(mockProduct);
  });
});
