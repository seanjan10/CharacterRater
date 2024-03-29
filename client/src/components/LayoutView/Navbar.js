import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBarItem from "./NavBarItem";
import LoginAndRegister from "./LoginAndRegister";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  let navigate = useNavigate();
  //console.log(location.pathname);

  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
    //lazy fix for fixing counter issue
    //window.location.reload();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <nav className="navbar navbar-dark navbar-expand bg-primary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <NavBarItem
                title="Home"
                url="/"
                active={location.pathname}
                icon="home"
              />
              <NavBarItem
                title="Movies"
                url="/movie"
                active={location.pathname}
                icon="film"
              />
              <NavBarItem
                title="TV Shows"
                url="/tv"
                active={location.pathname}
                icon="tv"
              />
              <NavBarItem
                title="Characters"
                url="/character"
                active={location.pathname}
              />
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {user && (
                  <>
                    <li className="nav-item">
                      <Link
                        to=""
                        className="nav-link active"
                      >
                        {user.username}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to=""
                        onClick={handleLogout}
                        className="nav-link active"
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                )} { !user &&
                  <li className="nav-item">
                    <LoginAndRegister />
                  </li>
                }
              </ul>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
