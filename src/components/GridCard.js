import {forwardRef} from 'react';
import {truncateText} from '../utils/formatting';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faPlus} from '@fortawesome/free-solid-svg-icons'
import AddPlaylistCard from '../components/AddPlaylistCard'

function GridCard({playlist, innerRef, toggleView, createPlaylist}) {

    function handleClick(view, id) {
        if(id === null) {
            // create playlier
        }
        toggleView('playlist', playlist.id)
    }

    function displayCard() {
        return(
            <div className="grid-card gs-resp" onClick={handleClick}>
                {playlist && playlist.images.length > 0 ? 
                    <img 
                        src={playlist.images[0].url} 
                        className="grid-card-image grid-card-image-resp" 
                        ref={innerRef}
                        alt={playlist.name}
                    /> 
                    :<p>No image</p>}
            {/* <img src={playlist.images[0].url} className="grid-card-image"/> */}
            <p className="grid-card-name">{truncateText(playlist.name)}</p>
        </div>
        )
    }

    function displayDummyCard() {
        // an empty hidden card for formatting purposes
        return(
            <div className="grid-card dummy">

            </div>
        )
    }

    return(
        <>
        {playlist !== null ? displayCard() : displayDummyCard()}
        {/* {displayCard()} */}
        </>
    )
}

export default GridCard