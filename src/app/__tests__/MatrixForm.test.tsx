import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MatrixForm from "../components/MatrixForm";

describe("MatrixForm component", () => {
  const submitMock = vi.fn();
  const mockError = vi.fn();

  beforeEach(() => {
    submitMock.mockReset();
    mockError.mockReset();
  });

  it("submits a valid matrix", () => {
    render(<MatrixForm onMatrixSubmit={submitMock} onError={mockError} />);
    const textarea = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /Rotate matrix/i });

    fireEvent.change(textarea, {
      target: {
        value: `1 2
                3 4`,
      },
    });
    fireEvent.click(button);

    expect(submitMock).toHaveBeenCalledOnce();
    expect(submitMock).toHaveBeenCalledWith([
      [1, 2],
      [3, 4],
    ]);
  });

  it("shows error on non-square matrix", () => {
    render(<MatrixForm onMatrixSubmit={submitMock} onError={mockError} />);
    const textarea = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /Rotate matrix/i });

    fireEvent.change(textarea, {
      target: {
        value: `1 2
        3`,
      },
    });
    fireEvent.click(button);

    expect(screen.getByText(/Matrix must be square/i)).toBeInTheDocument();
    expect(submitMock).not.toHaveBeenCalled();
  });

  it("shows error on non-numeric value", () => {
    render(<MatrixForm onMatrixSubmit={submitMock} onError={mockError} />);
    const textarea = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /Rotate matrix/i });

    fireEvent.change(textarea, {
      target: {
        value: `1 a
        3 4`,
      },
    });
    fireEvent.click(button);

    expect(
      screen.getByText(/Invalid number at row 1, column 2/i)
    ).toBeInTheDocument();
    expect(submitMock).not.toHaveBeenCalled();
  });
});
