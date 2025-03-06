"use client";

import { Device, DeviceData } from "../types/devices";
import KnowDevices from "./KnownDevices";
import RecentMediaDialogue from "./RecentMedia";
import ScrollContainer from "./ScrollContainer";
import useSWR from "swr";
import KnownDevicesSkeleton from "../skeletons/knownDevices";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const DeviceInfo = () => {
    const { data: deviceData, error: deviceError, isLoading: deviceIsLoading } = useSWR<DeviceData>(
        `http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/Devices?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, 
        fetcher
    );

    console.log(deviceData);
    console.log(deviceError);   

    return (
        <section className="flex flex-col h-full border border-gray-500 row-span-2 col-span-2 rounded-md p-2">
            <section className="flex flex-col gap-2 h-1/2">
                <header className="font-bold">Recently Accessed Media</header>
                <ScrollContainer>
                    <RecentMediaDialogue />
                </ScrollContainer>
            </section>

            <hr />

            <section className="flex flex-col gap-2 h-1/2">
                <header className="font-bold">Known Devices</header>
                <ScrollContainer>
                {deviceIsLoading ? (
        <KnownDevicesSkeleton />
    ) : deviceError ? (
        <p className="text-red-400 text-sm">{deviceError}</p>
    ) : (
        deviceData?.Items?.map((device: Device) => (
            <KnowDevices key={device.Id} device={device} />
        ))
    )}
                </ScrollContainer>
            </section>
        </section>
    );
};





    




export default DeviceInfo;
