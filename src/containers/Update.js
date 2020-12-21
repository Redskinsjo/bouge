import React, { useState } from "react";
import HeroSection from "../components/HeroSection/index.js";
import Image from "../assets/images/update.jpg";
import "../assets/style/update.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Handicap from "../assets/images/icons/handicap.png";
import Light from "../assets/images/icons/light-bulb.png";
import Shower from "../assets/images/icons/shower.png";
import Rooms from "../assets/images/icons/changing-room.png";
import UploadImage from "../components/Upload_image/UploadImage";

import ResponseForm from "../components/responseForm/ResponseForm";

const Update = () => {
  // contact référent
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // Infos du lieu de pratique
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [sport, setSport] = useState("");
  const [siteEmail, setSiteEmail] = useState("");
  const [sitePhone, setSitePhone] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const [imgData, setImgData] = useState(null);
  const onChangeImage = (e) => {
    const types = ["image/png", "image/jpg", "image/jpeg"];
    if (e.target.files[0] && types.includes(e.target.files[0].type)) {
      console.log("picture: ", e.target.files);
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
        setError(false);
      });
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setError(true);
    }
  };
  // Adresse du lieu
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  // Spécificités du lieu
  const [int_ext, setInt_Ext] = useState("");
  // const [covered, setCovered] = useState("");
  const [floor, setFloor] = useState("");
  const [isLighted, setIsLighted] = useState("");
  const [isLocker, setIsLocker] = useState("");
  const [isShower, setIsShower] = useState("");
  const [isAccessPlay, setIsAccessPlay] = useState("");
  const [isAccessLocker, setIsAccessLocker] = useState("");
  const [isAccessStand, setIsAccessStand] = useState("");
  // Suggestions
  const [suggestions, setSuggestions] = useState("");
  // reponse formulaire
  const [Status, setStatus] = useState("");

  const handleSubmit = async () => {
    try {
      const Formulaire = "Mise à jour";
      let imageUrl;
      if (image) {
        //   console.log(image);
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "yhfmk4pa");
        const cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/daizylyrh/image/upload",
          formData
        );
        imageUrl = cloudinaryResponse.data.secure_url;
      }

      const token = "keyuhf31hOKBKOGlz";

      const response = await axios.post(
        "https://api.airtable.com/v0/appKTZBduOJSUNbJm/Formulaire%20Bubble",
        {
          records: [
            {
              fields: {
                Formulaire,
                "User name": firstname,
                "User last name": lastname,
                "User email": email,
                "User phone number": phone,
                Name: name,
                Category: category,
                "Micro Activity Name": sport,
                Email: siteEmail,
                "Phone Number": sitePhone,
                Websites: website,
                Description: description,
                image: [{ url: imageUrl }],
                "City Name": city,
                "Numéro + rue": street,
                "Code postal": postalCode,
                Pays: country,
                Outdoor: int_ext,
                Sanitary: null,
                "Floor Type": floor,
                Lighting: isLighted,
                "Locker Room": isLocker,
                Shower: isShower,
                "Disabled Access": isAccessPlay,
                "Locker Room Disabled Access": isAccessLocker,
                "Stand Disabled Access": isAccessStand,
                "Notes supplémentaire": suggestions,
              },
            },
          ],
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      setStatus(response.status);

      if (response.data) {
        console.log("line 99", response.data);
      } else {
        console.log("line 101", response);
      }
    } catch (error) {
      console.log(error.response);
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
        <div id="update-page">
          <div className="container">
            <HeroSection
              title="Faites une mise à jour sur la fiche de l'équipement"
              paragraphs={
                <>
                  <p>
                    Rejoignez une large communauté de citoyens actifs sur leur
                    territoire. Contribuez de manière utile en proposant des
                    idées ou en signalant un dysfonctionnement.
                  </p>
                  <br />
                  <p>C'est à vous de jouer.</p>
                </>
              }
              image={Image}
            ></HeroSection>
            <form
              className="update-form"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("submitting...");
                handleSubmit();
              }}
            >
              <h3 className="update-titles">Contact référent</h3>
              <div className="update-contact">
                <div className="update-required-fields">
                  <input
                    type="text"
                    className="update-input"
                    placeholder="Prénom"
                    required
                    value={firstname}
                    onChange={(e) => {
                      setFirstname(e.target.value);
                    }}
                  />
                  <FontAwesomeIcon
                    icon="asterisk"
                    className="update-required-asterisk"
                  />
                </div>
                <div className="update-required-fields">
                  <input
                    type="text"
                    className="update-input"
                    placeholder="Nom"
                    required
                    value={lastname}
                    onChange={(e) => {
                      setLastname(e.target.value);
                    }}
                  />
                  <FontAwesomeIcon
                    icon="asterisk"
                    className="update-required-asterisk"
                  />
                </div>
                <div className="update-required-fields">
                  <input
                    type="text"
                    className="update-input"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <FontAwesomeIcon
                    icon="asterisk"
                    className="update-required-asterisk"
                  />
                </div>
                <input
                  type="text"
                  className="update-input"
                  placeholder="Téléphone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>

              <br />

              <h3 className="update-titles">Infos du lieu de pratique</h3>
              <p>
                Les informations ci-dessous seront celles mis de l'avant sur
                Bouge pour
              </p>
              <div className="update-location">
                <input
                  type="text"
                  placeholder="Gymnase du Centre"
                  className="update-input"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <select
                  className="update-select"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value="municipal">Municipal</option>
                  <option value="studio privé">Studio Privé</option>
                  <option value="option3">Option 3</option>
                </select>
                <input
                  type="text"
                  placeholder="Foot / Basketball / Badminton"
                  className="input-full-width"
                  value={sport}
                  onChange={(e) => {
                    setSport(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="sportinfo@gmail.com"
                  className="update-input"
                  value={siteEmail}
                  onChange={(e) => {
                    setSiteEmail(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="06.76.99.35.13"
                  className="update-input"
                  value={sitePhone}
                  onChange={(e) => {
                    setSitePhone(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="www.sportinfo.fr"
                  className="input-full-width"
                  value={website}
                  onChange={(e) => {
                    setWebsite(e.target.value);
                  }}
                />
                <textarea
                  type="text"
                  placeholder="Ceci est la description du lien"
                  rows={10}
                  cols={15}
                  className="input-full-width textarea"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />

                <div>
                  <p>Modifier l'image</p>
                  <UploadImage
                    error={error}
                    image={image}
                    setImage={setImage}
                    onChangeImage={onChangeImage}
                    imgData={imgData}
                  />
                </div>

                <div className="update-address">
                  <span className="update-titles">Adresse du lieu</span>
                  <div>
                    <input
                      type="text"
                      placeholder="Nantes"
                      className="update-input"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      placeholder="44 rue du centre"
                      className="update-input"
                      value={street}
                      onChange={(e) => {
                        setStreet(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      placeholder="36000"
                      className="update-input"
                      value={postalCode}
                      onChange={(e) => {
                        setPostalCode(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      placeholder="France"
                      className="update-input"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="update-specs">
                  <span className="update-titles">Spécificités du lieu</span>
                  <div>
                    <select
                      className="update-select"
                      onChange={(e) => {
                        setInt_Ext(e.target.value);
                      }}
                    >
                      <option value="exterieur">Extérieur</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                    <select
                      className="update-select"
                      onChange={(e) => {
                        // setCovered(e.target.value);
                      }}
                    >
                      <option value="couvert">Couvert</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                    <select
                      className="update-select"
                      onChange={(e) => {
                        setFloor(e.target.value);
                      }}
                    >
                      <option value="parquet">Parquet</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                  </div>
                </div>

                <div className="update-assets">
                  <div className="update-asset-availability">
                    <input
                      type="checkbox"
                      name="light"
                      id="light"
                      value="éclairage"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setIsLighted("oui");
                        }
                        if (!e.target.checked) {
                          setIsLighted("non");
                        }
                      }}
                    />
                    <label htmlFor="light"></label>
                    <img src={Light} alt="" className="update-asset-img" />
                    <p>Éclairage</p>
                  </div>
                  <div className="update-asset-availability">
                    <input
                      type="checkbox"
                      name="locker-room"
                      id="locker-room"
                      value="vestiaire"
                      onChange={(e) => {
                        if (e.target.value) {
                          setIsLocker("oui");
                        }
                        if (!e.target.value) {
                          setIsLocker("non");
                        }
                      }}
                    />
                    <label htmlFor="locker-room"></label>
                    <img src={Rooms} alt="" className="update-asset-img" />
                    <p>Vestiaire</p>
                  </div>
                  <div className="update-asset-availability">
                    <input
                      type="checkbox"
                      name="shower"
                      id="shower"
                      value="douche"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setIsShower("oui");
                        }
                        if (!e.target.checked) {
                          setIsShower("non");
                        }
                      }}
                    />
                    <label htmlFor="shower"></label>
                    <img src={Shower} alt="" className="update-asset-img" />
                    <p>Douche</p>
                  </div>
                  <div className="update-asset-availability">
                    <input
                      type="checkbox"
                      name="disabled-access-play"
                      id="disabled-access-play"
                      value="accès-handicapé-terrain"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setIsAccessPlay("oui");
                        }
                        if (!e.target.checked) {
                          setIsAccessPlay("non");
                        }
                      }}
                    />
                    <label htmlFor="disabled-access-play"></label>
                    <img src={Handicap} alt="" className="update-asset-img" />
                    <p> Accès handicapé aire de jeu</p>
                  </div>
                  <div className="update-asset-availability">
                    <input
                      type="checkbox"
                      name="disabled-access-locker"
                      id="disabled-access-locker"
                      value="accès-handicapé-vestiaire"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setIsAccessLocker("oui");
                        }
                        if (!e.target.checked) {
                          setIsAccessLocker("non");
                        }
                      }}
                    />
                    <label htmlFor="disabled-access-locker"></label>
                    <img src={Handicap} alt="" className="update-asset-img" />
                    <p> Accès handicapé vestiaire</p>
                  </div>
                  <div className="update-asset-availability">
                    <input
                      type="checkbox"
                      name="disable-access-stand"
                      id="disable-access-stand"
                      value="accès-handicapé-tribune"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setIsAccessStand("oui");
                        }
                        if (!e.target.checked) {
                          setIsAccessStand("non");
                        }
                      }}
                    />
                    <label htmlFor="disable-access-stand"></label>
                    <img src={Handicap} alt="" className="update-asset-img" />

                    <p> Accès handicapé tribune</p>
                  </div>
                </div>

                <div>
                  <textarea
                    className="update-ideas"
                    type="text"
                    placeholder="Idées, améliorations, suggestions... Ajoutez une note privée ici, elle sera lue avec attention par l'équipe."
                    cols="30"
                    rows="10"
                    value={suggestions}
                    onChange={(e) => {
                      setSuggestions(e.target.value);
                    }}
                  ></textarea>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <button style={{ marginTop: 0 }} type="submit">
                      Demande de modification
                    </button>
                    <div className="update-thanking">
                      <span>
                        Merci beaucoup de nous aider dans cette démarche
                        citoyenne.
                      </span>
                      <span>
                        Votre demande de mise à jour sera prise en compte
                        rapidement.
                      </span>
                      <div style={{ display: "flex" }}>
                        <span>À très vite&nbsp;</span>
                        <span role="img" aria-label="applause">
                          &#128079;
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Update;
