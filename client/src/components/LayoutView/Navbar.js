import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <nav className="layout__nav">
          <div>
            <Link to="/" className="layout-nav__item">Home</Link>
            <Link to="/movies" className="layout-nav__item"> Movies</Link>
            <Link to="/tv" className="layout-nav__item">TV Shows</Link>
            <Link to="/characters" className="layout-nav__item">Characters</Link>
            <Link to="/login" className="layout-nav__item">Login</Link>
            </div>
        </nav>
        <hr />
    </div>
  )
}

export default Navbar