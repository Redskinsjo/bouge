import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UploadImage({ error, imgData, image, setImage, onChangeImage }) {
  return (
    <div className="contenu">
      <div className={image ? "input_image hidden" : "input_image"}>
        <label htmlFor="Pic">
          <span>+</span>
        </label>
        <input id="Pic" type="file" onChange={onChangeImage} />
        <FontAwesomeIcon icon="asterisk" className="required-asterisk" />
      </div>
      <div className={!image ? "previewPic hidden" : "previewPic"}>
        <img src={imgData} alt={imgData} />
        <p
          onClick={() => {
            setImage(null);
          }}
        >
          x
        </p>
      </div>
      {error ? <p className="error_msg">Fichier non supportè...!!</p> : ""}
    </div>
  );
}

export default UploadImage;
