"use client";

import cpuIcon from "@/public/icons/cpuIcons.svg";
import ramIcon from "@/public/icons/ramIcon.svg";
import memoryIcon from "@/public/icons/memoryIcon.svg";
import networkIcon from "@/public/icons/networkIcon.svg";
import Image from "next/image";
import useSWR from "swr";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

type StatusTypes = "cpu" | "ram" | "memory" | "network";

interface StatusProps {
  statusOf: {
    statusOne: StatusTypes;
    statusTwo: StatusTypes;
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const StatusCard: React.FC<StatusProps> = ({ statusOf }) => {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3001/stats",
    fetcher
  );


  const [expanded, setExpanded] = useState<StatusTypes | null>(null);
  const [cpuData, setCpuData] = useState<{ name: string; value: number }[]>([]);
  const [ramData, setRamData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    if (data) {
        setRamData((prev) => {
            const newData = [{ name: "free", value: parseFloat(data.freeMem) },{name: "Total", value: parseFloat(data.totalMem)}];      
            return newData;
          });

      setCpuData((prev) => {
        const newData = [...prev, { name: new Date().toLocaleTimeString(), value: parseFloat(data.cpuLoad) }];
        if (newData.length > 20) newData.shift();
        return newData;
      });
    }
  }, [data]);

  if(error) return (
    <section className="p-2 border border-gray-600 rounded-md grid grid-rows-2 gap-2 relative">
      <div className="bg-gray-900 flex justify-center items-center rounded-md">
        <p className="text-red-400 font-bold">Something wrong with the server</p>
      </div>
    </section>
  )
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data available</p>;

  const { statusOne, statusTwo } = statusOf;

  const icons = {
    cpu: cpuIcon,
    ram: ramIcon,
    memory: memoryIcon,
    network: networkIcon,
  };

  const memoryData = [
    { name: "Free", value: parseFloat(data.storage[3].free) },
    { name: "Total", value: parseFloat(data.storage[3].total) }
  ];

  const networkData = data.network.map((net: any) => ({
    name: net.iface,
    open: net.operstate,
    rx: net.rx_bytes,
    tx: net.tx_bytes,
  }));

  const COLORS = ["#ff0000", "#00ff00", "#0000ff", "#ffff00"];

  const handleExpand = (type: StatusTypes) => {
    setExpanded(expanded === type ? null : type);
  };

  return (
    <section className="p-2 border border-gray-600 rounded-md grid grid-rows-2 gap-2 relative">
      {[statusOne, statusTwo].map((status, index) => (
        <article
          key={index}
          className={`flex items-center gap-2 flex-col border transition-all ${
            expanded === status ? "p-4 bg-gray-700 absolute top-0 left-0 right-0 bottom-0 z-10" : "p-2"
          }`}
          onClick={() => handleExpand(status)}
        >
          <aside className="w-full flex items-center gap-2">
            <Image
              src={icons[status]}
              width={20}
              height={20}
              alt={`${status} icon`}
            />
            <p>
              {status.toUpperCase()}: {status === "cpu" && `${cpuData[cpuData.length - 1]?.value ?? 0}%`}
              {status === "ram" && ramData.length >= 2 && `${ramData[0]?.value ?? 0} MB / ${ramData[1]?.value ?? 0} MB`}
              {status === "memory" && `${memoryData[0].value} GiB / ${memoryData[1].value} GiB`}
              {status === "network" && networkData.length > 0 &&
                `${networkData[0]?.name ?? "N/A"} / ${networkData[0]?.open ?? "N/A"}`}
            </p>
          </aside>

          {expanded === status && (
            <ResponsiveContainer width="100%" height="100%">
              {status === "cpu" || status === "ram" ? (
                <LineChart data={status === "cpu" ? cpuData : ramData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="value" stroke="#ff0000" />
                  <Tooltip />
                </LineChart>
              ) : status === "memory" ? (
                <PieChart>
                  <Pie
                    data={memoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                  >
                    {memoryData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              ) : (
                <LineChart data={networkData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="rx" stroke="#00ff00" />
                  <Line type="monotone" dataKey="tx" stroke="#0000ff" />
                  <Tooltip />
                </LineChart>
              )}
            </ResponsiveContainer>
          )}
        </article>
      ))}
    </section>
  );
};

export default StatusCard;
