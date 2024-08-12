/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductDetail } from "../components/ProductDetails";

describe("ProductDetail", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    description: "This is a test product",
    price: 9.99,
    category: "electronics",
    image: "test-image.jpg",
    rating: { rate: 4.5, count: 100 },
  };
  const mockOnClose = jest.fn();
  const mockOnAddToCart = jest.fn();

  it("renders product details", () => {
    render(
      <ProductDetail
        product={mockProduct}
        onClose={mockOnClose}
        onAddToCart={mockOnAddToCart}
      />
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("This is a test product")).toBeInTheDocument();
    expect(screen.getByText("$9.99")).toBeInTheDocument();
    expect(screen.getByText("Category: electronics")).toBeInTheDocument();
    expect(screen.getByText("4.5 (100 reviews)")).toBeInTheDocument();
  });

  it("calls onAddToCart when Add to Cart button is clicked", () => {
    render(
      <ProductDetail
        product={mockProduct}
        onClose={mockOnClose}
        onAddToCart={mockOnAddToCart}
      />
    );

    fireEvent.click(screen.getByText("Add to Cart"));
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
