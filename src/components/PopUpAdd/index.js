import React, { useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import "./index.css";
import flag from "../../assets/images/flag.png";
import speaker from "../../assets/images/loudspeaker.png";
import house from "../../assets/images/house.png";
import marker from "../../assets/images/marker.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PopUpAdd = ({ showPopup, setShowPopup, url, setUrl }) => {
  let history = useHistory();

  useEffect(() => {
    history.listen((location) => {
      setUrl(location.pathname);

      if (url !== "/") {
        setShowPopup(false);
      }
    });
  });
  return (
    <section id="popupAdd" className={showPopup ? "show" : "hidden"}>
      <h1>Construisons ensemble le plus gros écosystème sportif de demain</h1>

      <div
        className="popupRow"
        onClick={() => {
          setShowPopup(false);
          history.push("/creer-une-activite");
        }}
      >
        <img src={flag} alt="" />
        <div>
          <h4>Créer une activité</h4>
          <p>
            Donner rendez-vous à des pratiquants pour une activité physique et
            sportive.
          </p>
        </div>
        <i>
          <FontAwesomeIcon icon="chevron-right" className="fa-lg" />
        </i>
      </div>

      <hr />

      <div
        className="popupRow"
        onClick={() => {
          setShowPopup(false);
          history.push("/sport-actor");
        }}
      >
        <img src={speaker} alt="" />
        <div>
          <h4>Je suis un acteur du sport</h4>
          <p>J'aimerai ajouter mon lieu de pratique sur la carte Bouge.</p>
        </div>
        <i>
          <FontAwesomeIcon icon="chevron-right" className="fa-lg" />
        </i>
      </div>

      <hr />

      <div
        className="popupRow"
        onClick={() => {
          setShowPopup(false);
          history.push("/commercant");
        }}
      >
        <img src={house} alt="" />
        <div>
          <h4>Je suis un commerçant de proximité</h4>
          <p>J'aimerais que mon magasin devienne un point de départ sportif.</p>
        </div>
        <i>
          <FontAwesomeIcon icon="chevron-right" className="fa-lg" />
        </i>
      </div>

      <hr />

      <a
        href="https://www.maville-bouge.fr/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="popupRow">
          <img src={marker} alt="" />
          <div>
            <h4>Je suis une ville</h4>
            <p>
              J'aimerais que le sport de notre ville soit visible sur la carte
              Bouge.
            </p>
          </div>
          <i>
            <FontAwesomeIcon icon="chevron-right" className="fa-lg" />
          </i>
        </div>
      </a>
    </section>
  );
};

export default withRouter(PopUpAdd);
