
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faMagnifyingGlass, faBars} from '@fortawesome/free-solid-svg-icons'
// container item for holding navbar menu icons Home, search, account

function NavbarMenu({toggleView, toggleSearchbar}) {

    function handleClick(option) {
        if(option === 'home') {
            toggleView('home')
        } else if(option === 'search') {
            toggleSearchbar()
        } else if(option === 'settngs') {
            // go to spotify.com/logout
            console.log("LOUGOUT")
            window.location.href="https://www.spotify.com/logout"
        }

    }
    return(
        <div className="navbar-menu">
            <FontAwesomeIcon onClick={() => handleClick('home')}
                icon={faHouse} size="2x"
            />
            <FontAwesomeIcon  onClick={() => handleClick('search')}
                icon={faMagnifyingGlass} size="2x"
            />
            <FontAwesomeIcon 
                icon={faBars} onClick={() => handleClick('settings')}size="2x"
            />
        </div>
    )
}

export default NavbarMenu