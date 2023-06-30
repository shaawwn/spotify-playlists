import {useEffect, useState} from 'react';
import {truncateTextLong} from '../utils/formatting'


function SearchAlbum({id, load, accessToken, addTrack}) {
    const [album, setAlbum] = useState()
    const [visible, setVisible] = useState(false)
    const [dropdown, setDropdown] = useState('')

    function getAlbum() {

        fetch(`https://api.spotify.com/v1/albums/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            setAlbum(data)
        })
    }

    function displayAlbum() {
        if(visible && album) {
            return(
                <>
                    <SearchAlbumDropdown 
                        tracks={album.tracks.items} 
                        addTrack={addTrack}
                    />
                </>
            )
        }
    }
    useEffect(() => {
        if(load) {
            getAlbum()
            setVisible(true)
            setDropdown('search-dropdown')
        } else {
            setVisible(false)
            setDropdown('')
        }
    }, [load])

    return(
        <div className={`search-album ${dropdown}`}> 
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
            {tracks.map((track, index) => {
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