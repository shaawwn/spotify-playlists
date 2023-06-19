import {useState, useEffect} from 'react';

import Grid from '../components/Grid'



function HomeView({playlists, scroll, toggleView}) {

    return(
        <div className="home" data-testid="home">
            {playlists? 
                <Grid 
                    playlists={playlists} 
                    scroll={scroll}
                    toggleView={toggleView}
                    /> 
                : <h1>No playlists!</h1>}
        </div>
    )
}

export default HomeView