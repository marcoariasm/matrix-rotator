"use client";

import React, { useEffect, useState } from "react";

interface MatrixFormProps {
  onMatrixSubmit: (matrix: number[][]) => void;
  onError: () => void;
}

export default function MatrixForm({
  onMatrixSubmit,
  onError,
}: MatrixFormProps) {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  function parseMatrix(input: string): number[][] {
    let parsed;

    try {
      parsed = input
        .trim()
        .split("\n")
        .map((row) => row.trim().split(" ").map(Number));
    } catch {
      throw new Error(`Invalid format. Example: 1 2 \n3 4`);
    }

    if (!Array.isArray(parsed) || !parsed.every((row) => Array.isArray(row))) {
      throw new Error("Input must be an array of arrays (matrix).");
    }

    const rowCount = parsed.length;

    if (!parsed.every((row) => row.length === rowCount)) {
      throw new Error(
        "Matrix must be square (NxN). All rows must have same length."
      );
    }

    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < rowCount; j++) {
        const value = parsed[i][j];
        if (typeof value !== "number" || !Number.isFinite(value)) {
          throw new Error(`Invalid number at row ${i + 1}, column ${j + 1}`);
        }
      }
    }

    return parsed;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = parseMatrix(input);
      setError(null);
      onMatrixSubmit(parsed);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  useEffect(() => {
    if (error || input.trim() === "") {
      onError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, input]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="matrixInput" className="block text-left font-medium">
        Enter a NxN matrix (one-space-separated numbers, \n line break per row):
      </label>
      <textarea
        id="matrixInput"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded"
        rows={7}
        placeholder={`Example:  1 2\n                   3 4`}
      ></textarea>
      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
        disabled={!input.trim()}
      >
        Rotate Matrix
      </button>
      {error && input.trim() !== "" && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </form>
  );
}
