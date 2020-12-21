import React, { useState } from "react";
import axios from "axios";
import HeroSection from "../components/HeroSection/index";
import Image from "../assets/images/shop-keeper.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ResponseForm from "../components/responseForm/ResponseForm";

function Commerçant() {
  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [ville, setVille] = useState("");
  const [numberAdress, setNumberAdress] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [pays, setPays] = useState("");
  // reponse formulaire
  const [Status, setStatus] = useState("");

  //changements functions
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handleWebsiteChange = (event) => {
    setWebsite(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleVilleChange = (event) => {
    setVille(event.target.value);
  };
  const handleNumberAdressChange = (event) => {
    setNumberAdress(event.target.value);
  };
  const handleCodePostalChange = (event) => {
    setCodePostal(event.target.value);
  };
  const handlePaysChange = (event) => {
    setPays(event.target.value);
  };
  // handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const Formulaire = "Commerçant";
      const response = await axios.post(
        "https://api.airtable.com/v0/appKTZBduOJSUNbJm/Formulaire%20Bubble",
        {
          records: [
            {
              fields: {
                Formulaire,
                Name: name,
                Email: email,
                "Phone Number": phone,
                Description: description,
                Websites: website,
                "City Name": ville,
                "Numéro + rue": numberAdress,
                "Code postal": codePostal,
                Pays: pays,
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
      // console.log(response.status);
      setStatus(response.status);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      {Status === 200 ? (
        <div className="container">
          <HeroSection
            title="Vous êtes un commerçant
            de proximité"
            paragraphs={
              <>
                <p> Intégrer notre réseau PDRS !</p>
                <div className="para1">
                  <p>
                    Transformer sa boutique en point de départ/arrivée sportif
                    <span role="img" aria-label="chequered-flag">
                      &#127937;
                    </span>
                  </p>
                  <p>Développer son image de marque santé/bien-être.</p>
                  <p>
                    Offrir une promotion aux participants Bouge
                    (rafraichissement de fin de séance, remise sur ses produits
                    et services…)
                  </p>
                  <p>Augmenter le passage dans sa boutique.</p>
                </div>
              </>
            }
            image={Image}
          />

          <ResponseForm />
        </div>
      ) : (
        <main className="container">
          <div>
            <HeroSection
              title="Vous êtes un commerçant
          de proximité"
              paragraphs={
                <>
                  <p> Intégrer notre réseau PDRS !</p>
                  <div className="para1">
                    <p>
                      Transformer sa boutique en point de départ/arrivée sportif
                      <span role="img" aria-label="chequered-flag">
                        &#127937;
                      </span>
                    </p>
                    <p>Développer son image de marque santé/bien-être.</p>
                    <p>
                      Offrir une promotion aux participants Bouge
                      (rafraichissement de fin de séance, remise sur ses
                      produits et services…)
                    </p>
                    <p>Augmenter le passage dans sa boutique.</p>
                  </div>
                </>
              }
              image={Image}
            />

            <form onSubmit={handleSubmit}>
              <div className="infos">
                <h3>Infos de votre commerce</h3>
                <p>
                  Créer son profil public Bouge pour être visible et attirer
                  plus de visites en magasin.
                </p>
              </div>
              <div className="required-input">
                <input
                  value={name}
                  required
                  onChange={handleNameChange}
                  type="text"
                  placeholder="Nom de votre entreprise"
                />
                <FontAwesomeIcon
                  icon="asterisk"
                  className="required-asterisk"
                />
              </div>

              <div className="doubleInput">
                <div className="required-input">
                  <input
                    value={email}
                    required
                    onChange={handleEmailChange}
                    type="email"
                    placeholder="Email"
                  />
                  <FontAwesomeIcon
                    icon="asterisk"
                    className="required-asterisk"
                  />
                </div>
                <input
                  value={phone}
                  onChange={handlePhoneChange}
                  type="number"
                  placeholder="Téléphone"
                />
              </div>
              <input
                className="input-full"
                type="text"
                value={website}
                onChange={handleWebsiteChange}
                placeholder="Lien de votre site web ou réseau social"
              />
              <p>
                Qu’est ce qui vous motive à être une ligne de départ d’activité
                physique et sportive?
              </p>
              <textarea
                name="avis"
                id="avis"
                cols="30"
                value={description}
                onChange={handleDescriptionChange}
                rows="10"
                placeholder="Ecrire ici"
              ></textarea>
              <div className="adresse">
                <h4>Adresse</h4>
                <div className="doubleInput">
                  <div className="required-input">
                    <input
                      value={ville}
                      required
                      onChange={handleVilleChange}
                      type="text"
                      placeholder="Ville"
                    />
                    <FontAwesomeIcon
                      icon="asterisk"
                      className="required-asterisk"
                    />
                  </div>
                  <div className="required-input">
                    <input
                      value={numberAdress}
                      required
                      onChange={handleNumberAdressChange}
                      type="text"
                      placeholder="Numéro + nom de rue"
                    />
                    <FontAwesomeIcon
                      icon="asterisk"
                      className="required-asterisk"
                    />
                  </div>
                </div>
                <div className="doubleInput">
                  <div className="required-input">
                    <input
                      value={codePostal}
                      required
                      onChange={handleCodePostalChange}
                      type="text"
                      placeholder="Code postal"
                    />
                    <FontAwesomeIcon
                      icon="asterisk"
                      className="required-asterisk"
                    />
                  </div>
                  <div className="required-input">
                    <input
                      value={pays}
                      required
                      onChange={handlePaysChange}
                      type="text"
                      placeholder="Pays"
                    />
                    <FontAwesomeIcon
                      icon="asterisk"
                      className="required-asterisk"
                    />
                  </div>
                </div>
              </div>
              <div>
                <button type="submit">Envoyer ma demande</button>
                <p>
                  Du fait du nombre de demandes élevées, le processus de réponse
                  peut prendre quelques jours.
                </p>
                <p>
                  Nous vous enverrons un email dès que nous aurons vérifié vos
                  informations.
                </p>

                <p>
                  A très vite
                  <span role="img" aria-label="applause">
                    &#128079;
                  </span>
                </p>
              </div>
            </form>
          </div>
        </main>
      )}
    </div>
  );
}

export default Commerçant;
