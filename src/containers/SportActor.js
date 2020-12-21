import React, { useState } from "react";
import axios from "axios";
import Image from "../assets/images/acteur-du-sport.jpg";
import HeroSection from "../components/HeroSection/index";
import UploadImage from "../components/Upload_image/UploadImage";

import lightBulb from "../assets/images/icons/light-bulb.png";
import changingRoom from "../assets/images/icons/changing-room.png";
import shower from "../assets/images/icons/shower.png";
import handicap from "../assets/images/icons/handicap.png";
import ResponseForm from "../components/responseForm/ResponseForm";

const SportActor = () => {
  //User
  const [firstName, setFirstName] = useState("");
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  //Activity
  const [activityName, setActivityName] = useState("");
  const [category, setCategory] = useState("");
  const [microActivityName, setMicroActivityName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [webSite, setWebSite] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [outdoor, setOutdoor] = useState("");

  //state upload image
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
  //Specificity
  const [floor, setFloor] = useState("");
  const [lights, setLights] = useState("non");
  const [lockers, setLockers] = useState("non");
  const [showers, setShowers] = useState("non");
  const [disabledAccess, setDisabledAcces] = useState("non");
  const [lockersDisabledAccess, setLockersDisabledAcces] = useState("non");
  const [standsDisabledAccess, setStandDisabledAcces] = useState("non");
  //response formulaire
  const [Status, setStatus] = useState("");
  // error input required
  const [errorRequired, setErrorRequired] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        firstName &&
        name &&
        userEmail &&
        activityName &&
        category &&
        microActivityName &&
        email &&
        phone &&
        description &&
        image &&
        city &&
        address &&
        zipCode &&
        country &&
        outdoor &&
        floor
      ) {
        const Formulaire = "Acteur du sport";
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "yhfmk4pa");

        const cloudinaryResponse = await axios.post(
          "https://api.Cloudinary.com/v1_1/daizylyrh/image/upload",
          formData
        );
        const imageUrl = cloudinaryResponse.data.secure_url;
        const response = axios.post(
          "https://api.airtable.com/v0/appKTZBduOJSUNbJm/Formulaire%20Bubble",
          {
            records: [
              {
                fields: {
                  Formulaire,
                  "User name": firstName,
                  "User last name": name,
                  "User email": userEmail,
                  "User phone number": userPhone,
                  Name: activityName,
                  Category: category,
                  "Micro Activity Name": microActivityName,
                  Email: email,
                  "Phone Number": phone,
                  Websites: webSite,
                  Description: description,
                  image: [{ url: imageUrl }],
                  "City Name": city,
                  "Numéro + rue": address,
                  "Code postal": zipCode,
                  Pays: country,
                  Outdoor: outdoor,
                  "Floor Type": floor,
                  Lighting: lights,
                  "Locker Room": lockers,
                  Shower: showers,
                  "Disabled Access": disabledAccess,
                  "Locker Room Disabled Access": lockersDisabledAccess,
                  "Stand Disabled Access": standsDisabledAccess,
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
        console.log(response);
        setStatus(response);
      } else {
        setErrorRequired(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      {Status ? (
        <div className="container">
          <HeroSection
            title="Vous êtes un acteur du sport"
            paragraphs={
              <>
                <div className="para1">
                  <p>100% GRATUIT</p>
                  <p>
                    Développer sa visibilité et bébéficier d'un référencement
                    neutre et puissant grâce à notre partenariat avec la ville.
                  </p>
                </div>
                <p>
                  S'inscrire en 3min et intégrer l'économie collaborative et
                  solidaire de la ville.
                </p>
              </>
            }
            image={Image}
          />

          <ResponseForm />
        </div>
      ) : (
        <main id="sportActor">
          <div className="container">
            <HeroSection
              title="Vous êtes un acteur du sport"
              paragraphs={
                <>
                  <div className="para1">
                    <p>100% GRATUIT</p>
                    <p>
                      Développer sa visibilité et bébéficier d'un référencement
                      neutre et puissant grâce à notre partenariat avec la
                      ville.
                    </p>
                  </div>
                  <p>
                    S'inscrire en 3min et intégrer l'économie collaborative et
                    solidaire de la ville.
                  </p>
                </>
              }
              image={Image}
            />
            <form onSubmit={handleSubmit}>
              <h3>Contact référent</h3>
              <div className="doubleInput">
                <div className="requiredInput">
                  <div className="required">*</div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    placeholder="Prénom"
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
                    value={name}
                    placeholder="Nom"
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
                    id="userEmail"
                    name="userEmail"
                    value={userEmail}
                    placeholder="Email"
                    onChange={(event) => {
                      setUserEmail(event.target.value);
                    }}
                  />
                </div>

                <input
                  type="number"
                  id="userPhone"
                  name="userPhone"
                  value={userPhone}
                  placeholder="Téléphone"
                  onChange={(event) => {
                    setUserPhone(event.target.value);
                  }}
                />
              </div>
              <hr />
              <h3>Profil Bouge</h3>
              <p>
                Créer son profil public Bouge pour être visible et attirer plus
                de pratiquants
              </p>
              <div className="doubleInput">
                <div className="requiredInput">
                  <div className="required">*</div>
                  <input
                    type="text"
                    id="activityName"
                    name="activityName"
                    value={activityName}
                    placeholder="Nom de l'entité"
                    onChange={(event) => {
                      setActivityName(event.target.value);
                    }}
                  />
                </div>

                <div className="requiredInput">
                  <div className="required">*</div>
                  <select
                    onChange={(event) => {
                      setCategory(event.target.value);
                    }}
                  >
                    <option value="">Type d'entité</option>
                    <option value="Studio privé">Studio privé</option>
                    <option value="Association">Association</option>
                    <option value="Municipale">Municipale</option>
                    <option value="Evènement">Evènement</option>
                  </select>
                </div>
              </div>
              <p>Types de discipline ?</p>
              <p>Séparez chaque discipline par un « / »</p>
              <div className="requiredInput">
                <div className="required">*</div>
                <input
                  type="text"
                  id="microActivityName"
                  name="microActivityName"
                  value={microActivityName}
                  placeholder="Ex : Yoga / Hot yoga / Méditation"
                  onChange={(event) => {
                    setMicroActivityName(event.target.value);
                  }}
                ></input>
              </div>

              <div className="doubleInput">
                <div className="requiredInput">
                  <div className="required">*</div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>
                <div className="requiredInput">
                  <div className="required">*</div>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    value={phone}
                    placeholder="Téléphone"
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                  />
                </div>
              </div>
              <input
                type="url"
                id="webSite"
                name="webSite"
                value={webSite}
                placeholder="Lien de votre site web ou réseau social"
                onChange={(event) => {
                  setWebSite(event.target.value);
                }}
              />
              <p>Faites une courte description de ce qui vous rend unique : </p>
              <p>ambiance, équipe, activités...</p>
              <div className="requiredInput">
                <div className="required">*</div>
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="10"
                  value={description}
                  placeholder="Description de votre commerce"
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                ></textarea>
              </div>
              <div>
                <p>Ajouter une image</p>
                <UploadImage
                  error={error}
                  image={image}
                  setImage={setImage}
                  onChangeImage={onChangeImage}
                  imgData={imgData}
                />
              </div>

              <h4>Adresse</h4>
              <div className="doubleInput">
                <div className="requiredInput">
                  <div className="required">*</div>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={city}
                    placeholder="Ville"
                    onChange={(event) => {
                      setCity(event.target.value);
                    }}
                  />
                </div>
                <div className="requiredInput">
                  <div className="required">*</div>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    placeholder="Numéro + nom de rue"
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="doubleInput">
                <div className="requiredInput">
                  <div className="required">*</div>
                  <input
                    type="number"
                    id="zipCode"
                    name="zipCode"
                    value={zipCode}
                    placeholder="Code postal"
                    onChange={(event) => {
                      setZipCode(event.target.value);
                    }}
                  />
                </div>
                <div className="requiredInput">
                  <div className="required">*</div>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={country}
                    placeholder="Pays"
                    onChange={(event) => {
                      setCountry(event.target.value);
                    }}
                  />
                </div>
              </div>
              <h4>Spécificités</h4>
              <div className="doubleInput">
                <div className="requiredInput">
                  <div className="required">*</div>
                  <select
                    onChange={(event) => {
                      setOutdoor(event.target.value);
                    }}
                  >
                    <option value="">Intérieur / Extérieur</option>
                    <option value="intérieur">Intérieur</option>
                    <option value="Extérieur">Extérieur</option>
                  </select>
                </div>
                <div className="requiredInput">
                  <div className="required">*</div>
                  <select>
                    <option value="">Couvert / Découvert</option>
                    <option value="">Couvert</option>
                    <option value="">Découvert</option>
                  </select>
                </div>
              </div>
              <div className="requiredInput">
                <div className="required">*</div>
                <select
                  onChange={(event) => {
                    setFloor(event.target.value);
                  }}
                >
                  <option value="">Type de sol</option>
                  <option value="Bitume">Bitume</option>
                  <option value="Parquet">Parquet</option>
                  <option value="Type A">Type A</option>
                  <option value="PVC">PVC</option>
                  <option value="Synthétique">Synthétique</option>
                </select>
              </div>

              <div className="round">
                <input
                  type="checkbox"
                  id="lights"
                  name="lights"
                  onChange={(e) => {
                    lights === "oui" ? setLights("non") : setLights("oui");
                  }}
                />
                <label htmlFor="lights"></label>
                <img src={lightBulb} alt="ampoule" />
                <p>Éclairage</p>
              </div>
              <div className="round">
                <input
                  type="checkbox"
                  id="lockers"
                  name="lockers"
                  onChange={(event) => {
                    if (event.target.value) {
                      lockers === "oui" ? setLockers("non") : setLockers("oui");
                    }
                  }}
                />
                <label htmlFor="lockers"></label>
                <img src={changingRoom} alt="vestiaire" />
                <p>Vestiaire</p>
              </div>
              <div className="round">
                <input
                  type="checkbox"
                  id="showers"
                  name="showers"
                  onChange={(event) => {
                    if (event.target.value) {
                      showers === "oui" ? setShowers("non") : setShowers("oui");
                    }
                  }}
                />
                <label htmlFor="showers"></label>
                <img src={shower} alt="douche" />
                <p>Douche</p>
              </div>
              <div className="round">
                <input
                  type="checkbox"
                  id="disabledAccess"
                  name="disabledAccess"
                  onChange={(event) => {
                    if (event.target.value) {
                      disabledAccess === "oui"
                        ? setDisabledAcces("non")
                        : setDisabledAcces("oui");
                    }
                  }}
                />
                <label htmlFor="disabledAccess"></label>
                <img src={handicap} alt="fauteuil roulant" />
                <p>Accès handicapé aire de jeu</p>
              </div>
              <div className="round">
                <input
                  type="checkbox"
                  id="lockersDisabledAccess"
                  name="lockersDisabledAccess"
                  onChange={(event) => {
                    if (event.target.value) {
                      lockersDisabledAccess === "oui"
                        ? setLockersDisabledAcces("non")
                        : setLockersDisabledAcces("oui");
                    }
                  }}
                />
                <label htmlFor="lockersDisabledAccess"></label>
                <img src={handicap} alt="fauteuil roulant" />
                <p>Accès handicapé vestiaire</p>
              </div>
              <div className="round">
                <input
                  type="checkbox"
                  id="standsDisabledAccess"
                  name="standsDisabledAccess"
                  onChange={(event) => {
                    if (event.target.value) {
                      standsDisabledAccess === "oui"
                        ? setStandDisabledAcces("non")
                        : setStandDisabledAcces("oui");
                    }
                  }}
                />
                <label htmlFor="standsDisabledAccess"></label>
                <img src={handicap} alt="fauteuil roulant" />
                <p>Accès handicapé tribune</p>
              </div>

              <div>
                <div className={errorRequired ? "required-form" : "hidden"}>
                  <p>( * ) Champs Obligatoires</p>
                  <p>
                    Merci de remplir tous les champs contenant une
                    <span className="star"> *</span>
                  </p>
                </div>
                <button type="submit">Envoyer ma demande</button>
                <p>Prêt à démarrer ?</p>
                <p>
                  Du fait du nombre de demandes élevées, le processus de
                  validation peut prendre quelques jours.
                </p>
                <p>
                  Nous vous enverrons un email dès que nous aurons vérifié vos
                  informations.
                </p>
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

export default SportActor;
