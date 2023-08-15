import {useState, useEffect} from 'react';


// hook for managing playback in app

function usePlayer(accessToken) {

    const [activeDevice, setActiveDevice] = useState() // 
    const [devices, setDevices] = useState()
    const [playState, setPlaystate] = useState(false)


    function getDevices() {
        console.log("Getting devices")
        fetch(`https://api.spotify.com/v1/me/player/devices`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            // set active device and devices
            const isActive = data.devices.filter((device) => device.is_active === true) //defaults activeDevice if device currently active
            if(isActive.length > 0) {
                setActiveDevice(isActive[0])
            } else if(isActive.length === 0 && data.devices.length > 0) {
                setActiveDevice(data.devices[0])
            } else {
                // alert("There are no active devices, you must open the spotify app to play control content.")
                // throw new Error("There are no playable devices")
            }
            // setActiveDevice(isActive)
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

    function startPlayback(uri, context, offset) {
        // start playback if no state exists
        if(uri) {
            _playFromUri(uri)
        } else if(context) {
            _playFromContext(context, offset)
        }
    }
    function play(uri, context, offset) {
        fetch(`https://api.spotify.com/v1/me/player`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error ("There was a problem with the response")
            } else if(response.status === 204){
                if(inActiveDevice() != false) {
                    console.log("!!!!", inActiveDevice())
                    startPlayback(uri, context, offset)
                }
            } else if(response.status === 200) {
                if(inActiveDevice() != false) {
                    startPlayback(uri, context, offset)
                }
            }else (response.json()) 
        }).catch((err) => {
            console.log("Error: ", err)
        })
    }

    function inActiveDevice() {
        // return false for an inactive device, as error handling to prevent fetch api on undefined devices 
        if(activeDevice === undefined){
            return false
        }
    }

    // maybe run the same checks, but handle in promise?
    function _playFromContext(context, offset) {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${activeDevice.id}`,{
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({context_uri: context, offset: {position: offset}})
        }).then((response) => {
            if(!response.ok) {
                throw new Error("There was a problem starting the song from context", response)
            } else {
                console.log("Starting track")
            }
        }).catch((err) => {
            console.log("Err in context", err, context, offset, activeDevice)
        })
    }

    function _playFromUri(uri) {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${activeDevice.id}`,{
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