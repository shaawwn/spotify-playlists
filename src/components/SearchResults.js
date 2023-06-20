import {useState, useEffect, useRef, useCallback} from 'react';

import SearchResultRow from '../components/SearchResultRow'

function SearchResults({tracks, scroll, playlistID}) {
    // console.log("Search results", playlistID)

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

    function displaySearchResults() {
        
        return(
            <>
                {tracks.map((track, index) => {
                    if(tracks.length === index + 1) {
                        return(
                            <SearchResultRow 
                                track={track}
                                innerRef={lastSearchElement}
                                key={track.id}
                                playlistID={playlistID}
                            />
                        )
                    } else {
                        return(
                            <SearchResultRow 
                                track={track}
                                key={track.id}
                                playlistID={playlistID}
                            />
                        )
                    }
                })}
            </>
        )
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
        <table className="search-results">
            <thead>
                <tr>
                    <th>Track</th>
                </tr>
            </thead>
            <tbody>
                {displaySearchResults()}
            </tbody>
        </table>
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