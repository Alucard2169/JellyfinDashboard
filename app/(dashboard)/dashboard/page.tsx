import LogContainer from "./components/LogContainer";
import StatusCard from "./components/StatusCard";
import DeviceInfo from "./components/DeviceInfo";
import ServerInfo from "./components/MediaCount";

export default function page(){
    return (
        <main className="h-full w-full p-4 grid grid-cols-4 grid-rows-3 gap-8">
            <StatusCard statusOf={{statusOne:"cpu",statusTwo:"ram"}}/>
            <StatusCard statusOf={{statusOne:"memory",statusTwo:"network"}}/>
            <ServerInfo/>
            <DeviceInfo/>
            <LogContainer/>
        </main>
    );
}