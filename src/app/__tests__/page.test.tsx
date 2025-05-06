import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "../../app/page";

describe("HomePage integration", () => {
  it("renders the form and matrix view", () => {
    render(<Home />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Rotate Matrix/i })
    ).toBeInTheDocument();
    expect(screen.queryByText("Rotated:")).not.toBeInTheDocument(); // not yet submitted
  });

  it("submits a valid matrix and shows rotated matrix", () => {
    render(<Home />);

    const textarea = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /Rotate Matrix/i });

    fireEvent.change(textarea, {
      target: {
        value: `1 2
                3 4`,
      },
    });
    fireEvent.click(button);

    expect(screen.getByText("[[2,4],[1,3]]")).toBeInTheDocument();
  });

  it("no renderiza la vista si el input está vacío o incorrecto", () => {
    render(<Home />);
    const textarea = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /Rotate Matrix/i });

    fireEvent.change(textarea, {
      target: { value: "" },
    });
    fireEvent.click(button);

    expect(screen.queryByText("Rotated:")).not.toBeInTheDocument();
  });
});
