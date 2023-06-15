import {useState, useEffect} from 'react';

// hooks
import useAuth from '../hooks/useAuth';
import usePlaylist from '../hooks/usePlaylist';
import usePlaylists from '../hooks/usePlaylists'

//components
import Navbar from '../components/Navbar'
import Shelf from '../components/Shelf'

// views
import HomeView from '../views/HomeView';
import LoadingView from '../views/LoadingView';
// include a message if user is not premium (free users cannot use app)


function Dashboard({code}) {

    const accessToken = useAuth(code)
    const [user, setUser] = useState()
    const [playlist] = usePlaylist(accessToken)
    const [playlists, scroll] = usePlaylists(accessToken)



    function toggleView() {

    }

    function displayView() {

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

    useEffect(() => {
        if(user && user.product !== 'premium') {
            console.log("Redirect to spotify signup page")
        }
    }, [user])

    useEffect(() => {

    }, [playlists])
    return(
        <div className="dashboard">
            {user ? 
            <>
                <Navbar username={user.display_name} />
                <div className="container">
                    <div className="container-view">
                        <Shelf playlists={playlists.slice(0, 5)}/>
                        <HomeView 
                            playlists={playlists}
                            scroll={scroll}
                        />
                    </div>
                </div>
            </>
            :<LoadingView />}
        </div>
    )
}

export default Dashboard