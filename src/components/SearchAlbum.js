import {useEffect, useState} from 'react';
import {truncateTextLong} from '../utils/formatting'
// a dropdown menu that will appear in search bar to give a smaller list of tracks in an album, maybe with a 'select all' option, or radio buttons

// creates like a popup with the top left corner at the location, or, pushes other results down

// realistically, also need
function SearchAlbum({id, load, accessToken, addTrack}) {
    // basic title/artist header and a small table for tracks
    const [album, setAlbum] = useState()
    const [visible, setVisible] = useState(false)

    function getAlbum() {

        fetch(`https://api.spotify.com/v1/albums/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log("Albumd ata in searcAlbum", data.name, data.tracks.items)
            setAlbum(data)
        })
    }

    function displayAlbum() {
        if(visible && album) {
            return(
                // <h1>I'm a search album dropdown!</h1>
                <SearchAlbumDropdown 
                    tracks={album.tracks.items} 
                    addTrack={addTrack}
                    />
            )
        }
    }
    useEffect(() => {
        if(load) {
            getAlbum()
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [load])

    return(
        <div className={`search-album`}> 
            {displayAlbum()}
        </div>
    )
}

function SearchAlbumDropdown({tracks, addTrack}) {

    function handleClick(e, id) {
        e.stopPropagation()
        addTrack(id)
    }
    return(
        <div className="search-album-dropdown">
            {tracks.map((track, undex) => {
                return(
                    <div key={track.id} className="search-album-dropdown-row">
                        <p className="search-album-track">{truncateTextLong(track.name)}</p>
                        <div className="search-row-btn" onClick={(e) => handleClick(e, track.id)}>Add
                            </div>
                    </div>

                )
            })}
        </div>
    )
}
export default SearchAlbum