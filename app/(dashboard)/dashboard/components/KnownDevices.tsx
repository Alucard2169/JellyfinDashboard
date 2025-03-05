import Image from "next/image";
import profile from "@/public/profile.jpg"

const KnowDevices = () => {
    return ( 
        <section className="bg-gray-800 p-2 rounded-md hover:scale-95 duration-110">
                        <div className="flex gap-2 items-center ">
                        <Image src={profile} width={40} height={40} className="rounded-full" alt="profle pic"/>
                        <h4 className="font-bold">User 1</h4>
                        <span className="bg-green-400 w-[5px] h-[5px] rounded-full"></span>
                        </div>      
                        <p className="mt-2 rounded-md p-2 bg-black">Firefox 3.4</p>                  
                </section>
     );
}
 
export default KnowDevices;