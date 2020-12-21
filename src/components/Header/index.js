import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo-dark.png";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PopupAdd from "../PopUpAdd";

const Header = ({ showPopup, setShowPopup, url, setUrl }) => {
  return (
    <header>
      <div className="header-container">
        <div className="header-col1">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
          <Link to="/PDRS">
            <h3>Carte</h3>
          </Link>

          <Link to="/contact">
            <h3>Contact</h3>
          </Link>
        </div>

        <div className="header-col2">
          <h3>
            Ronnie Woodkin
            <span>
              <FontAwesomeIcon icon="angle-down" />
            </span>
          </h3>
          <button
            onClick={() => {
              setShowPopup(!showPopup);
            }}
          >
            +Ajouter
          </button>
        </div>
        <PopupAdd
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          url={url}
          setUrl={setUrl}
        />
      </div>
    </header>
  );
};

export default Header;
