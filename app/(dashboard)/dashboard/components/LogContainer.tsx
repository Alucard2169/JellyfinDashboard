import LogDialogue from "./LogDialogue";

const LogContainer = () => {
    return ( 
        <section className="border border-gray-600 h-full rounded-md  col-start-3 col-span-2 row-start-2 row-span-2 flex flex-col gap-2">
            <header className="p-2 h-fit inline-flex justify-between w-full">
                <h4 className="font-bold">Logs</h4>
                <aside className="flex gap-4">
                    <button className="bg-red-400 hover:bg-red-500 ease-in duration-100 text-black font-semibold rounded-md px-1">Warning</button>
                    <button className="bg-gray-400 hover:bg-gray-500 ease-in duration-100 text-black font-semibold rounded-md px-1">Errors</button>
                    <button className="border border-gray-500 font-semibold rounded-md px-1">Info</button>
                    <button className="bg-yellow-400 hover:bg-yellow-400 ease-in duration-100 text-black font-semibold rounded-md px-1">Clear</button>
                </aside>
            </header>
                <main className="p-4 flex flex-col overflow-scroll w-full gap-4">
                    <LogDialogue type="warning"/>
                    <LogDialogue type="error"/>
                    <LogDialogue type="info"/>
                </main>
        </section>
     );
}
 
export default LogContainer;