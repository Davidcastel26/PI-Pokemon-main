import { Link } from "react-router-dom";
//--- CSS
import "./navbar.css";
// import {RiMenu3Line, RiCloseLin} from 'react-icons/ri';
import logo from "../../imgs/logo.svg";
// BEM -> Block Element Modifier

const NavBar = () => {
  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="navbar-links_container">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/home">
            <p>Pokemons</p>
          </Link>
          <Link to="/pokemons">
            <p>Create Pokemon</p>
          </Link>
        </div>

        <ul className="main-menu_hbg">
          <Link to="/">
            <li className="main-menu-hbg--item">
                <a href="#" className="menu-linkssss">Home</a>
            </li>
          </Link>
          <Link to="/home">
            <li className="main-menu-hbg--item">
                <a href="#" className="menu-linkssss">Pokemons</a>
            </li>
          </Link>
          <Link to="/pokemons">
            <li className="main-menu-hbg--item">
                <a href="#" className="menu-linkssss">Create Pokemon</a>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
