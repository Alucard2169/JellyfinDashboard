"use client";

import React from "react";
import useSWR from "swr";
import LibrarySkeleton from "../skeletons/library";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MediaCount = () => {
  const { data, error, isLoading } = useSWR(
    `http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/Library/VirtualFolders?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    fetcher
  );

  if (isLoading) return <LibrarySkeleton />;
  if (error) return <p className="text-red-400 text-sm">{error}</p>;
  if (!data) return <p>No data available</p>;

  return (
    <section className="grid grid-cols-4 gap-4">
      {data.map((library: any) => (
        <section key={library.ItemId} className="flex flex-col items-center">
          <span className="px-2 rounded-md text-md font-semibold bg-black">
            {library.Name}
          </span>
          {library.Locations.map((location: string, index: number) => (
            <span
              className="text-sm break-normal"
              key={`${library.ItemId}-${index}`}
            >
              {location}
            </span>
          ))}
        </section>
      ))}
    </section>
  );
};

const ServerInfo = () => {
  return (
    <div className="w-full col-span-2 grid grid-rows-2 rounded-md p-4 gap-4">
      <MediaCount />
      <section className="flex justify-between border rounded-md p-2">
        <p className="flex flex-col items-center font-extrabold">
          Server IP
          <span className="bg-white text-black px-2 rounded-md font-semibold">
            192.168.1.70
          </span>
        </p>
        <p className="flex flex-col items-center font-extrabold">
          Server Name
          <span className="bg-white px-2 text-black rounded-md font-semibold">
            Alucard
          </span>
        </p>
        <p className="flex flex-col items-center font-extrabold">
          Server Runtime
          <span className="bg-white px-2 text-black rounded-md font-semibold"></span>
        </p>
        <p className="flex flex-col items-center font-extrabold">
          Jellyfin Server Name
          <span className="bg-white text-black px-2 rounded-md font-semibold">
            LakeToyaMS
          </span>
        </p>
      </section>
    </div>
  );
};

export default ServerInfo;
