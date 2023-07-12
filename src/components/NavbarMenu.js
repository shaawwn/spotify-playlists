
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faMagnifyingGlass, faBars, faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'
// container item for holding navbar menu icons Home, search, account

function NavbarMenu({toggleView, toggleSearchbar}) {

    function handleClick(option) {
        if(option === 'home') {
            toggleView('home')
        } else if(option === 'search') {
            toggleSearchbar()
        } else if(option === 'logout') {
            // go to spotify.com/logout
            // console.log("LOUGOUT")
            // window.location.href="https://www.spotify.com/logout"
            redirectToLogin()
        }

    }

    function redirectToLogin() {
        console.log("Logging out...")
        window.location.href="https://www.spotify.com/logout"
        // setTimeout(() => {
        //     console.log("Redirecting to login page after logout")
        //     window.location.href="https://shaawwn.github.io/spotify-playlists/"
        // }, 500)
    }
    return(
        <div className="navbar-menu">
            <FontAwesomeIcon className="navbar-item" onClick={() => handleClick('home')}
                icon={faHouse} size="2x"
            />
            <FontAwesomeIcon  className="navbar-item" onClick={() => handleClick('search')}
                icon={faMagnifyingGlass} size="2x"
            />
            <FontAwesomeIcon 
                icon={faBars} className="navbar-item" onClick={() => handleClick('settings')}size="2x"
            />
            <FontAwesomeIcon 
                icon={faArrowRightFromBracket} className="navbar-item" onClick={() => handleClick('logout')}size="2x"
            />
        </div>
    )
}

export default NavbarMenu