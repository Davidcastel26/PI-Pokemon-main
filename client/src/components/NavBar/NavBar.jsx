import { Link } from "react-router-dom";
//--- CSS
// import "./navbar.css";
// import {RiMenu3Line, RiCloseLin} from 'react-icons/ri';
import logo from "../../imgs/logo.svg";
// BEM -> Block Element Modifier

const NavBar = () => {
  return (
    <nav className="app__navbar">
      {/* <div className="app__navbar-here"> */}
        <div className="app__navbar-logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <ul className="navbar-links_container">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/home">
            <p>Pokemons</p>
          </Link>
          <Link to="/pokemons">
            <p>Create Pokemon</p>
          </Link>
        </ul>

       
      {/* </div> */}
    {/*<div className="nav__menu">
          <ul className="main-menu_hbg">
            <Link to="/">
              <li className="main-menu-hbg--item">
                <a href="#" className="menu-links-word">
                  Home
                </a>
              </li>
            </Link>
            <Link to="/home">
              <li className="main-menu-hbg--item">
                <a href="#" className="menu-links-word">
                  Pokemons
                </a>
              </li>
            </Link>
            <Link to="/pokemons">
              <li className="main-menu-hbg--item">
                <a href="#" className="menu-links-word">
                  Create Pokemon
                </a>
              </li>
            </Link>
          </ul>
        </div>
      */}
    </nav>
  );
};

export default NavBar;
