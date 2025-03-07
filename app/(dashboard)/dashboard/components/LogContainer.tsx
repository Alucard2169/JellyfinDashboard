"use client";

import useSWR from "swr";
import LogDialogue from "./LogDialogue";
import { useState } from "react";
import LogsSkeleton from "../skeletons/logs";


const fetcher = (url: string) => fetch(url).then((res) => res.json());

const LogContainer = () => {
    const [filter, setFilter] = useState<string | null>("All");

    // fetching activities
    const { data: logData, error: logError, isLoading: logLoading } = useSWR(
        `http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/System/ActivityLog/Entries?startIndex=0&limit=500&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        fetcher
    );


    // fetting all the userIds from activities
    const userIds = logData?.Items?.map((log: any) => log.UserId).filter(Boolean) ?? [];
    const uniqueUserIds = Array.from(new Set(userIds));


    // fetching userData for each userId
    const { data: usersData, error: userError, isLoading: userLoading } = useSWR(
        uniqueUserIds.length > 0
            ? `http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/Users?ids=${uniqueUserIds.join(",")}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
            : null,
        fetcher
    );

    if (logError || userError) return <p className="text-red-400 text-sm">An error occurred</p>;
    if (logLoading || userLoading) return <LogsSkeleton />;
    if (!logData || !usersData) return <p>No data available</p>;


    // Filter logs based on the selected filter
    const filteredLogs = logData.Items.filter((log: any) => {
        if (!filter) return true;
        if (filter === "All") return true;
        if (filter === "Error" && log.Severity === "Error") return true;
        if (filter === "Info" && log.Severity === "Information") return true;
        if (filter === "Media Playback" && log.Type?.toLowerCase().includes("videoplayback")) return true;
        return false;
    });

    return (
        <section className="p-2 border border-gray-600 h-full rounded-md col-start-3 col-span-2 row-start-2 row-span-2 flex flex-col gap-2">
            <section className="w-full flex items-center">
            <h4 className="font-bold text-lg">Logs</h4> 
            <div className="flex items-center gap-4 ml-auto">
            <button
                        className={`bg-yellow-500 rounded-md px-2 font-bold ${filter === "All" ? "opacity-100" : "opacity-50"}`}
                        onClick={() => setFilter(filter === "All" ? null : "All")}
                    >
                        All
                    </button>
                    <button
                        className={`bg-blue-500 rounded-md px-2 font-bold ${filter === "Info" ? "opacity-100" : "opacity-50"}`}
                        onClick={() => setFilter(filter === "Info" ? null : "Info")}
                    >
                        Info
                    </button>
                    <button
                        className={`bg-red-500 rounded-md px-2 font-bold ${filter === "Error" ? "opacity-100" : "opacity-50"}`}
                        onClick={() => setFilter(filter === "Error" ? null : "Error")}
                    >
                        Error
                    </button>
                    <button
                        className={`bg-green-500 rounded-md px-2 font-bold ${filter === "Media Playback" ? "opacity-100" : "opacity-50"}`}
                        onClick={() => setFilter(filter === "Media Playback" ? null : "Media Playback")}
                    >
                        Media Playback
                    </button>
                </div>
            </section>
            <div className="overflow-auto h-full border">
                <table className="min-w-full border-collapse">
                    <thead className="bg-white sticky top-0 z-10">
                        <tr>
                            <th className="text-black p-2 border">Time</th>
                            <th className="text-black p-2 border">Level</th>
                            <th className="text-black p-2 border">User</th>
                            <th className="text-black p-2 border">Name</th>
                            <th className="text-black p-2 border">Overview</th>
                            <th className="text-black p-2 border">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredLogs.map((log: any) => (
                            <LogDialogue key={log.Id} log={log} user={usersData.find((user: any) => user.Id === log.UserId)} />
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default LogContainer;
