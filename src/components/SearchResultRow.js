import {useEffect, useState, useRef} from 'react';

import {truncateText, truncateTextLong} from '../utils/formatting' 
import SearchAlbum from '../components/SearchAlbum';

function SearchResultRow({track, innerRef, addTrack, removeTrack, albumID, accessToken}) {

    const [albumLoad, setAlbumLoad] = useState(false)

    function handleButtonClick(e) {
        // need to alter for albums
        e.stopPropagation()
        console.log("BUTTON CLICK TRACK", track)
        if(track.hasOwnProperty('album_type')) {
            // get the album, and add all tracks
            fetch(`https://api.spotify.com/v1/albums/${track.id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then((response) => response.json())
            .then((data) => {
                // console.log("Album data to add", data.tracks.items)
                data.tracks.items.forEach((track) => {
                    // console.log(track.name)
                    addTrack(track.id)
                })
            })
        } else {
            addTrack(track.id)
        }
        // addTrack(track.id)
    }

    function displayAlbum(e) {
        // IF an album, toggle the albumd isplay which is a dropdown showing album track content
        if(albumLoad === true) {
            setAlbumLoad(false)
        } else if(albumLoad === false) {
            setAlbumLoad(true)
        }
    }

    useEffect(() => {
        // if(albumID) {
        //     console.log("Album id", albumID)
        // } 
    }, [])

    return(
        <div className="search-result-row" onClick={displayAlbum}ref={innerRef}>
            <div className="search-result-row-content">
                <div className="search-row-details">
                    <p className="search-row-details-name">{truncateTextLong(track.name)}</p>
                    <p className="search-row-details-artist">{track.artists[0].name}</p>
                </div>
                <div className="search-row-btn" onClick={handleButtonClick}>Add</div>
            </div>
            {albumID ? <SearchAlbum 
                        id={track.id} 
                        load={albumLoad}
                        accessToken={accessToken}
                        addTrack={addTrack}
                        /> :<span></span>}
            {/* <SearchAlbum /> */}
        </div>
    )
}
export default SearchResultRow