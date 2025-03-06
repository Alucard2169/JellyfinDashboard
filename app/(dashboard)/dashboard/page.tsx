import LogContainer from "./components/LogContainer";
import StatusCard from "./components/StatusCard";
import DeviceInfo from "./components/DeviceInfo";
import ServerInfo from "./components/MediaCount";

export default function page(){
    return (
        <main className="h-full w-full p-2 grid grid-cols-4 grid-rows-3 gap-4">
            <StatusCard statusOf={{statusOne:"cpu",statusTwo:"ram"}}/>
            <StatusCard statusOf={{statusOne:"memory",statusTwo:"network"}}/>
            <ServerInfo/>
            <DeviceInfo/>
            <LogContainer/>
        </main>
    );
}