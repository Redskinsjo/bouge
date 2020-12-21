import React from "react";
import { Link } from "react-router-dom";
import "./responseForm.css";
import Logo from "../../assets/images/logo.png";
import Ok from "../../assets/images/icons/ok-icon.png";

function ResponseForm() {
  return (
    <div className="container_response">
      <div className="response">
        <img className="image_logo" src={Logo} alt="" />
        <div className="message_ok">
          <p>Demande envoyée avec succès...!!</p>
          <img src={Ok} alt="ok" />
        </div>
        <div className="paragraphs">
          <p>Nous traiterons votre demande dès que possible</p>
          <p>Merci ... A très vite </p>
        </div>
        <Link to="/">Retour à la page d'accueil</Link>
      </div>
    </div>
  );
}

export default ResponseForm;
