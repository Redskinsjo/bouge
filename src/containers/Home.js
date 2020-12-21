import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// components
import SearchBar from "../components/SearchBar/index";

//images
import City from "../assets/images/city.jpg";
import Climbing from "../assets/images/climbing.jpg";
import Karate from "../assets/images/karate.jpg";
import Beach from "../assets/images/beach.jpg";
import Flag from "../assets/images/flag.png";
import Loudspeaker from "../assets/images/loudspeaker.png";
import House from "../assets/images/house.png";
import Marker from "../assets/images/marker.png";

const Home = ({
  setSearchSport,
  setSearchCity,
  searchCity,
  searchSport,
  searchType,
  setSearchType,
  page,
  setPage,
}) => {
  //state email Newsletter
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  //   HandleSubmit newaletter
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (email) {
        const Formulaire = "newsletter";
        const response = await axios.post(
          "https://api.airtable.com/v0/appKTZBduOJSUNbJm/Formulaire%20Bubble",
          {
            records: [
              {
                fields: {
                  Formulaire,
                  Email: email,
                },
              },
            ],
          },
          {
            headers: {
              Authorization: "Bearer keyuhf31hOKBKOGlz",
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setEmail("");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <main id="homePage">
      <section id="hero">
        <div className="container">
          <SearchBar
            setSearchSport={setSearchSport}
            setSearchCity={setSearchCity}
            searchCity={searchCity}
            searchSport={searchSport}
            setSearchType={setSearchType}
            setPage={setPage}
          />
          <div className="hero-text">
            <h1>Joue local</h1>
            <p>
              Ta ville devient ton plus grand terrain de jeu. Rejoins une
              communauté de citoyens autour d’initiatives locales et d’activités
              physiques, sociales et solidaires.
            </p>
          </div>
        </div>
      </section>

      <section id="click">
        <div className="container">
          <h2>Clique, trouve, bouge</h2>
          <p>
            Tu veux te dépenser, faire une activité de relaxation ou juste aller
            marcher. Bouge cartographie pour toi tous les spots publics, les
            associations, les studios privés et les activités de groupe dans ta
            ville.
          </p>
          <div className="pictures">
            <div>
              <div>
                <img src={City} alt="" />
                <span className="badge badge-green">Public</span>
              </div>
            </div>
            <div>
              <div>
                <img src={Climbing} alt="" />
                <span className="badge badge-pink">Privé</span>
              </div>
            </div>
            <div>
              <div>
                <img src={Karate} alt="" />
                <span className="badge badge-blue">Association</span>
              </div>
            </div>
            <div>
              <div>
                <img src={Beach} alt="" />
                <span className="badge badge-orange">Activité</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="join">
        <div className="container">
          <h2>Rejoindre une économie locale, collaborative et solidaire</h2>

          <div className="join-links">
            <Link to="/creer-une-activite">
              <div>
                <img src={Flag} alt="" />
              </div>
              <h3>Créer une activité</h3>
              <p>
                Donner rendez-vous à des pratiquants pour une activité physique
                et sportive
              </p>
            </Link>
            <Link to="/sport-actor">
              <div>
                <img src={Loudspeaker} alt="" />
              </div>
              <h3>Je suis un acteur du sport</h3>
              <p>J’aimerais ajouter mon lieu de pratique sur la carte Bouge.</p>
            </Link>
            <Link to="/commercant">
              <div>
                <img src={House} alt="" />
              </div>
              <h3>Je suis un commerçant de proximité</h3>
              <p>
                J’aimerais que mon magasin devienne un point de départ sportif
              </p>
            </Link>
            <a
              href="https://www.maville-bouge.fr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <img src={Marker} alt="" />
              </div>
              <h3>Je suis une ville</h3>
              <p>
                J’aimerais que le sport de notre ville soit visible sur la carte
                Bouge.
              </p>
            </a>
          </div>
        </div>
      </section>

      <section id="newsletter">
        <div className="container">
          <div>
            <h3>Lancement des prochaines villes </h3>
            <p>Rester au courant</p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <button type="submit">S'inscrire</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Home;
