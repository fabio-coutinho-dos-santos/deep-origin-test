import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home Component", () => {
  it("should contains the button to upload file", () => {
    render(<Home />);
    expect(screen.getByRole("btn-upload")).toBeInTheDocument();
  });

  it("should contains the input file", () => {
    render(<Home />);
    expect(screen.getByTestId("input-file")).toBeInTheDocument();
  });
});
