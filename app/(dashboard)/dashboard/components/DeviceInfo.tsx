import KnowDevices from "./KnownDevices";
import RecentMediaDialogue from "./RecentMedia";
import ScrollContainer from "./ScrollContainer";


const DeviceInfo = () => {
    return ( 
        <section className="flex flex-col h-full border border-gray-500 row-span-2 col-span-2 rounded-md p-2">
           
            <section className="flex flex-col gap-2 h-1/2">
                <header className="font-bold">Recently Accessed Media</header>
                <ScrollContainer>
                    <RecentMediaDialogue/>
                </ScrollContainer>
            </section>
            
            <hr/>

            <section className="flex flex-col gap-2 h-1/2">
                <header className="font-bold">Known Devices</header>
                <ScrollContainer>
                    <KnowDevices/>
                </ScrollContainer>
            </section>
        </section>
    );
}
 
export default DeviceInfo;