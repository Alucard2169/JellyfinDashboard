import React from 'react';


const MediaCount = () => {
    return (
        <section className='grid grid-cols-5 gap-4'>
            <section className="flex flex-col items-center">
                <div className="flex items-center gap-2">   
                    <span className="font-bold text-2xl">7</span>
                </div>
                <span className="px-2 rounded-md font-semibold bg-black">Pictures</span>
            </section>

            <section className="flex flex-col items-center">
                <div className="flex items-center gap-2">   
                    <span className="font-bold text-2xl">7</span>
                </div>
                <span className="px-2 rounded-md font-semibold bg-black">Pictures</span>
            </section>

        </section>  
    )
}

const ServerInfo = () => {
    return ( 
        <div className=" w-full col-span-2 grid grid-rows-2 bg-gray-800 rounded-md p-4 gap-4">
            <MediaCount/>
            <section className="flex justify-between bg-black rounded-md p-2">
                    <p className='flex flex-col items-center font-extrabold'>Server IP <span className='bg-white text-black px-2 rounded-md font-semibold'>192.168.1.70</span></p>
                    <p className='flex flex-col items-center font-extrabold'>Server Name <span className='bg-white px-2 text-black rounded-md font-semibold'>Alucard</span></p>
                    <p className='flex flex-col items-center font-extrabold'>Server Runtime <span className='bg-white px-2 text-black rounded-md font-semibold'></span></p>
                    <p className='flex flex-col items-center font-extrabold'>Jellyfin Server Name <span className='bg-white text-black px-2 rounded-md font-semibold'>LakeToyaMS</span></p>
            </section>
        </div>
     );
}
 
export default ServerInfo;