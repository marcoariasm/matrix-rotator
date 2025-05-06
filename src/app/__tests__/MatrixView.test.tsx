import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MatrixView from "../components/MatrixView";

describe("MatrixView component", () => {
  const matrix = [
    [1, 2],
    [3, 4],
  ];

  it("renders all matrix values", () => {
    render(<MatrixView matrix={matrix} />);
    matrix.flat().forEach((val) => {
      expect(screen.getByText(val.toString())).toBeInTheDocument();
    });
  });

  it("does not render anything if matrix is empty", () => {
    const { container } = render(<MatrixView matrix={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("verify both result and original shows matrix in string format", () => {
    render(<MatrixView matrix={matrix} />);
    expect(screen.getByText("[[1,2],[3,4]]")).toBeInTheDocument();
  });
});
