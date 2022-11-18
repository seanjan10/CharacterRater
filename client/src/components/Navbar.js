import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/movies"> Movies</Link>
            <Link to="/tv">TV Shows</Link>
            <Link to="/characters">Characters</Link>
            <Link to="/login">Login</Link>
        </nav>
        <hr />
    </div>
  )
}

export default Navbar