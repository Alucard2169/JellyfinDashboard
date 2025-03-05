import React from "react";

const ScrollContainer = ({children} : {children: React.ReactNode}) => {
    return ( 
        <section className="p-1 mt-1 grid grid-cols-2 gap-2 overflow-scroll w-full">
        {React.Children.map(children, (child, index) => (
            <React.Fragment key={index}>{child}</React.Fragment>
        ))}
        </section>   
     );
}
 
export default ScrollContainer;