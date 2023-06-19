import {useState, useEffect, useRef} from 'react';


function useSearch(accessToken) {

    const [searchResult, setSearchResult] = useState()
    const [tracks, setTracks] = useState([])
    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [shows, setShows] = useState([])

    const searchTypes = ["album", "artist", "playlist", "track", "show"]
    // const pagination = useRef()



    function search(query) {
        // 'type' is the desired query type, eg 'track', 'album', default is all seachTypes
        if(query === '') {
            // nothing to search, abort before query
            console.log("Nothing to search, aborting query")
            return false
        }
        fetch(`https://api.spotify.com/v1/search?q=${query}&type=${searchTypes}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((data) => {
            // console.log('hook search', data)
            if(data.error === 400) {
                console.error("400 error in fetch")
                setSearchResult()
                // return false
            } else {
                setSearchResult(data)
            }
        })

        
    }
    // console.log("Search result in hook", searchResult)
    return [search, searchResult, setSearchResult]
}


export default useSearch;