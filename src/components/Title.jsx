import React from "react";

class Title extends React.Component{
    render(){
        return(
            <div className="absolute inset-x-0 top-0 h-16 py-4">
                <h6 className="text-4xl font-bold">Random Unusual Article</h6>
                <p className="text-sm font-light">Created by Alex Stolzman</p>
            </div>
        )
    }
}

export default Title;