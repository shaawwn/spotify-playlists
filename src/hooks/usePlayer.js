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
                throw new Error("There was an error playing the song")
            } else {
                console.log("playing/resuming")
            }
        })
    }


    function play(id) {
        console.log("Playing track", id)
        getPlaybackState()
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