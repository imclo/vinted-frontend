import React from "react";
import logo from "../assets/imgs/Vinted_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import PriceRange from "./PriceRange";

const Header = ({
  token,
  handleToken,
  setSearch,
  setFetchRange,
  sortPrice,
  setSortPrice,
}) => {
  // console.log(handleToken);

  const location = useLocation();

  return (
    <header className="header-container">
      <div>
        <Link to="/">
          <img className="header-logo" src={logo} alt="" />
        </Link>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Recherche des articles"
          onChange={(event) => setSearch(event.target.value)}
        />
        <FontAwesomeIcon
          className="icon-search"
          icon="fa-solid fa-magnifying-glass"
        />

        {location.pathname === "/" ? (
          <div>
            <div className="swap-price-range">
              <span className="sorted">Trier par prix :</span>
              <span className="swap">
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={sortPrice}
                  onChange={() => {}}
                  name="price"
                />
                <div
                  className="wrap-line"
                  onClick={() => {
                    setSortPrice(!sortPrice);
                  }}
                >
                  <div className="knob">
                    <span>{sortPrice ? "⭣" : "⭡"}</span>
                  </div>
                </div>
              </span>
              <span className="sorted">Prix entre : </span>
              <PriceRange setFetchRange={setFetchRange} />
            </div>
          </div>
        ) : null}
      </div>

      <div className="header-button-log-sign">
        {!token && (
          <Link to="/signup">
            <button className="signup">S'inscrire</button>
          </Link>
        )}
        {token ? (
          <button
            className="logout"
            onClick={() => {
              handleToken(null);
            }}
          >
            Déconnexion
          </button>
        ) : (
          <Link to="/login">
            <button className="login">Se connecter</button>
          </Link>
        )}
      </div>
      <div className="header-button-sell">
        <Link to={token ? "/publish" : "/login"}>
          <button className="sell">Vend tes articles</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
