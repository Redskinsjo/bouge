import React, { useState } from "react";

import axios from "axios";
import Image from "../assets/images/city-listens.jpg";
import HeroSection from "../components/HeroSection/index";
import ResponseForm from "../components/responseForm/ResponseForm";

const CityListens = () => {
  const [firstName, setFirstName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [opinion, setOpinion] = useState("");
  const Formulaire = "Ta ville t'écoute";
  const [Status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (firstName && name && email && opinion) {
        const response = await axios.post(
          "https://api.airtable.com/v0/appKTZBduOJSUNbJm/Formulaire%20Bubble",
          {
            records: [
              {
                fields: {
                  Formulaire,
                  "User name": firstName,
                  "User last name": name,
                  "User email": email,
                  "User phone number": phone,
                  Description: opinion,
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
        setStatus(response.status);
      } else {
        alert("champs manquants");
      }
    } catch (error) {
      console.log(error.response);
      alert("Une erreur est survenue...");
    }
  };

  return (
    <div>
      {Status === 200 ? (
        <div className="container">
          <HeroSection
            title="Ta ville t'écoute"
            paragraphs={
              <>
                <div className="para1">
                  <p>
                    Tu es le premier usager de ta ville donc n'hésite pas à
                    faire
                  </p>
                  <p>remonter une information à ta ville via ce formulaire.</p>
                </div>
                <p>
                  C’est juste ici &nbsp;
                  <span role="img" aria-label="index-pointing-down">
                    &#128071;
                  </span>
                </p>
              </>
            }
            image={Image}
          />
          <ResponseForm />
        </div>
      ) : (
        <main id="cityListens">
          <div className="container">
            <HeroSection
              title="Ta ville t'écoute"
              paragraphs={
                <>
                  <div className="para1">
                    <p>
                      Tu es le premier usager de ta ville donc n'hésite pas à
                      faire
                    </p>
                    <p>
                      remonter une information à ta ville via ce formulaire.
                    </p>
                  </div>
                  <p>
                    C’est juste ici &nbsp;
                    <span role="img" aria-label="index-pointing-down">
                      &#128071;
                    </span>
                  </p>
                </>
              }
              image={Image}
            />
            <form onSubmit={handleSubmit}>
              <div className="doubleInput">
                <div className="requiredInput">
                  <div className="required">*</div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstname"
                    placeholder="Prénom"
                    value={firstName}
                    required="required"
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                  />
                </div>
                <div className="requiredInput">
                  <div className="required">*</div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nom"
                    value={name}
                    required="required"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="doubleInput">
                <div className="requiredInput">
                  <div className="required">*</div>
                  <input
                    type="email"
                    id="mail"
                    name="mail"
                    placeholder="Email"
                    value={email}
                    required="required"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>

                <input
                  type="number"
                  id="phone"
                  name="phone"
                  placeholder="Téléphone"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                />
              </div>
              <div className="requiredInput">
                <div className="required">*</div>
                <textarea
                  name="avis"
                  id="avis"
                  cols="30"
                  rows="10"
                  placeholder="Avis, suggestions, demande… laissez-vous aller !"
                  value={opinion}
                  required="required"
                  onChange={(event) => {
                    setOpinion(event.target.value);
                  }}
                ></textarea>
              </div>

              <div>
                <button type="submit">Envoyer</button>
                <p>Votre message sera transmis à votre ville.</p>
                <p>
                  A très vite &nbsp;
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
};

export default CityListens;
