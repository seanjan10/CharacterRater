import { Link } from 'react-router-dom'

const NavBarItem = ({title, url, active}) => {
  let bsActive = false;
  if (url === active) {
    bsActive = true;
  }
  return ( <>
        <li className="nav-item">
            <Link to={url} className={"nav-link " + (bsActive === true ? "active" : "")}>{title}</Link>
        </li>
        </>
  )
}

export default NavBarItem