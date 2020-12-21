import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import { useHistory } from "react-router-dom";

const OpinionMatters = ({ data }) => {
  const [expSurveyVoted, setExpSurveyVoted] = useState(false);
  const [fitting, setFitting] = useState(false);
  const [floorQuality, setFloorQuality] = useState(false);
  const [general, setgeneral] = useState(false);

  const id = data.id;
  const category = data.category;

  const sendData = async (value, type) => {
    try {
      await axios.put(
        `https://bouge-api.herokuapp.com/v1.0/pdrs/update/ratings/?id=${id}&category=${category}&rating_index=${value}&rating_type=${type}`
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  let history = useHistory("");
  return (
    <section id="opinion">
      <h3>Ton avis compte</h3>
      <div className="expSurvey">
        <div className="col-1">
          <p>Les informations sont-elles conformes à ton expérience ?</p>
        </div>
        <div className="col-2">
          <div className="radioContainer">
            <input
              type="radio"
              name="experience"
              id="1"
              value="1"
              onClick={(event) => {
                if (!expSurveyVoted) {
                  sendData(event.target.value, "rating_matching_info");
                  setExpSurveyVoted(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="1">
              <span role="img" aria-label="swearing">
                &#129324;
              </span>
            </label>
          </div>

          <div className="radioContainer">
            <input
              type="radio"
              name="experience"
              id="2"
              value="2"
              onClick={(event) => {
                if (!expSurveyVoted) {
                  sendData(event.target.value, "rating_matching_info");
                  setExpSurveyVoted(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="2">
              <span role="img" aria-label="unhappy">
                &#128577;
              </span>
            </label>
          </div>

          <div className="radioContainer">
            <input
              type="radio"
              name="experience"
              id="3"
              value="3"
              onClick={(event) => {
                if (!expSurveyVoted) {
                  sendData(event.target.value, "rating_matching_info");
                  setExpSurveyVoted(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="3">
              <span role="img" aria-label="shrugging">
                &#129335;
              </span>
            </label>
          </div>

          <div className="radioContainer">
            <input
              type="radio"
              name="experience"
              id="4"
              value="4"
              onClick={(event) => {
                if (!expSurveyVoted) {
                  sendData(event.target.value, "rating_matching_info");
                  setExpSurveyVoted(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="4">
              <span role="img" aria-label="smiling">
                &#128512;
              </span>
            </label>
          </div>

          <div className="radioContainer">
            <input
              type="radio"
              name="experience"
              id="5"
              value="5"
              onClick={(event) => {
                if (!expSurveyVoted) {
                  sendData(event.target.value, "rating_matching_info");
                  setExpSurveyVoted(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="5">
              <span role="img" aria-label="in-love">
                &#128525;
              </span>
            </label>
          </div>
        </div>
      </div>

      <h4>Aide nous à mieux qualifier ce terrain</h4>
      <div className="fieldSurvey">
        <div className="col-1">qualité des équipements</div>
        <div className="col-2">
          <div className="radioContainer">
            <input
              type="radio"
              name="fitting"
              id="fit1"
              value="1"
              onClick={(event) => {
                if (!fitting) {
                  sendData(event.target.value, "rating_equipment_quality");
                  setFitting(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="fit1">
              <span role="img" aria-label="warning">
                ⚠️
              </span>
            </label>
          </div>

          <div className="radioContainer">
            <input
              type="radio"
              name="fitting"
              id="fit2"
              value="2"
              onClick={(event) => {
                if (!fitting) {
                  sendData(event.target.value, "rating_equipment_quality");
                  setFitting(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="fit2">
              <span role="img" aria-label="tumb-down">
                &#128078;
              </span>
            </label>
          </div>

          <div className="radioContainer">
            <input
              type="radio"
              name="fitting"
              id="fit3"
              value="3"
              onClick={(event) => {
                if (!fitting) {
                  sendData(event.target.value, "rating_equipment_quality");
                  setFitting(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="fit3">
              <span role="img" aria-label="pinching-hand">
                &#129295;
              </span>
            </label>
          </div>

          <div className="radioContainer">
            <input
              type="radio"
              name="fitting"
              id="fit4"
              value="4"
              onClick={(event) => {
                if (!fitting) {
                  sendData(event.target.value, "rating_equipment_quality");
                  setFitting(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="fit4">
              <span role="img" aria-label="ok-hand">
                👌
              </span>
            </label>
          </div>

          <div className="radioContainer">
            <input
              type="radio"
              name="fitting"
              id="fit5"
              value="5"
              onClick={(event) => {
                if (!fitting) {
                  sendData(event.target.value, "rating_equipment_quality");
                  setFitting(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="fit5">
              <span role="img" aria-label="fire">
                &#128293;
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="gameSurvey">
        <div className="col-1">qualité de la surface de jeu</div>
        <div className="col-2">
          <div className="radioContainer">
            <input
              type="radio"
              name="game"
              id="game1"
              value="1"
              onClick={(event) => {
                if (!floorQuality) {
                  sendData(event.target.value, "rating_floor_quality");
                  setFloorQuality(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="game1">
              <span role="img" aria-label="warning">
                ⚠️
              </span>
            </label>
          </div>

          <div className="radioContainer">
            <input
              type="radio"
              name="game"
              id="game2"
              value="2"
              onClick={(event) => {
                if (!floorQuality) {
                  sendData(event.target.value, "rating_floor_quality");
                  setFloorQuality(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="game2">
              <span role="img" aria-label="tumb-down">
                &#128078;
              </span>
            </label>
          </div>

          <div className="radioContainer">
            <input
              type="radio"
              name="game"
              id="game3"
              value="3"
              onClick={(event) => {
                if (!floorQuality) {
                  sendData(event.target.value, "rating_floor_quality");
                  setFloorQuality(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="game3">
              <span role="img" aria-label="pinching-hand">
                &#129295;
              </span>
            </label>
          </div>

          <div className="radioContainer">
            <input
              type="radio"
              name="game"
              id="game4"
              value="4"
              onClick={(event) => {
                if (!floorQuality) {
                  sendData(event.target.value, "rating_floor_quality");
                  setFloorQuality(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="game4">
              <span role="img" aria-label="ok-hand">
                👌
              </span>
            </label>
          </div>

          <div className="radioContainer">
            <input
              type="radio"
              name="game"
              id="game5"
              value="5"
              onClick={(event) => {
                if (!floorQuality) {
                  sendData(event.target.value, "rating_floor_quality");
                  setFloorQuality(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="game5">
              <span role="img" aria-label="fire">
                &#128293;
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="generalSurvey">
        <div className="col-1">
          <p>Expérience générale</p>
        </div>
        <div className="col-2">
          <div className="radioContainer">
            <input
              type="radio"
              name="general"
              id="general1"
              value="1"
              onClick={(event) => {
                if (!general) {
                  sendData(event.target.value, "rating_experience");
                  setgeneral(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="general1">
              <span role="img" aria-label="swearing">
                &#129324;
              </span>
            </label>
          </div>

          <div className="radioContainer">
            <input
              type="radio"
              name="general"
              id="general2"
              value="2"
              onClick={(event) => {
                if (!general) {
                  sendData(event.target.value, "rating_experience");
                  setgeneral(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="general2">
              <span role="img" aria-label="unhappy">
                &#128577;
              </span>
            </label>
          </div>

          <div className="radioContainer">
            <input
              type="radio"
              name="general"
              id="general3"
              value="3"
              onClick={(event) => {
                if (!general) {
                  sendData(event.target.value, "rating_experience");
                  setgeneral(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="general3">
              <span role="img" aria-label="shrugging">
                &#129335;
              </span>
            </label>
          </div>

          <div className="radioContainer">
            <input
              type="radio"
              name="general"
              id="general4"
              value="4"
              onClick={(event) => {
                if (!general) {
                  sendData(event.target.value, "rating_experience");
                  setgeneral(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="general4">
              <span role="img" aria-label="smiling">
                &#128512;
              </span>
            </label>
          </div>

          <div className="radioContainer">
            <input
              type="radio"
              name="general"
              id="general5"
              value="5"
              onClick={(event) => {
                if (!general) {
                  sendData(event.target.value, "rating_experience");
                  setgeneral(true);
                  alert("Merci pour votre participation !");
                } else {
                  alert("Vous avez déjà soumis un vote.");
                }
              }}
            />
            <label htmlFor="general5">
              <span role="img" aria-label="in-love">
                &#128525;
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="buttonsForm">
        <div className="col-1">
          <h4>Une mise à jour à nous faire ?</h4>
          <p>
            Pour modifier, ajouter ou supprimer de l'information à cette fiche,
            c'est ici !
          </p>
          <button
            onClick={() => {
              history.push("/update");
            }}
          >
            Signaler
          </button>
        </div>
        <div className="col-2">
          <h4>Ta ville t'écoute</h4>
          <p>
            Fais une suggestion ou remarque à ta ville sur ce lieu de pratique.
          </p>
          <button
            onClick={() => {
              history.push("/city-listens");
            }}
          >
            Contacter ma ville
          </button>
        </div>
      </div>
    </section>
  );
};

export default OpinionMatters;
