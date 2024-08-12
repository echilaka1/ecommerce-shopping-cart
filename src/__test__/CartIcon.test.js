/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CartIcon } from "../components/CartIcon";

describe("CartIcon", () => {
  const mockToggleCart = jest.fn();

  it("renders cart icon with no items", () => {
    render(<CartIcon toggleCart={mockToggleCart} cart={[]} />);
    expect(screen.queryByText(/\d+/)).not.toBeInTheDocument();
  });

  it("renders cart icon with item count", () => {
    const mockCart = [{ quantity: 2 }, { quantity: 1 }];
    render(<CartIcon toggleCart={mockToggleCart} cart={mockCart} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("calls toggleCart when clicked", () => {
    render(<CartIcon toggleCart={mockToggleCart} cart={[]} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockToggleCart).toHaveBeenCalled();
  });
});
