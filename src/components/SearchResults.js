import {useState, useEffect, useRef, useCallback} from 'react';

import SearchResultRow from '../components/SearchResultRow'
import SearchAlbum from '../components/SearchAlbum'

function SearchResults({tracks, scroll, addTrack, addAllTracks, removeTrack, filter, accessToken}) {

    const [loading, setLoading] = useState(true) // after content has loaded set to false

    const observer = useRef()

    const lastSearchElement = useCallback(node => {
        // console.log("Last element")
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(tracks => {
            if(tracks[tracks.length - 1].isIntersecting) {
                scroll()
                // console.log("End of results", tracks[tracks.length - 1].target.innerText)
            } 
        })
        if(node) observer.current.observe(node)
    }, [loading])

    function displayAlbumTracks() {
        // clicking on an album will create a dropdown showing a what tracks are in the album as well as options to add individual tracks or all
    }

    function displaySearchResults() {
        // gonna need something for albums here 
        if(filter === 'tracks') {
            return(
                <>
                    {tracks.map((track, index) => {
                        if(tracks.length === index + 1) {
                            return(
                                <SearchResultRow 
                                    track={track}
                                    innerRef={lastSearchElement}
                                    key={track.id}
                                    addTrack={addTrack}
                                    removeTrack={removeTrack}
                                />
                            )
                        } else {
                            return(
                                <SearchResultRow 
                                    track={track}
                                    key={track.id}
                                    addTrack={addTrack}
                                    removeTrack={removeTrack}
                                />
                            )
                        }
                    })}
                </>
            )
        } else {
        return(
            <>
                {tracks.map((track, index) => {
                    if(tracks.length === index + 1) {
                        return(
                            <SearchResultRow 
                                track={track}
                                innerRef={lastSearchElement}
                                key={track.id}
                                addTrack={addTrack}
                                addAllTracks={addAllTracks}
                                removeTrack={removeTrack}
                                albumID={track.id}
                                accessToken={accessToken}
                            />
                        )
                    } else {
                        return(
                            <SearchResultRow 
                                track={track}
                                key={track.id}
                                addTrack={addTrack}
                                addAllTracks={addAllTracks}
                                removeTrack={removeTrack}
                                albumID={track.id}
                                accessToken={accessToken}
                            />
                        )
                    }
                })}
            </>
        )}
    }
    useEffect(() => {
        // console.log(searchResult.tracks.items)
    }, [tracks])

    useEffect(() => {
        if(loading) {
            setLoading(false)
        }
    })

    return(
        <div className="search-results">
            {/* <thead>
                <tr>
                    <th>Track</th>
                </tr>
            </thead> */}
            <div>
                {displaySearchResults()}
            </div>
        </div>
    )
}

// function SearchResultRow({track, innerRef}) {

//     return(
//         <tr className="search-row" ref={innerRef}>
//             <td style={{color: 'black'}}>
//                 {track.name}
//             </td>
//         </tr>
//     )
// }
export default SearchResults