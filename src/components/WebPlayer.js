import {useState, useEffect, useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLaptop, faMobileScreen, faDesktop, faPlay, faPause, faCirclePause, faForward, faBackward, faRepeat, faShuffle} from '@fortawesome/free-solid-svg-icons'

function WebPlayer({accessToken, getDevices, devices, changeDevice}) {
    // console.log("Web player...")

    const [player, setPlayer] = useState()
    const [deviceMenu, setDeviceMenu] = useState(false)
    const [playerChange, setPlayerChange] = useState(false)

    function initPlayer() {
        
        if(player) {
            // if an instance of player exists, remove listeners and disconnect/destroy that player
            disconnectPlayer()
        }
        const script = document.createElement('script');
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Spotify Playlists',
                getOAuthToken: cb => {cb(accessToken); },
                volume: 0.5
            })

            setPlayer(player)
            
            const ready = ({device_id}) => {
                console.log("Ready with DeviceID", device_id)
                getDevices() // confirm the device is ready before calling getDevices
            }

            const not_ready = ({device_id}) => {
                console.log("Device ID has gone offline", device_id)
            }

            player.addListener('ready', ready)
            player.addListener('not_ready', not_ready)
            
            console.log("Getting devices on player init")
            player.connect();
            // getDevices()
        }
    }

    function disconnectPlayer() {
        player.removeListener('ready', player._eventListeners.ready[0])
        player.removeListener('not_ready', player._eventListeners.not_ready[0])
        player.disconnect()
        setPlayer()
    }

    function handleDeviceChange(deviceID) {
        console.log("Changing to deviceID:", deviceID)
        // setActiveDevice(deviceID)
        changeDevice(deviceID)
        // getDevices()
        if(playerChange === false) {
            setPlayerChange(true)
        } else if (playerChange === true) {
            setPlayerChange(false)
        }
    }

    function displayDeviceMenu() {
        // getDevices()
        // console.log("Displaying device menu:", devices)
        // getDevices()
        return(
            <div className="devices-selector">
                {devices.map((device) => 
                    {if(device.type == 'Computer') {
                        return(
                        <div className="devices-selector-item" key={uuidv4()}> 
                            {device.is_active ? 
                                <FontAwesomeIcon icon={faLaptop} className="webplayer-controls-btn active-device" 
                                />    
                            :<FontAwesomeIcon 
                                icon={faLaptop} className="webplayer-controls-btn" 
                                onClick={() => handleDeviceChange(device.id)}
                                />
                        }
                            <p>{device.name}</p>
                        </div>
                        )
                    }}

                )}
            </div>
            // <DeviceMenu accessToken={accessToken}/>
        )
    }

    function toggleDeviceMenu() {
        // console.log("Opening device menu")
        if(deviceMenu) {
            // console.log("menu is open")
            setDeviceMenu(false)
        } else {
            // console.log('menu is not open')
            setDeviceMenu(true)
        }
    }

    function dummyClick() {
        alert("I don't do anything yet!")
    }
    // useEffect(() => {

    //     initPlayer() // need to get devices AFTER init and state set

    //     return () => {
    //         if(player) {
    //             console.log("disconnecting...")
    //             disconnectPlayer()
    //         }
    //     }
    // }, [])
    
    // useEffect(() => {
    //     // getDevices()
    //     // getDevices()
    //     console.log(playerChange)
    //     // getDevices()
    // }, [playerChange])

    
    return(
        <div className="webplayer">
            <div className="webplayer-wrapper">
                <div className="webplayer-details">
                    <p>Details</p>
                </div>
            </div>
            <div className="webplayer-wrapper">
                <div className="webplayer-controls">
                    <FontAwesomeIcon onClick={dummyClick} icon={faBackward} className="webplayer-controls-btn"/>
                    <FontAwesomeIcon onClick={dummyClick} icon={faPlay} 
                    className="webplayer-controls-btn"/>
                    <FontAwesomeIcon onClick={dummyClick} icon={faForward} className="webplayer-controls-btn"/>
                </div>
            </div>
            <div className="webplayer-wrapper">
                <div className="webplayer-settings">
                    <FontAwesomeIcon icon={faLaptop} className="webplayer-controls-btn" onClick={dummyClick}/>
                </div>
            </div>
            {deviceMenu === true ? displayDeviceMenu() : <span></span>}
        </div>
    )
}

// function DeviceMenu({accessToken}) {

//     const [devices, setDevices] = useState([])

//     function handleDeviceChange(device) {
//         console.log("Changing device from component")
//     }

//     function getDevices() {
//         console.log("Getting devices")
//         fetch(`https://api.spotify.com/v1/me/player/devices`, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`
//             }
//         }).then((response) => response.json())
//         .then((data) => {
//             console.log("Devices from within comp", data.devices)
//             setDevices(data.devices)
//         })
//     }

//     function displayMenu(device) {
//         return(
//             <>
//                 {devices ? 
//                     <div className="devices-selector-item" key={uuidv4()}> 
//                     {device.is_active ? 
//                         <FontAwesomeIcon icon={faLaptop} className="webplayer-controls-btn active-device" 
//                         />    
//                     :<FontAwesomeIcon 
//                         icon={faLaptop} className="webplayer-controls-btn" 
//                         onClick={() => handleDeviceChange(device.id)}
//                         />
//                 }
//                     <p>{device.name}</p>
//                 </div>
//                 :<span></span>
//             }
//             </>
//         )
//         }

//     useEffect(() => {
//         // only fetch devices when device menu is opened
//         getDevices()
//     }, [])

//     useEffect(() => {

//     }, [devices])

//     return(
//         <div className="devices-selector">
//             {devices.map((device) => 
//                 {if(device.type == 'Computer') {
//                     // return(
//                     // <div className="devices-selector-item" key={uuidv4()}> 
//                     //     {device.is_active ? 
//                     //         <FontAwesomeIcon icon={faLaptop} className="webplayer-controls-btn active-device" 
//                     //         />    
//                     //     :<FontAwesomeIcon 
//                     //         icon={faLaptop} className="webplayer-controls-btn" 
//                     //         onClick={() => handleDeviceChange(device.id)}
//                     //         />
//                     // }
//                     //     <p>{device.name}</p>
//                     // </div>
//                     // )
//                     displayMenu(device)
//                 }}
//         )}
//         </div>
//     )
// }
export default WebPlayer