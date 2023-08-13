import {useState, useEffect, useRef} from 'react';

// hooks
import useAuth from '../hooks/useAuth';
import usePlaylist from '../hooks/usePlaylist';
import usePlaylists from '../hooks/usePlaylists'
import usePlayer from '../hooks/usePlayer';
import useSearch from '../hooks/useSearch';
import useHistory from '../hooks/useHistory'


//components
import Navbar from '../components/Navbar'
import Shelf from '../components/Shelf'
import SearchSidebar from '../components/SearchSidebar'
import HistoryNavigator from '../components/HistoryNavigator';
import Grid from '../components/Grid'

// views
import HomeView from '../views/HomeView';
import LoadingView from '../views/LoadingView';
import PlaylistView from '../views/PlaylistView'

// import HistoryNavigator from '../components/historyNav' // TODO
// include a message if user is not premium (free users cannot use app)

function Dashboard({code}) {

    const accessToken = useAuth(code)
    const [user, setUser] = useState()
    const [playlistID, setPlaylistID] = useState()
    const [playlist, addTrack, removeTrack, editDetails, unfollowPlaylist, addAllTracks] = usePlaylist(accessToken, playlistID)
    const[play, pause, previous, next] = usePlayer(accessToken)
    // playlists 
    const refreshPlaylists = useRef(false)
    const [playlists, scroll, numPlaylists] = usePlaylists(accessToken, refreshPlaylists.current)

    const [activePlaylist, setActivePlaylist] = usePlaylist(accessToken, playlistID)
    const history = useHistory()


    const [view, setView] = useState('home') // home by default
    const [searchbar, setSearchbar] = useState('none') // toggle searchbar
    const [searchState, setSearchState] = useState(false) // use this to reset search input to ''
    const [refresh, setRefresh] = useState(false)


    function updateHistory(page, logHistory=true) {
        if(logHistory === true) {
            history.addPage(page)  // page = {'playlist': <playlistID>}   
        } // else do not update history
    }

    function _refresh() {
        if(refresh === true) {
            setRefresh(false)
        } else if(refresh === false) {
            setRefresh(true)
        }
    }

    function _refreshPlaylists() {
        if(refreshPlaylists.current === false) {
            refreshPlaylists.current = true
        } else if(refreshPlaylists.current === true) {
            refreshPlaylists.current = false
        }
    }

    function handleCreatePlaylistRefresh() {
        // refresh dashboard when a new playlist is created to render new playlist in the list
        _refresh()
        _refreshPlaylists()
    }

    function createPlaylist() {
        // create a new playlist with a defauly name My Playlist #whatever, take users total playlists and add + 1
        const newPlaylist = {
            "name": `My Playlist ${numPlaylists + 1}`,
            "description": 'My new awesome playlist',
            "public": true,
            "collaborative": false
        }
        console.log("Creating: ", newPlaylist)

        fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(newPlaylist)
        }).then((response) => response.json())
        .then((data) => {
            // console.log("Playlist created", data)
            toggleView('playlist', data.id)
            handleCreatePlaylistRefresh()
        }).catch((error) => {
            console.log("error creating playlist", error)
        })
    }

    function toggleSearchbar() {
        // toggle search bar on/off
        if(searchbar === 'flex') {
            setSearchbar('none')
            _toggleSearchState()
        } else if(searchbar === 'none') {
            setSearchbar('flex')
            _toggleSearchState()
        }
    }


    function _toggleSearchState() {
        if(searchState === true) {
            setSearchState(false)
        } else if(searchState === false) {
            setSearchState(true)
        }
    }


    function toggleView(view, id) {
        // console.log(view, id)
        if(view === 'playlist') {
            setPlaylistID(id)
            updateHistory(['playlist', id], true)
        } else if(view === 'home') {
            setPlaylistID()
            _refreshPlaylists()
        }
        setView(view)
    }


    function displayView() {
        if(view === 'playlist' && playlistID) { // playlist cannot be null
            return(
                <PlaylistView 
                    accessToken={accessToken}
                    playlistID={playlistID}
                    playlist={playlist}
                    removeTrack={removeTrack}
                    editDetails={editDetails}
                    unfollowPlaylist={unfollowPlaylist}
                    toggleView={toggleView}
                    play={play}
                    pause={pause}
                />
            )
        } else if(view === 'home') {
            return(
                // <div onMouseEnter={changeScroll} onMouseLeave={changeScroll}>
                <HomeView 
                    playlists={playlists}
                    scroll={scroll}
                    toggleView={toggleView}
                    createPlaylist={createPlaylist}
                    numPlaylists={numPlaylists}
                /> 
                // </div>
            )

        }
    }

    function displayNavAndSidebar() {
        return (
            <>
                <Navbar 
                    username={user.display_name}
                    toggleView={toggleView}
                    toggleSearchbar={toggleSearchbar} 
                    />
                <div className="dashboard-main-container">
                    <div className="dashboard-main-container-view">
                        {/* <HistoryNavigator 
                            history={history}
                            toggleView={toggleView}
                            /> */}
                        <Shelf 
                            playlists={playlists.slice(0, 5)}
                            toggleView={toggleView}
                        />
                        {displayView()}
                </div>
                <SearchSidebar 
                    visible={searchbar}
                    accessToken={accessToken}
                    searchState={searchState}
                    addTrack={addTrack}
                    addAllTracks={addAllTracks}
                    removeTrack={removeTrack}
                    play={play}
                    pause={pause}
                />
                </div>
            </>
        )
    }

    function getCurrentUser() {
        fetch(`https://api.spotify.com/v1/me`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            // console.log("Current user", data)
            setUser(data)
        })
    }
    
    function onLoad() {
        getCurrentUser()
    }

    useEffect(() => {
        if(accessToken) {
            onLoad()
        }
    }, [accessToken])

    useEffect(() => {
        if(user && user.product !== 'premium') {
            // console.log("Redirect to spotify signup page")
            // // alert("Only Spotify Premium accounts are can use this app!")
            // const message = "Only Spotify Premium accounts can use this app, would you like to upgrade to premium?"
            // if(window.confirm(message) === true) {
            //     window.location.href="https://www.spotify.com/us/premium/"
            // } else {
            //     window.location.href="https://www.spotify.com/logout"
            //     setTimeout(() => {
            //         window.location.href="https://shaawwn.github.io/spotify-playlists/"
            //     }, 500)
            // }
        } else {
            console.log("User is premium!")
        }
    }, [user])

    useEffect(() => {
        // console.log("playlists", playlists)
        // if(playlists.length > 0) {
        //     // set a playlists so that when you f songs, there is no error, OR, just add error handling when you try to add songs
        //     setPlaylistID(playlists[0].id)
        // }
        
    }, [playlists])

    useEffect(() => {
        // console.log("PLAYLIST IN DASHBOARD", playlist)
    }, [playlistID])


    return(
        <div className="dashboard">
            {user ? 
            displayNavAndSidebar()
            :<LoadingView />}
        </div>
    )
}


export default Dashboard

// function Wrapper(content) {

//     function displayContent() {
//         return(
//             {content}
//         )
//     }
//     return(
//         <div className="wrapper">
//             {displayContent()}
//         </div>
//     )
// }