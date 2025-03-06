import { Device } from "../types/devices";


type KnowDevicesProps = {
    device: Device;
};



const KnowDevices: React.FC<KnowDevicesProps> = ({ device }) => {

    const isOnline = () => {
        const lastActivity = new Date(device.DateLastActivity).getTime();
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
        return now - lastActivity < fiveMinutes;
    };

    return (
        <section className="border p-2 rounded-md">
            <div className="flex gap-2 items-center">
                <h4 className="font-bold">{device.CustomName ?? device.LastUserName}</h4>
                <span className={`${isOnline() ? "bg-green-400" : "bg-red-400"} w-[10px] h-[10px] rounded-full`} aria-label={`${isOnline() ? "online" : "offline"}`}></span>
            </div>
            <p className="mt-2 rounded-md p-2 font-semibold">
                {device.AppName} : {device.AppVersion}
            </p>
            <p className="border p-1 rounded-md my-2">{device.Name}</p>
            <p className="text-xs text-gray-400 mt-1">
                Last Active: {new Date(device.DateLastActivity).toLocaleString()}
            </p>
        </section>
    );
};

export default KnowDevices;