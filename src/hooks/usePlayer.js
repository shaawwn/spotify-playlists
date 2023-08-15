import {useState, useEffect} from 'react';


// hook for managing playback in app

function usePlayer(accessToken) {

    const [activeDevice, setActiveDevice] = useState() // 
    const [devices, setDevices] = useState()
    const [playState, setPlaystate] = useState(false)

    function getDevices() {
        fetch(`https://api.spotify.com/v1/me/player/devices`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log("Devices: ", data)
            // set active device and devices
            const isActive = data.devices.filter((device) => device.is_active === true)
            setActiveDevice(isActive)
            setDevices(data.devices)
        })
    }

    function getPlaybackState() {
        fetch(`https://api.spotify.com/v1/me/player`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            // check is_playing true ? pause : play
            // also check that the track is the same as the one being played? If
            console.log("Current playback state", data)
            if(data.is_playing === true) {
                console.log("Should pause")
                _apiPause()
            } else if(data.is_playing === false) {
                console.log("Should play")
                _apiResume()
            }
        })
    }

    function _apiPause() {

        fetch(`https://api.spotify.com/v1/me/player/pause`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error("There was an error pausing the song")
            } else {
                console.log("pausing")
            }
        })
    }

    function _apiResume() {
        // resume differs from Play in that resume just 'resumes' playback of current song, whereas
        // 'Play' requires songID, context, etc. Therefore, will make a new function to handle Play
        fetch(`https://api.spotify.com/v1/me/player/play`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error("There was an error playing the song", response)
            } else {
                console.log("playing/resuming")
            }
        })
    }

    function checkPlaybackState(uri, context) {
        fetch(`https://api.spotify.com/v1/me/player`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error("there was a problem")
            } else {
                response.json()
            }
        }).then((data) => {
            if(data === undefined) {
                throw new Error("Response undefined")
            }
            if(data.is_playing === true) {
                console.log("Should pause")
            } else if(data.is_playing === false) {
                console.log("Should play")
            }
        }).catch((err) => {
            console.log("Reached error log", err)
        })
    }


    function play(uri, context, offset) {

        // console.log("Playing track", uri, context)
        // getPlaybackState() // check what the current playback is, if playing, pause, if not, play
        checkPlaybackState(uri, context) // so this actually works its the next lines of code that bugger up
        if(uri) {
            _playFromUri(uri)
        } else if(context) {
            _playFromContext(context, offset)
        }
    }

    // maybe run the same checks, but handle in promise?
    function _playFromContext(context, offset) {
        fetch(`https://api.spotify.com/v1/me/player/play`,{
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({context_uri: context, offset: {position: offset}})
        }).then((response) => {
            if(!response.ok) {
                throw new Error("There was a problem starting the song", response)
            } else {
                console.log("Starting track")
            }
        })
    }

    function _playFromUri(uri) {
        fetch(`https://api.spotify.com/v1/me/player/play`,{
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({uris: [uri]})
        }).then((response) => {
            if(!response.ok) {
                throw new Error("There was a problem starting the song", response)
            } else {
                console.log("Starting track")
            }
        })
    }

    function pause(id) {
        // can just pause this since the conditions in which you woudl pause don't depend on what the song is
        // (pausing just pauses playback, doesnt need songID or anything else)
        console.log("Pausing track", id)
        getPlaybackState()
    }

    function resume() {
        // TODO handles resume over starting a new track (which requires songID, contextID, etc)
    }
    
    function next() {
        console.log("Skipping to next")
    }

    function previous() {
        console.log("Going to previous track")
    }

    useEffect(() => {
        if(accessToken) {
            getDevices()
        }
    }, [accessToken])

    useEffect(() => {
        if(activeDevice) {
            console.log("Active device is", activeDevice, devices)
        }
    }, [devices, activeDevice])

    return [play, pause, previous, next]
}

export default usePlayer;