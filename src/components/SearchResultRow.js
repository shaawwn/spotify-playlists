import {useEffect, useState, useRef} from 'react';
import {truncateText, truncateTextLong} from '../utils/formatting' 
import SearchAlbum from '../components/SearchAlbum';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretDown, faCaretRight} from '@fortawesome/free-solid-svg-icons'

function SearchResultRow({track, innerRef, addTrack, addAllTracks, removeTrack, albumID, accessToken, play, pause}) {

    const [albumLoad, setAlbumLoad] = useState(false)

    function handleButtonClick(e) {
        e.stopPropagation()

        // add all tracks from an album
        if(track.hasOwnProperty('album_type')) {
            fetch(`https://api.spotify.com/v1/albums/${track.id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then((response) => response.json())
            .then((data) => {
                let uris = []
                data.tracks.items.forEach((item) => {
                    uris.push(item.uri)
                })
                addAllTracks(uris)
            })
        } else {
            // add an individual track only
            addTrack(track.id)
        }
    }


    function displayAlbum(e) {
        if(albumLoad === true) {
            setAlbumLoad(false)
        } else if(albumLoad === false) {
            setAlbumLoad(true)
        }
    }

    function displayCaret() {
        if(albumLoad === false) {
            return(
                <FontAwesomeIcon icon={faCaretRight} style={{transform: 'translateX(-48%)', color: 'black'}}/>
            )
        } else if(albumLoad === true) {
            return(
                <FontAwesomeIcon icon={faCaretDown} style={{transform: 'translateX(-48%)', color: 'black'}}/>
            )
        }
    }

    function handleTrackClick(e, uri) {
        e.stopPropagation()
        console.log("Clicking", uri)
        play(uri)
    }
    
    function displayRowContent() {
        return(
            <div className="search-result-row-content" onClick={(e) => handleTrackClick(e,track.uri, track.name)}>
                <div className="search-row-details">
                    <p className="search-row-details-name">{truncateTextLong(track.name)}</p>
                    <p className="search-row-details-artist">{track.artists[0].name}</p>
                </div>
                <div className="search-row-btn" onClick={handleButtonClick}>Add</div>
            </div>
        )
    }

    return(
        <div className="search-result-row" onClick={displayAlbum}ref={innerRef}>
            {displayRowContent()}
            {albumID ?
                <>
                    {displayCaret()}
                    <SearchAlbum 
                        id={track.id} 
                        load={albumLoad}
                        accessToken={accessToken}
                        addTrack={addTrack} />
                </> :<span></span>}
        </div>
    )
}
export default SearchResultRow