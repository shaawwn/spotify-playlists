import {useEffect, useState, useRef} from 'react';
import series from 'async/series'
import {truncateText, truncateTextLong} from '../utils/formatting' 
import SearchAlbum from '../components/SearchAlbum';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretDown, faCaretRight} from '@fortawesome/free-solid-svg-icons'

function SearchResultRow({track, innerRef, addTrack, addAllTracks, removeTrack, albumID, accessToken}) {

    const [albumLoad, setAlbumLoad] = useState(false)

    function handleButtonClick(e) {
        // need to alter for albums
        e.stopPropagation()
        if(track.hasOwnProperty('album_type')) {
            // get the album, and add all tracks
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
            addTrack(track.id)
        }
    }


    function displayAlbum(e) {
        // IF an album, toggle the albumd isplay which is a dropdown showing album track content
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
    // useEffect(() => {
    //     // if(albumID) {
    //     //     console.log("Album id", albumID)
    //     // } 
    // }, [])

    return(
        <div className="search-result-row" onClick={displayAlbum}ref={innerRef}>
            <div className="search-result-row-content">
                <div className="search-row-details">
                    <p className="search-row-details-name">{truncateTextLong(track.name)}</p>
                    <p className="search-row-details-artist">{track.artists[0].name}</p>
                </div>
                <div className="search-row-btn" onClick={handleButtonClick}>Add</div>
            </div>
            {albumID ?
                <>
                    {displayCaret()}
                    <SearchAlbum 
                        id={track.id} 
                        load={albumLoad}
                        accessToken={accessToken}
                        addTrack={addTrack} />
                </> :<span></span>}
            {/* <SearchAlbum /> */}
        </div>
    )
}
export default SearchResultRow