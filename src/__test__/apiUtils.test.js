/* eslint-disable no-undef */
// apiUtils.test.js
import { fetchProducts, fetchCategories } from "../utils/apiUtils";

// Mock the global fetch function
global.fetch = jest.fn();

describe("API Utils", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe("fetchProducts", () => {
    it("fetches products successfully", async () => {
      const mockProducts = [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      });

      const result = await fetchProducts();

      expect(fetch).toHaveBeenCalledWith("https://fakestoreapi.com/products");
      expect(result).toEqual(mockProducts);
    });

    it("throws an error when the fetch fails", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchProducts()).rejects.toThrow("Failed to fetch products");
    });
  });

  describe("fetchCategories", () => {
    it("fetches categories successfully", async () => {
      const mockCategories = ["Category 1", "Category 2"];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCategories),
      });

      const result = await fetchCategories();

      expect(fetch).toHaveBeenCalledWith(
        "https://fakestoreapi.com/products/categories"
      );
      expect(result).toEqual(mockCategories);
    });

    it("throws an error when the fetch fails", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchCategories()).rejects.toThrow(
        "Failed to fetch categories"
      );
    });
  });
});
