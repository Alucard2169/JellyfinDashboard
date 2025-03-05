const LogDialogue = ({type}:{type:string}) => {
    return ( 
        <section className={` ${type == "warning" ? "bg-red-400 text-black" : 
                                      type == "error" ? "bg-gray-400  text-black": 
                                      "bg-transparent border  text-white"} p-2 rounded-md flex items-center justify-between`}>
            <p>Log 1</p>
            <span className="font-semibold">Time</span>
        </section>
     );
}
 
export default LogDialogue;