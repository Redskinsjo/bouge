import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../assets/images/logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="footerContainer container">
        <div className="footerSections">
          <div>
            <a
              href="https://www.maville-bouge.fr/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={Logo} alt="logo"></img>
            </a>

            <p className="bougeInfo">Un projet de société pour rendre</p>
            <p className="bougeInfo">l'activité physique plus accessible.</p>
          </div>
          <div>
            <h3>Service</h3>
            <ul>
              <Link to="/pdrs">
                <li>La Carte</li>
              </Link>

              <Link to="/creer-une-activite">
                <li>Créer une activité</li>
              </Link>
              <Link to="/sport-actor">
                <li>Je suis un acteur du sport</li>
              </Link>
              <Link to="/commercant">
                <li>Je suis un commerçant de proximité</li>
              </Link>
              <a
                href="https://www.maville-bouge.fr/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <li>Je suis une ville</li>
              </a>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <Link to="/contact">
                <li>Contactez-nous</li>
              </Link>

              <a
                href="https://www.linkedin.com/in/alo%C3%AFs-griffon-monnet-006870116/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <li>LinkedIn</li>
              </a>
            </ul>
          </div>
        </div>

        <p className="copyright">
          Fabriqué avec
          <i>
            <FontAwesomeIcon icon="heart" className="fa-lg" />
          </i>
          en France & Canada
        </p>
        <p className="copyrightBouge">&copy; 2020 Bouge</p>
      </div>
    </footer>
  );
};

export default Footer;
