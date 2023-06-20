import {useState, useEffect, useRef} from 'react';

import useSearch from '../hooks/useSearch'
import SearchInput from '../components/SearchInput';
import SearchResults from '../components/SearchResults';


function SearchSidebar({visible, accessToken, searchState, playlistID}) {

    // const [toggleResults, setToggleResults] = useState(false) // results false by default
    const [search, searchResult, setSearchResult] = useSearch(accessToken) // from the searchResult can get ALL search results since it includes the pagination url
    const [tracks, setTracks] = useState()
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
        // console.log("handling pagination", pagination.current)
        // make a fetch  to get the next round of TRACKS

        fetch(pagination.current, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            // console.log("Next tracks", data)
            pagination.current = data.tracks.next
            // set pagination, set new tracks
            setTracks(prevTracks => prevTracks.concat(data.tracks.items))
        })
    }
    function scroll() {
        // console.log("Scrolling to new tracks", pagination.current)
        // make a fetch to the API to get the new tracks and concat onto the list of tracks, but need to then pass them onto search reults with a re-render
        handlePagination()

    }
    function displayResult() {
        // console.log("SEARCH RESULT", searchResult.tracks.items)
        if(searchResult && tracks) {

            return(
                <SearchResults 
                    tracks={tracks}
                    scroll={scroll}
                />
            )
        }
        // return(
        //     <h1 style={{color: 'black'}}>No results!</h1>
        // )
    }

    useEffect(() => {
        if(searchResult) {
            setTracks(searchResult.tracks.items)
            pagination.current = searchResult.tracks.next // pagination is set on search result (this happens only once per result)
        }
    }, [searchResult])

    useEffect(() => {
        if(searchState === false) {
            setSearchResult()
            // reset input to none
        }
    }, [searchState])

    return(
        <div className={`search-sidebar`} style={{display: visible}}>
            <SearchInput 
                handleSearch={handleSearch}
                searchState={searchState}
            />
            {displayResult()}
            {/* {searchResult !== undefined ? <SearchResults searchResult={searchResult} /> : <span>No results</span>} */}
        </div>
    )
}

export default SearchSidebar