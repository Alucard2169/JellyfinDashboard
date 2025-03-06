const KnownDevicesSkeleton = () => {
    return ( 
        <section className="bg-white border p-2 rounded-md">
    <div className="flex gap-2 items-center">
        <div className="w-32 h-6 bg-gray-200 rounded-md animate-pulse"></div>
        <span className="bg-gray-300 w-[10px] h-[10px] rounded-full animate-pulse" aria-label="loading"></span>
    </div>
    <div className="mt-2 rounded-md p-2 bg-gray-200 animate-pulse h-6"></div>
    <div className="border p-1 rounded-md my-2 bg-gray-200 animate-pulse h-4"></div>
    <div className="text-xs text-gray-400 mt-1 bg-gray-200 animate-pulse h-4"></div>
</section>
     );
}
 
export default KnownDevicesSkeleton;