import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "../assets/images/contact.jpg";
import HeroSection from "../components/HeroSection/index";
import axios from "axios";
import ResponseForm from "../components/responseForm/ResponseForm";

const Contact = () => {
  // les states
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [description, setDescription] = useState("");
  const [Status, setStatus] = useState("");

  //handle Functions
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleUserLastNameChange = (event) => {
    setUserLastName(event.target.value);
  };
  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };
  const handleUserPhoneChange = (event) => {
    setUserPhone(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  //   HandleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const Formulaire = "Contact";
      const response = await axios.post(
        "https://api.airtable.com/v0/appKTZBduOJSUNbJm/Formulaire%20Bubble",
        {
          records: [
            {
              fields: {
                Formulaire,
                "User name": userName,
                "User last name": userLastName,
                "User email": userEmail,
                "User phone number": userPhone,
                Description: description,
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
      if (response) {
        setStatus(response.status);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      {Status === 200 ? (
        <div className="container">
          <HeroSection
            title="Nous contacter"
            paragraphs={
              <>
                <div className="para1">
                  <p>Améliorons ensemble ce projet de société !</p>
                  <p>
                    Nous sommes à l’écoute de tes suggestions, avis et
                    commentaires.
                  </p>
                </div>
                <p>
                  C’est juste ici&nbsp;
                  <span role="img" aria-label="down">
                    👇
                  </span>
                </p>
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
              title="Nous contacter"
              paragraphs={
                <>
                  <div className="para1">
                    <p> Améliorons ensemble ce projet de société !</p>
                    <p>
                      Nous sommes à l’écoute de tes suggestions, avis et
                      commentaires.
                    </p>
                  </div>
                  <p>
                    C’est juste ici&nbsp;
                    <span role="img" aria-label="down">
                      👇
                    </span>
                  </p>
                </>
              }
              image={Image}
            />

            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="doubleInput">
                <input
                  value={userName}
                  onChange={(e) => {
                    handleUserNameChange(e);
                  }}
                  type="text"
                  placeholder="Prénom"
                />
                <input
                  value={userLastName}
                  onChange={(e) => {
                    handleUserLastNameChange(e);
                  }}
                  type="text"
                  placeholder="Nom"
                />
              </div>
              <div className="doubleInput">
                <div className="required-input">
                  <input
                    required
                    value={userEmail}
                    onChange={(e) => {
                      handleUserEmailChange(e);
                    }}
                    type="email"
                    placeholder="Email"
                  />
                  <FontAwesomeIcon
                    icon="asterisk"
                    className="required-asterisk"
                  />
                </div>
                <input
                  value={userPhone}
                  onChange={(e) => {
                    handleUserPhoneChange(e);
                  }}
                  type="number"
                  placeholder="Téléphone"
                />
              </div>
              <div className="required-input">
                <textarea
                  style={{ width: "100%" }}
                  required
                  name="avis"
                  id="avis"
                  cols="30"
                  value={description}
                  onChange={(e) => {
                    handleDescriptionChange(e);
                  }}
                  rows="10"
                  placeholder="Avis, suggestions, demande… laissez-vous aller !"
                ></textarea>
                <FontAwesomeIcon
                  icon="asterisk"
                  className="required-asterisk"
                />
              </div>
              <div>
                <button type="submit">Envoyer</button>
                <p>
                  Du fait du nombre de demandes élevées, le processus de réponse
                  peut prendre quelques jours.
                </p>
                <p>
                  A très vite&nbsp;
                  <span role="img" aria-label="Clapping Hands">
                    👏
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

export default Contact;
