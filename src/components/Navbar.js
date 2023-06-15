import {useState, useEffect} from 'react';
import NavbarMenu from '../components/NavbarMenu'


function Navbar({username}) {

    function greeting() {
        // check time of day
        return(
            <h1>Welcome, {username}</h1>
        )
    }
    return(
        <div className="navbar">
            <Greeting username={username} />
            <NavbarMenu />
        </div>
    )
}

function Greeting({username}) {

    function checkTime() {
        // get the time of day to customize greeting
    }

    return(
        <h1 className="greeting">Welcome, {username}</h1>
    )
}
export default Navbar