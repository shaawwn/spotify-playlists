import {useState, useEffect, useRef} from 'react';

// playlist objects include ALL data for that playlist, so no need to make a fetch to get individual playlist when can just use the playlist object (may still need to use pagination though for track lists)
function usePlaylists(accessToken) {

    const [playlists, setPlaylists] = useState([])
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
                console.log("SCROLL DATA", data)
                setPlaylists(prevPlaylists => prevPlaylists.concat(data.items))
                pagination.current = data.next
            })
        }

        // console.log("Scrolling from hook", pagination)
    }

    function getPlaylists() {
        fetch(`https://api.spotify.com/v1/me/playlists`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            setPlaylists(data.items)
            pagination.current = data.next
        })

    }

    useEffect(() => {
        if(accessToken) {
            getPlaylists()
        } 
    }, [accessToken])

    return [playlists, scroll]
}

export default usePlaylists