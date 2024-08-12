/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

// eslint-disable-next-line react/display-name
jest.mock("./pages/entry", () => () => (
  <div>Mocked EcommerceProductCatalog</div>
));

// eslint-disable-next-line no-undef
test("renders EcommerceProductCatalog wrapped in CartProvider", () => {
  const { getByText } = render(<App />);
  // eslint-disable-next-line no-undef
  expect(getByText("Mocked EcommerceProductCatalog")).toBeInTheDocument();
});
