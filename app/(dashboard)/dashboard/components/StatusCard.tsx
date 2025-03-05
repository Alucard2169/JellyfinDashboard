import cpuIcon from "@/public/icons/cpuIcons.svg"
import ramIcon from "@/public/icons/ramIcon.svg"
import memoryIcon from "@/public/icons/memoryIcon.svg"
import networkIcon from "@/public/icons/networkIcon.svg"
import Image from "next/image";


type StatusTypes = "cpu" | "ram" | "memory" | "network";

interface StatusProps {
    statusOf: {
        statusOne: StatusTypes;
        statusTwo: StatusTypes;
    };
}

const StatusCard:React.FC<StatusProps> = ({statusOf}) => {
    const {statusOne, statusTwo} = statusOf;
    return (
        <section className=" p-2 border border-gray-600 rounded-md flex flex-col justify-between">
            <article className="h-full flex items-center">
            <Image src={statusOne === "cpu" ? cpuIcon : memoryIcon} width={40} height={40} alt="cpu icon"/>
            </article>
            <hr></hr>
            <article className="h-full flex items-center">
            <Image src={statusTwo === "ram" ? ramIcon : networkIcon} width={40} height={40} alt="ram icon"/>
            </article>
        </section>
    )
} 

export default StatusCard;