import React, { useState } from "react"
import { Link, Outlet } from 'react-router-dom';


export default function Index() {

 

    return (
        <div className=" mb-4">
            <nav className="navbar bg-body-tertiary " >
                <form className="container-fluid justify-content-end
                s ">
                   <Link to={'/properties'}> <button  className="btn btn-sm btn-outline-success mx-2">
                   Show Properties</button> </Link>
                   <Link to={'/add-property'}> <button  className="btn btn-sm btn-outline-success mx-2">
                   Add Properties</button> </Link>
                    
                   <Link to={'/tenants'}> <button  className="btn btn-sm btn-outline-success mx-2">
                   show Tenants</button> </Link>
                   <Link to={'/add-tenant'}> <button  className="btn btn-sm btn-outline-success mx-2">
                   add Tenants</button> </Link>
                    
                   <Link to = {'/logout'}> <button className="btn btn-sm btn-outline-success  mx-2" type="button">Logout</button>  </Link>
                </form>
            </nav>
            
        </div>
    )
}