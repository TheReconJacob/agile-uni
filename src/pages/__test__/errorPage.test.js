import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import ErrorPage from "../ErrorPage";

let getByText;

beforeEach(() => {
  getByText = render(
    <BrowserRouter>
      <ErrorPage
        errorMessage={
          "We could not find the page you were looking for, try searching again"
        }
        errorStatus={404}
      />
    </BrowserRouter>
  ).getByText;
});

afterEach(cleanup);

describe("Error page renders correctly", () => {
  it("Sorry renders correctly", () => {
    getByText(/Sorry/);
  });

  it("Error code renders correctly", () => {
    getByText(/Error 404/);
  });

  it("Error message renders correctly", () => {
    getByText(
      /We could not find the page you were looking for, try searching again or return to the/
    );
  });

  it("Home page link renders correctly", () => {
    getByText(/Home Page/);
  });
});
