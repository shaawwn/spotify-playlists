import {useState, useEffect, useRef} from 'react';

// playlist objects include ALL data for that playlist, so no need to make a fetch to get individual playlist when can just use the playlist object (may still need to use pagination though for track lists)
function usePlaylists(accessToken, refresh) {

    const [playlists, setPlaylists] = useState([])
    const [numPlaylists, setNumPlaylists] = useState(0)
    const [reload, setReload] = useState(false)
    const pagination = useRef()

    function scroll() {
        // using the pagination url, load more playlists (if any)
        if(pagination.current === null) {
            console.log("No more playlists")
            return false
        } else {
            // console.log("There are more playlists")
            fetch(pagination.current, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then((response) => response.json())
            .then((data) => {
                // if(data.next === null) {
                //     // last page

                // }
                // console.log("SCROLL DATA", data)
                pagination.current = data.next
                setPlaylists(prevPlaylists => prevPlaylists.concat(data.items))
                // pagination.current = data.next
            })
        }

        // console.log("Scrolling from hook", pagination)
    }

    function _reload() {
        if(reload === true) {
            setReload(false)
        } else if(reload === false) {
            setReload(true)
        }
    }

    function getPlaylists() {
        fetch(`https://api.spotify.com/v1/me/playlists`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log("DATA", data)
            // console.log("Users playlist data", data.total)
            setPlaylists(data.items)
            setNumPlaylists(data.total)
            pagination.current = data.next
        }).catch((err) => {
            console.log("There was an error", err)
        })

    }

    // function createPlaylist() {

    //     // create a new playlist with a defauly name My Playlist #whatever, take users total playlists and add + 1
    //     const newPlaylist = {
    //         "name": `My Playlist ${numPlaylists + 1}`,
    //         "description": 'My new awesome playlist',
    //         "public": true,
    //         "collaborative": false
    //     }
    //     console.log("Creating: ", newPlaylist)

    //     fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': `Bearer ${accessToken}`
    //         },
    //         body: JSON.stringify(newPlaylist)
    //     }).then((response) => response.json())
    //     .then((data) => {
    //         // console.log("Playlist created", data)
    //         toggleView('playlist', data.id)
    //         _refreshPlaylists()
    //         _refresh()
    //     }).catch((error) => {
    //         console.log("error creating playlist", error)
    //     })
    // }

    useEffect(() => {
        if(accessToken) {
            // console.log("Loading playlists init, refresh value: ", refresh)
            getPlaylists()
        } 
    }, [accessToken])

    useEffect(() => {
        // by default, refresh is set to false, only after that first load should it be true
        if(accessToken) {
            // console.log("Refresh playlists")
            getPlaylists()
        }
    }, [refresh])

    return [playlists, scroll, numPlaylists]
}

export default usePlaylists