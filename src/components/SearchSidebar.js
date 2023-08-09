import {useState, useEffect, useRef} from 'react';

import useSearch from '../hooks/useSearch'
import SearchInput from '../components/SearchInput';
import SearchResults from '../components/SearchResults';


function SearchSidebar({visible, accessToken, searchState, addTrack, addAllTracks, removeTrack, play, pause}) {

    const [search, searchResult, setSearchResult] = useSearch(accessToken) // from the searchResult can get ALL search results since it includes the pagination url
    const [tracks, setTracks] = useState()
    const [albums, setAlbums] = useState()
    const [filter, setFilter] = useState('tracks') // tracks or albums
    const pagination = useRef()


    const delay = useRef()

    function handleSearch(queryString) {
        // if you backspace too fast, the query search is still lined up to fire

        if(queryString === '') {
            // do nothing because there is no value to search
            if(delay.current) { // clear delays to prevent unintended search querys that are still in the pipeline
                clearTimeout(delay.current)
            }
            console.log("Nothing to search.", queryString)
            // clear results
            // setAllResults(undefined)
            setSearchResult()
            // setTracks([])
            // setArtists([])
            // setAlbums([])
            // setPlaylists([])
            // setShows([])
            // setFirstLoad(true)
            // setFilter('all')
            return false
        }

        if(delay.current) {
            // as a user types, allow for a small buffer before making an actual fetch, using a timer interval.
            // if there is currently a timerInterval, user is still typing, clear current timer and reset
            clearTimeout(delay.current)
        }
        
        // setFirstLoad(true)
        delay.current = setTimeout(() => search(queryString), 500)
    }

    function handlePagination() {
        if(pagination.current === null) {
            console.log("No more results")
            return false
        }
        fetch(pagination.current, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            pagination.current = data.tracks.next
            // set pagination, set new tracks
            setTracks(prevTracks => prevTracks.concat(data.tracks.items))
        })
    }

    function scroll() {
        // make a fetch to the API to get the new tracks and concat onto the list of tracks, but need to then pass them onto search results with a re-render
        handlePagination()
    }

    function toggleResults(toggle) {
        // can toggle between tracks/albums/maybe artists (artist top tracks?)
        if(toggle === 'tracks') {
            setFilter('tracks')
        } else if(toggle === 'albums') {
            setFilter('albums')
        }
    }

    function displayResult() {
        if(filter === 'tracks') {
            if(searchResult && tracks) {
                return(
                    <>
                    <ToggleFilter 
                        current={filter}
                        toggle={toggleResults}
                    />
                    <SearchResults 
                        tracks={tracks}
                        scroll={scroll}
                        addTrack={addTrack}
                        addAllTracks={addAllTracks}
                        removeTrack={removeTrack}
                        filter={filter}
                        accessToken={accessToken}
                        play={play}
                        pause={pause}
                    />
                    </>
                )
            }
        } else if(filter === 'albums') {
            if(searchResult && tracks) {
                return(
                    <>
                        <ToggleFilter 
                            current={filter}
                            toggle={toggleResults}
                        />
                        <SearchResults 
                            tracks={albums}
                            scroll={scroll}
                            addTrack={addTrack}
                            addAllTracks={addAllTracks}
                            removeTrack={removeTrack}
                            filter={filter}
                            accessToken={accessToken}
                        /> 
                    </>
                )
            }
        }
    }

    useEffect(() => {
        if(searchResult) {
            setTracks(searchResult.tracks.items)
            setAlbums(searchResult.albums.items)
            pagination.current = searchResult.tracks.next // pagination is set on search result (this happens only once per result)
        }
    }, [searchResult])

    useEffect(() => {
        if(searchState === false) {
            setSearchResult() // resets input to ''
        }
    }, [searchState])

    return(
        <div className={`search-sidebar`} style={{display: visible}}>
            <SearchInput 
                handleSearch={handleSearch}
                searchState={searchState}
            />
            {displayResult()}
        </div>
    )
}

function ToggleFilter({current, toggle}) {

    function handleClick(param) {
        toggle(param)
    }

    function displayTracksButton() {
        if(current === 'tracks') {
            return(
                <button className="search-row-btn toggle-current" onClick={() => handleClick('tracks')}>Tracks</button>
            )
        } 
        return(
            <button className="search-row-btn toggle" onClick={() => handleClick('tracks')}>Tracks</button>
        )
    }

    function displayAlbumsButton() {
        if(current === 'albums') {
            return(
                <button className="search-row-btn toggle-current" onClick={() => handleClick('albums')}>Albums</button>
            )
        } 
        return(
            <button className="search-row-btn toggle" onClick={() => handleClick('albums')}>Albums</button>
        )
    }

    function display() {
        return(
            <>
                {displayTracksButton()}
                {displayAlbumsButton()}
            </>
        )
    }

    return (
        <div className="search-filter-toggle">
            {display()}
        </div>
    )
}
export default SearchSidebar