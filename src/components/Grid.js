import {useState, useEffect} from 'react';

import GridCard from '../components/GridCard';


function Grid({playlists, scroll}) {

    function handleScroll() {
        if(window.innerHeight + window.scrollY >= document.body.scrollHeight) {
            // window.scrollTo(0, document.documentElement.scrollTop)
            // scroll()
            console.log(window.innerHeight + Math.round(window.scrollY), document.body.scrollHeight)
        } 
    }

    function displayGrid() {
        console.log("GRID PLAYLISTS", playlists)
        return(
            <>
            {playlists.map((playlist) => 
                <GridCard key={playlist.id} playlist={playlist}/>
            )}
            </>
        )
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return(
        <div className="grid-container">
            <div className="grid">
                <GridCard playlist={null}/>
                {playlists.length > 0 ? displayGrid() : <h1>No playlists!</h1> }
            </div>
        </div>
    )
}

export default Grid