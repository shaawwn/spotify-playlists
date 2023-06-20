import {useState, useEffect} from 'react';

// hooks
import useAuth from '../hooks/useAuth';
import usePlaylist from '../hooks/usePlaylist';
import usePlaylists from '../hooks/usePlaylists'
import useSearch from '../hooks/useSearch';
import useHistory from '../hooks/useHistory'

//components
import Navbar from '../components/Navbar'
import Shelf from '../components/Shelf'
import SearchSidebar from '../components/SearchSidebar'

// views
import HomeView from '../views/HomeView';
import LoadingView from '../views/LoadingView';
import PlaylistView from '../views/PlaylistView'

// import HistoryNavigator from '../components/historyNav' // TODO
// include a message if user is not premium (free users cannot use app)

// awesome playlist id= 37i7cmrZzQ3irpEJbyqIw9

function Dashboard({code}) {

    const accessToken = useAuth(code)
    const [user, setUser] = useState()
    const [playlistID, setPlaylistID] = useState()
    const [playlist, addTrack, removeTrack] = usePlaylist(accessToken, playlistID)
    const [playlists, scroll] = usePlaylists(accessToken)
    const [activePlaylist, setActivePlaylist] = usePlaylist(accessToken, playlistID)
    const [view, setView] = useState('home') // home by default
    const [searchbar, setSearchbar] = useState('none') // toggle searchbar
    const [searchState, setSearchState] = useState(false) // use this to reset search



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
        console.log(view, id)
        if(view === 'playlist') {
            setPlaylistID(id)
        } else if(view === 'home') {
            setPlaylistID()
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
                />
            )
        } else if(view === 'home') {
            return(
                <HomeView 
                    playlists={playlists}
                    scroll={scroll}
                    toggleView={toggleView}
                /> 
            )

        }
    }

    function displayNavbar() {
        // horizontal navbar at top of page
    }

    function getCurrentUser() {
        fetch(`https://api.spotify.com/v1/me`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => response.json())
        .then((data) => {
            setUser(data)
        })
    }

    useEffect(() => {
        if(accessToken) {
            // getCurrentUser(accessToken, setUser, setPremium)
            getCurrentUser()
        }
    }, [accessToken])

    // useEffect(() => {
    //     if(user && user.product !== 'premium') {
    //         console.log("Redirect to spotify signup page")
    //     }
    // }, [user])

    useEffect(() => {
        // console.log("playlists", playlists)
        // if(playlists.length > 0) {
        //     // set a playlists so that when you add songs, there is no error, OR, just add error handling when you try to add songs
        //     setPlaylistID(playlists[0].id)
        // }
        
    }, [playlists])

    useEffect(() => {
        // console.log("PLAYLIST IN DASHBOARD", playlist)
    }, [playlistID])

    return(
        <div className="dashboard">
            {user ? 
            <>
                <Navbar 
                    username={user.display_name}
                    toggleView={toggleView}
                    toggleSearchbar={toggleSearchbar} 
                    />
                <div className="container">
                    <div className="container-view">
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
                        removeTrack={removeTrack}

                    />
                </div>
            </>
            :<LoadingView />}
        </div>
    )
}

export default Dashboard