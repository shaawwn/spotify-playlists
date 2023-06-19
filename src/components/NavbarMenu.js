
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faMagnifyingGlass, faBars} from '@fortawesome/free-solid-svg-icons'
// container item for holding navbar menu icons Home, search, account

function NavbarMenu({toggleView, toggleSearchbar}) {

    function handleClick(option) {
        if(option === 'home') {
            toggleView('home')
        } else if(option === 'search') {
            toggleSearchbar()
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
                icon={faBars} size="2x"
            />
        </div>
    )
}

export default NavbarMenu