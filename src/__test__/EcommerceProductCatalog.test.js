/* eslint-disable no-undef */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EcommerceProductCatalog from "../pages/entry";
import { CartContext } from "../context/CartContext";
import { fetchProducts, fetchCategories } from "../utils/apiUtils";

// Mock the dependencies
jest.mock("../utils/apiUtils");
jest.mock("../components/ShoppingCart", () => ({
  Cart: () => <div>Cart Component</div>,
}));
jest.mock("../components/Products", () => ({
  Product: () => <div>Product Component</div>,
}));
jest.mock("../components/CartIcon", () => ({
  CartIcon: () => <div>Cart Icon</div>,
}));
jest.mock("../components/Categories", () => ({
  CategoryFilter: () => <div>Category Filter</div>,
}));
jest.mock("../components/ProductDetails", () => ({
  ProductDetail: () => <div>Product Detail</div>,
}));

const mockCartContext = {
  cart: [],
  removeFromCart: jest.fn(),
  isCartOpen: false,
  toggleCart: jest.fn(),
  updateQuantity: jest.fn(),
  addToCart: jest.fn(),
};

const mockProducts = [
  { id: 1, title: "Product 1", category: "Category 1" },
  { id: 2, title: "Product 2", category: "Category 2" },
];

const mockCategories = ["Category 1", "Category 2"];

describe("EcommerceProductCatalog", () => {
  beforeEach(() => {
    fetchProducts.mockResolvedValue(mockProducts);
    fetchCategories.mockResolvedValue(mockCategories);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <EcommerceProductCatalog />
      </CartContext.Provider>
    );

    expect(screen.getByText("Loading products...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading products...")).not.toBeInTheDocument();
    });
  });

  it("renders products after loading", async () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <EcommerceProductCatalog />
      </CartContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Product Component")).toHaveLength(2);
    });
  });

  it("renders error message when fetching fails", async () => {
    const errorMessage = "Failed to fetch data";
    fetchProducts.mockRejectedValue(new Error(errorMessage));

    render(
      <CartContext.Provider value={mockCartContext}>
        <EcommerceProductCatalog />
      </CartContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it("filters products based on search term", async () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <EcommerceProductCatalog />
      </CartContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Product Component")).toHaveLength(2);
    });

    const searchInput = screen.getByPlaceholderText("Search products...");
    userEvent.type(searchInput, "Product 1");

    await waitFor(() => {
      expect(screen.getAllByText("Product Component")).toHaveLength(1);
    });
  });

  it("displays No products found when no products match the search", async () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <EcommerceProductCatalog />
      </CartContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Product Component")).toHaveLength(2);
    });

    const searchInput = screen.getByPlaceholderText("Search products...");
    userEvent.type(searchInput, "Non-existent Product");

    await waitFor(() => {
      expect(screen.getByText("No products found.")).toBeInTheDocument();
    });
  });

  it("renders CategoryFilter component", async () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <EcommerceProductCatalog />
      </CartContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Category Filter")).toBeInTheDocument();
    });
  });

  it("renders CartIcon component", async () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <EcommerceProductCatalog />
      </CartContext.Provider>
    );

    expect(screen.getByText("Cart Icon")).toBeInTheDocument();
  });

  it("renders Cart component", async () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <EcommerceProductCatalog />
      </CartContext.Provider>
    );

    expect(screen.getByText("Cart Component")).toBeInTheDocument();
  });
});
