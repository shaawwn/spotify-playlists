import {useState, useEffect} from 'react';

// there is stuff with shelf card that I think I want to seperate from grid card
import ShelfCard from '../components/ShelfCard';


function Shelf({playlists, toggleView}) {

    function displayShelf() {
        return(
            <>
                {playlists.map((playlist) => 
                    <ShelfCard 
                        key={playlist.id} 
                        playlist={playlist}
                        toggleView={toggleView}
                        />    
                )}
            </>
        )
    }
    return(
        <div className="grid responsive">
            {playlists ? displayShelf() : <h1>No shelf items!</h1>}
        </div>
    )
}

export default Shelf