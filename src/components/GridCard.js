import {forwardRef} from 'react';
import {truncateText} from '../utils/formatting';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'


function GridCard({playlist, innerRef, toggleView}) {

    function handleClick(view, id) {
        if(id === null) {
            // create playlier
        }
        toggleView('playlist', playlist.id)
    }

    function displayCard() {
        // console.log("PLAYLISTS", playlist.images)
        return(
            <div className="grid-card" onClick={handleClick}>
                {playlist && playlist.images.length > 0 ? 
                    <img 
                        src={playlist.images[0].url} 
                        className="grid-card-image" 
                        ref={innerRef}
                        alt={playlist.name}
                    /> 
                    :<p>No image</p>}
            {/* <img src={playlist.images[0].url} className="grid-card-image"/> */}
            <p className="grid-card-name">{truncateText(playlist.name)}</p>
        </div>
        )
    }

    function addPlaylistCard() {
        
        return(
            <div className="grid-card" >
                <FontAwesomeIcon icon={faPlus} />
            </div>
        )
    }
    return(
        <>
        {playlist !== null ? displayCard() : addPlaylistCard()}
        </>
    )
}

export default GridCard