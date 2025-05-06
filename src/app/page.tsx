"use client";

import { useState } from "react";
import MatrixView from "./components/MatrixView";
import MatrixForm from "./components/MatrixForm";
import { rotateAnticlockwise } from "../lib/operations";

export default function Home() {
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [rotated, setRotated] = useState<number[][]>([]);

  const clearResults = () => {
    setMatrix([]);
    setRotated([]);
  };

  const handleMatrixSubmit = (parsed: number[][]) => {
    setMatrix(parsed);
    const rotated = rotateAnticlockwise(parsed);
    setRotated(rotated);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 gap-12 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Matrix Rotator</h1>
        <MatrixForm
          onMatrixSubmit={handleMatrixSubmit}
          onError={clearResults}
        />
        {matrix.length > 0 && (
          <div className="mt-6 grid gap-10 grid-cols-2">
            <div>
              <h2 className="font-semibold mb-2">Original:</h2>
              <MatrixView matrix={matrix} />
            </div>
            <div>
              <h2 className="font-semibold mb-2">Rotated:</h2>
              <MatrixView matrix={rotated} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
