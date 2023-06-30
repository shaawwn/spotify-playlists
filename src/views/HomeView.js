import {useState, useEffect} from 'react';

import Grid from '../components/Grid'



function HomeView({playlists, scroll, toggleView, createPlaylist, numPlaylists}) {

    useEffect(() => {
        if(playlists[0]) {
        //    console.log("Home view loading", playlists[0].name, numPlaylists)  
        }
    }, [playlists])

    return(
        <div className="home" data-testid="home">
            {playlists? 
                <Grid 
                    playlists={playlists} 
                    scroll={scroll}
                    toggleView={toggleView}
                    createPlaylist={createPlaylist}
                    numPlaylists={numPlaylists}
                    /> 
                : <h1>No playlists!</h1>}
        </div>
    )
}

export default HomeView