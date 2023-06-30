import {useState, useEffect, useRef, useCallback} from 'react';

import SearchResultRow from '../components/SearchResultRow'


function SearchResults({tracks, scroll, addTrack, addAllTracks, removeTrack, filter, accessToken}) {

    const [loading, setLoading] = useState(true) // after content has loaded set to false

    const observer = useRef()

    const lastSearchElement = useCallback(node => {
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(tracks => {
            if(tracks[tracks.length - 1].isIntersecting) {
                scroll()
            } 
        })
        if(node) observer.current.observe(node)
    }, [loading])

    function displaySearchResults() {
        // gonna need something for albums here 
        if(filter === 'tracks') {
            return(
                <div className="search-results">
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
                </div>
            )
        } else {
        return(
            <div className="search-results">
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
            </div>
        )}
    }
    // useEffect(() => { // possibly no need

    // }, [tracks])

    useEffect(() => { // this is required to make observer work
        if(loading) {
            setLoading(false)
        }
    }, [])

    return(
        <>
            {displaySearchResults()}
        </>
    )
}

export default SearchResults