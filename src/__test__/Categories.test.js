/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CategoryFilter } from "../components/Categories";

describe("CategoryFilter", () => {
  const mockCategories = ["electronics", "clothing", "books"];
  const mockOnSelectCategory = jest.fn();

  it("renders all categories", () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory=""
        onSelectCategory={mockOnSelectCategory}
      />
    );

    expect(screen.getByText("All Categories")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Clothing")).toBeInTheDocument();
    expect(screen.getByText("Books")).toBeInTheDocument();
  });

  it("calls onSelectCategory when a category is selected", () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory=""
        onSelectCategory={mockOnSelectCategory}
      />
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "electronics" },
    });
    expect(mockOnSelectCategory).toHaveBeenCalledWith("electronics");
  });

  it("displays the selected category", () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="clothing"
        onSelectCategory={mockOnSelectCategory}
      />
    );

    expect(screen.getByRole("combobox")).toHaveValue("clothing");
  });
});
