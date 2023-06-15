
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faMagnifyingGlass, faBars} from '@fortawesome/free-solid-svg-icons'
// container item for holding navbar menu icons Home, search, account
function NavbarMenu() {
    return(
        <div className="navbar-menu">
            <FontAwesomeIcon icon={faHouse} size="2x"/>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="2x"/>
            <FontAwesomeIcon icon={faBars} size="2x"/>
        </div>
    )
}

export default NavbarMenu