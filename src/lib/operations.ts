
export function rotateAnticlockwise(matrix: number[][]): number[][] {
  const n = matrix.length;
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => matrix[j][n - i - 1])
  );
}

// export function rotateClockwise(matrix: number[][]): number[][] {
//   const n = matrix.length;
//   return Array.from({ length: n }, (_, i) =>
//     Array.from({ length: n }, (_, j) => matrix[n - j - 1][i])
//   );
// }