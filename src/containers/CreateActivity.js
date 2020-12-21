import React, { useState } from "react";
import axios from "axios";
import HeroSection from "../components/HeroSection/index";
import Image from "../assets/images/create-activity.jpg";
import ResponseForm from "../components/responseForm/ResponseForm";
import UploadImage from "../components/Upload_image/UploadImage";
// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LightBulb from "../assets/images/icons/light-bulb.png";
import ChangingRoom from "../assets/images/icons/changing-room.png";
import Shower from "../assets/images/icons/shower.png";
import Handicap from "../assets/images/icons/handicap.png";

// States

// -------------------contact référent-------------------------------------------
function CreateActivity() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };
  const handleUserPhoneChange = (event) => {
    setUserPhone(event.target.value);
  };
  // ---------------Renseignements sur votre activité-------------------------------
  const [name, setName] = useState("");
  const [access, setAccess] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [sport, setSport] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  //
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
  const [Status, setStatus] = useState("");

  // //changements functions
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleAccessChange = (event) => {
    setAccess(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleHourChange = (event) => {
    setHour(event.target.value);
  };
  const handleSportChange = (event) => {
    setSport(event.target.value);
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

  // -------------------------Adresse-----------------------------------------------
  const [ville, setVille] = useState("");
  const [numberAdress, setNumberAdress] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [pays, setPays] = useState("");
  //handleChange-----
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

  // -----------------------specificity---------------------------------------------
  const [inter_exter, setInter_exter] = useState("non");
  const [typeSol, setTypeSol] = useState("non");
  const [isLighted, setIsLighted] = useState("non");
  const [isLocker, setIsLocker] = useState("non");
  const [isShower, setIsShower] = useState("non");
  const [isAccessHandicapPlay, setIsAccessHandicapPlay] = useState("non");
  const [isAccessHandicapLocker, setIsAccessHandicapLocker] = useState("non");
  const [isAccessHandicapStand, setIsAccessHandicapStand] = useState("non");
  // const [couvert, setCouvert] = useState("");
  // error input required
  const [errorRequired, setErrorRequired] = useState(false);

  //handleChange functions
  const handleInter_exterChange = (event) => {
    setInter_exter(event.target.value);
  };
  const handleTypeSolChange = (event) => {
    setTypeSol(event.target.value);
  };

  const handleIsLightedChange = (e) => {
    if (e.target.checked) {
      setIsLighted("oui");
    } else {
      setIsLighted("non");
    }
  };
  const handleIsLockerChange = (e) => {
    if (e.target.checked) {
      setIsLocker("oui");
    } else {
      setIsLocker("non");
    }
  };
  const handleIsShowerChange = (e) => {
    if (e.target.checked) {
      setIsShower("oui");
    } else {
      setIsShower("non");
    }
  };
  const handleIsAccessHandicapPlayChange = (e) => {
    if (e.target.checked) {
      setIsAccessHandicapPlay("oui");
    } else {
      setIsAccessHandicapPlay("non");
    }
  };
  const handleIsAccessHandicapLockerChange = (e) => {
    if (e.target.checked) {
      setIsAccessHandicapLocker("oui");
    } else {
      setIsAccessHandicapLocker("non");
    }
  };
  const handleIsAccessHandicapStandChange = (e) => {
    if (e.target.checked) {
      setIsAccessHandicapStand("oui");
    } else {
      setIsAccessHandicapStand("non");
    }
  };

  // ----------------------handleSubmit-------------------
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "yhfmk4pa");
    if (
      firstName &&
      lastName &&
      userEmail &&
      name &&
      access &&
      date &&
      hour &&
      sport &&
      email &&
      description &&
      image &&
      ville &&
      numberAdress &&
      codePostal &&
      pays &&
      inter_exter &&
      typeSol
    ) {
      try {
        const Formulaire = "Créer une activité";
        const cloudinaryResponse = await axios.post(
          "https://api.Cloudinary.com/v1_1/daizylyrh/image/upload",
          formData
        );
        const imageUrl = cloudinaryResponse.data.secure_url;

        const response = await axios.post(
          "https://api.airtable.com/v0/appKTZBduOJSUNbJm/Formulaire%20Bubble",
          {
            records: [
              {
                fields: {
                  Formulaire,
                  "User name": firstName,
                  "User last name": lastName,
                  "User email": userEmail,
                  "User phone number": userPhone,
                  Name: name,
                  "Accès libre / Réserver": access,
                  "Date début activité": date,
                  "Heure début activité": hour,
                  "Micro Activity Name": sport,
                  "Phone Number": phone,
                  Email: email,
                  Websites: website,
                  Description: description,
                  image: [{ url: imageUrl }],
                  "City Name": ville,
                  "Numéro + rue": numberAdress,
                  "Code postal": codePostal,
                  Pays: pays,
                  Outdoor: inter_exter,
                  "Floor Type": typeSol,
                  Lighting: isLighted,
                  "Locker Room": isLocker,
                  Shower: isShower,
                  "Disabled Access": isAccessHandicapPlay,
                  "Locker Room Disabled Access": isAccessHandicapLocker,
                  "Stand Disabled Access": isAccessHandicapStand,
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
        // console.log(response.data);
        setStatus(response.status);
      } catch (error) {
        console.log("catch =>", error.response);
      }
    } else {
      setErrorRequired(true);
    }
  };

  return (
    <div>
      {Status === 200 ? (
        <div className="container">
          <HeroSection
            title="Créer une activité"
            paragraphs={
              <>
                <div className="para1">
                  <p>100% GRATUIT</p>
                  <p>Vous êtes un citoyen ou un acteur du sport ?</p>
                  <p>
                    Créez un nombre illimité d’activités et bénéficiez d’un
                    référencement neutre et puissant grâce à notre partenariat
                    avec la ville.
                  </p>
                </div>
                <p>
                  Rassemblez les gens autour d’une passion, d’un moment sportif
                  et attirez plus de participants.
                </p>
                <p>
                  C’est juste ici et ça prend 3min
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
        <main className="container">
          <HeroSection
            title="Créer une activité"
            paragraphs={
              <>
                <div className="para1">
                  <p>100% GRATUIT</p>
                  <p>Vous êtes un citoyen ou un acteur du sport ?</p>
                  <p>
                    Créez un nombre illimité d’activités et bénéficiez d’un
                    référencement neutre et puissant grâce à notre partenariat
                    avec la ville.
                  </p>
                </div>
                <p>
                  Rassemblez les gens autour d’une passion, d’un moment sportif
                  et attirez plus de participants.
                </p>
                <p>
                  C’est juste ici et ça prend 3min &nbsp;
                  <span role="img" aria-label="index-pointing-down">
                    &#128071;
                  </span>
                </p>
              </>
            }
            image={Image}
          ></HeroSection>
          <form onSubmit={handleSubmit}>
            <h3>Contact référent</h3>
            <div>
              <div className="doubleInput">
                <div className="required-input">
                  <input
                    type="text"
                    required
                    placeholder="Prénom"
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                  <FontAwesomeIcon
                    icon="asterisk"
                    className="required-asterisk"
                  />
                </div>
                <div className="required-input">
                  <input
                    type="text"
                    required
                    placeholder="Nom"
                    value={lastName}
                    onChange={handleLastNameChange}
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
                    type="email"
                    required
                    placeholder="Email"
                    value={userEmail}
                    onChange={handleUserEmailChange}
                  />
                  <FontAwesomeIcon
                    icon="asterisk"
                    className="required-asterisk"
                  />
                </div>
                <input
                  type="number"
                  placeholder="Téléphone"
                  value={userPhone}
                  onChange={handleUserPhoneChange}
                />
              </div>
            </div>

            <hr />
            <br />

            <h3>Renseignements sur votre activité</h3>
            <p>
              Cette activité sera publique et visible par toute la communauté
              sur la carte Bouge.
            </p>
            <br />

            <div className="doubleInput">
              <div className="required-input">
                <input
                  type="text"
                  required
                  placeholder="Nom de l’activité"
                  value={name}
                  onChange={handleNameChange}
                />
                <FontAwesomeIcon
                  icon="asterisk"
                  className="required-asterisk"
                />
              </div>
              <div className="required-input">
                <select
                  value={access}
                  required
                  onChange={handleAccessChange}
                  className="input-select"
                  type="text"
                  placeholder="Accès libre / Réserver"
                >
                  <option value="Accès libre">Accès libre</option>
                  <option value="Réserver">Réserver</option>
                </select>
                <FontAwesomeIcon
                  icon="asterisk"
                  className="required-asterisk"
                />
              </div>
            </div>
            <div className="doubleInput">
              <div className="required-input">
                <input
                  type="date"
                  required
                  placeholder="Date de l’activité"
                  value={date}
                  onChange={handleDateChange}
                />
                <FontAwesomeIcon
                  icon="asterisk"
                  className="required-asterisk"
                />
              </div>
              <div className="required-input">
                <input
                  type="time"
                  required
                  placeholder="Heure de début"
                  value={hour}
                  onChange={handleHourChange}
                />
                <FontAwesomeIcon
                  icon="asterisk"
                  className="required-asterisk"
                />
              </div>
            </div>

            <div className="discipline">
              <p className="p-margin0">Types de discipline ?</p>
              <p>Séparer chaque discipline par un slash « / »</p>
              <div className="required-input">
                <input
                  value={sport}
                  required
                  onChange={handleSportChange}
                  className="input-full-width"
                  type="text"
                  placeholder="Ex : Yoga / Hot Yoga / Méditation"
                />
                <FontAwesomeIcon
                  icon="asterisk"
                  className="required-asterisk"
                />
              </div>
              <div className="doubleInput">
                <div className="required-input">
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <FontAwesomeIcon
                    icon="asterisk"
                    className="required-asterisk"
                  />
                </div>
                <input
                  type="number"
                  placeholder="Téléphone"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>
              <input
                value={website}
                onChange={handleWebsiteChange}
                className="input-full-width"
                type="url"
                placeholder="Lien de votre site web ou réseau social"
              />
              <p className="p-margin0">
                Faire une courte description de ce qui rend votre activité
                unique.
              </p>
              <p>Préciser la durée de votre activité !</p>
              <div className="required-input">
                <textarea
                  value={description}
                  required
                  onChange={handleDescriptionChange}
                  type="text"
                  placeholder="Ex :
                    Durée de l’activité 90mn
                    Venez vous joindre à une session de Yoga extérieur pour bien
                    commencer votre weekend."
                  rows={9}
                />
                <FontAwesomeIcon
                  icon="asterisk"
                  className="required-asterisk"
                />
              </div>
            </div>
            <div>
              <p>Ajouter une image</p>
              <UploadImage
                error={error}
                required
                image={image}
                setImage={setImage}
                onChangeImage={onChangeImage}
                imgData={imgData}
              />
            </div>
            {/* adresse */}
            <div>
              <h3>Adresse</h3>
              <div className="doubleInput">
                <div className="required-input">
                  <input
                    type="text"
                    required
                    placeholder="Ville"
                    value={ville}
                    onChange={handleVilleChange}
                  />
                  <FontAwesomeIcon
                    icon="asterisk"
                    className="required-asterisk"
                  />
                </div>
                <div className="required-input">
                  <input
                    type="text"
                    required
                    placeholder="Numéro + nom de rue"
                    value={numberAdress}
                    onChange={handleNumberAdressChange}
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
                    type="number"
                    placeholder="Code postal"
                    value={codePostal}
                    required
                    onChange={handleCodePostalChange}
                  />
                  <FontAwesomeIcon
                    icon="asterisk"
                    className="required-asterisk"
                  />
                </div>
                <div className="required-input">
                  <input
                    type="text"
                    placeholder="Pays"
                    value={pays}
                    required
                    onChange={handlePaysChange}
                  />
                  <FontAwesomeIcon
                    icon="asterisk"
                    className="required-asterisk"
                  />
                </div>
              </div>
            </div>
            {/* Spécificités */}
            <div>
              <h3>Spécificités</h3>
              <div className="doubleInput">
                <div className="required-input">
                  <select
                    className="input-select"
                    name="emplacement"
                    value={inter_exter}
                    required
                    onChange={handleInter_exterChange}
                  >
                    <option value="Intérieur/Extérieur">
                      Intérieur/Extérieur
                    </option>
                    <option value="Intérieur">Intérieur</option>
                    <option value="Extérieur">Extérieur</option>
                  </select>
                  <FontAwesomeIcon
                    icon="asterisk"
                    className="required-asterisk"
                  />
                </div>
                {/* className="update-select" */}
                {/* <select className="input-select" name="" id="">
              <option value="">Couvert/Découvert</option>
              <option value="">Option 2</option>
              <option value="">Option 3</option>
            </select> */}
                <div className="required-input">
                  <select
                    className="input-select"
                    name=""
                    id=""
                    value={typeSol}
                    required
                    onChange={handleTypeSolChange}
                  >
                    <option value="">Type de sol</option>
                    <option value="Bitume">Bitume</option>
                    <option value="Parquet">Parquet</option>
                    <option value="Type A">Type A</option>
                    <option value="PVC">PVC</option>
                    <option value="Synthétique">Synthétique</option>
                  </select>
                  <FontAwesomeIcon
                    icon="asterisk"
                    className="required-asterisk"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="line-spec">
                <input
                  type="checkbox"
                  id="eclairage"
                  name="eclairage"
                  onChange={handleIsLightedChange}
                />
                <label htmlFor="eclairage"></label>
                <img src={LightBulb} alt="Éclairage" />
                <p>Éclairage</p>
              </div>
              <div className="line-spec">
                <input
                  type="checkbox"
                  id="vestiaiare"
                  name="vestiaiare"
                  onChange={handleIsLockerChange}
                />
                <label htmlFor="vestiaiare"></label>
                <img src={ChangingRoom} alt="Vestiaiare" />
                <p>Vestiaiare</p>
              </div>
              <div className="line-spec">
                <input
                  type="checkbox"
                  id="douche"
                  name="douche"
                  onChange={handleIsShowerChange}
                />
                <label htmlFor="douche"></label>
                <img src={Shower} alt="Douche" />
                <p>Douche</p>
              </div>
              <div className="line-spec">
                <input
                  onChange={handleIsAccessHandicapPlayChange}
                  type="checkbox"
                  id="accesHandicapeAireDeJeu"
                  name="accesHandicapeAireDeJeu"
                />
                <label htmlFor="accesHandicapeAireDeJeu"></label>
                <img src={Handicap} alt="Accès handicapé aire de jeu" />
                <p> Accès handicapé aire de jeu</p>
              </div>
              <div className="line-spec">
                <input
                  onChange={handleIsAccessHandicapLockerChange}
                  type="checkbox"
                  id="accesHandicapeVestiaire"
                  name="accesHandicapeVestiaire"
                />
                <label htmlFor="accesHandicapeVestiaire"></label>
                <img src={Handicap} alt="VestiaiAccès handicapé vestiaireare" />
                <p> Accès handicapé vestiaire</p>
              </div>
              <div className="line-spec">
                <input
                  onChange={handleIsAccessHandicapStandChange}
                  type="checkbox"
                  id="accesHandicapeTribune"
                  name="accesHandicapeTribune"
                />
                <label htmlFor="accesHandicapeTribune"></label>
                <img src={Handicap} alt="Accès handicapé tribune" />
                <p> Accès handicapé tribune</p>
              </div>
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
              <p>
                Du fait du nombre de demandes élevées, le processus de réponse
                peut prendre quelques jours.
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
        </main>
      )}
    </div>
  );
}

export default CreateActivity;
