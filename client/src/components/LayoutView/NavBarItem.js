import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faTv, faFilm } from '@fortawesome/free-solid-svg-icons'

const NavBarItem = ({title, url, active, icon}) => {
  let bsActive = false;
  if (url === active) {
    bsActive = true;
  }
  let iconElement;
  if (icon === 'tv') {
    iconElement = <FontAwesomeIcon icon = {faTv}/>
  } else if (icon === 'film')  {
    iconElement = <FontAwesomeIcon icon = {faFilm}/>
  } else if (icon === 'home') {
    iconElement = <FontAwesomeIcon icon = {faHome}/>
  }

  return ( <>
        <li className="nav-item">
            <Link to={url} className={"nav-link " + (bsActive === true ? "active" : "")}>{title} {iconElement}</Link>
        </li>
        </>
  )
}

export default NavBarItem