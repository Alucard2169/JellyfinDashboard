const LogsSkeleton = () => {
  return (
    <div className="p-2 border border-gray-600 h-full rounded-md col-start-3 col-span-2 row-start-2 row-span-2 flex flex-col gap-2">
      <div className="bg-white w-full h-full">
          <table className="min-w-full border-collapse">
              <thead className="bg-white sticky top-0 z-10">
                  <tr>
                      <th className="p-2   bg-gray-200 animate-pulse rounded"></th>
                      <th className="p-2   bg-gray-200 animate-pulse rounded"></th>
                      <th className="p-2       bg-gray-200 animate-pulse rounded"></th>
                      <th className="p-2   bg-gray-200 animate-pulse rounded"></th>
                      <th className="p-2  bg-gray-200 animate-pulse rounded"></th>
                      <th className="p-2   bg-gray-200 animate-pulse rounded"></th>
                  </tr>
              </thead>
            </table>
    </div>
    </div>
  );
};

export default LogsSkeleton;
