export default function MatrixView({ matrix }: { matrix: number[][] }) {
  return (
    matrix.length > 0 && (
      <>
        <div className="inline-block p-2 pl-0">
          {matrix.map((row, i) => (
            <div key={i} className="flex">
              {row.map((num, j) => (
                <div
                  key={j}
                  className="w-12 h-12 flex items-center justify-center border border-gray-400 text-sm"
                >
                  {num}
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="mt-6 grid gap-10 grid-cols-2 text-sm text-gray-500">
          {JSON.stringify(matrix)}
        </p>
      </>
    )
  );
}
