import React from "react";
import { cleanup, render } from "@testing-library/react";
import "regenerator-runtime/runtime";
import SearchBar from "../../SearchBar";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn()
  })
}));

afterAll(cleanup);

describe("When rendering SearchBar", () => {
  it("It should render successfully", () => {
    const renderedComponent = render(<SearchBar />);
    renderedComponent.getByText("Search");
  });
});
