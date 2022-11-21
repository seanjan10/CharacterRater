import { Link, useLocation} from 'react-router-dom'
import NavBarItem from './NavBarItem';

const Navbar = () => {
  const location = useLocation();
  //console.log(location.pathname);

  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <NavBarItem title="Home" url="/" active={location.pathname}/>
              <NavBarItem title="Movies" url="/movie" active={location.pathname}/>
              <NavBarItem title="TV Shows" url="/tv" active={location.pathname}/>
              <NavBarItem title="Characters" url="/character" active={location.pathname}/>
            </ul>
            <form className="d-flex" role="search">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
              </ul>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-dark" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
