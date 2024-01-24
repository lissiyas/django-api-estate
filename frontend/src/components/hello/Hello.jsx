import React from "react";

import { Link } from "react-router-dom";



export default function Hello(){
    return(
        <div> 
        <div> Welcome to my page </div>
        <nav>
            {/* other navigation links */}
            <Link to="/logout">Logout</Link>
        </nav>
        </div>
    )
}