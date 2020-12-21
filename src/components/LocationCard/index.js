import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import NotFound from "../../assets/images/image-not-found.jpg";

const LocationCard = ({
  id,
  name,
  category,
  address,
  micro_activity_name,
  macro_activity_generic_image,
  start_date,
  duration,
  access_type,
  setDisplayCopyClipboardMessage,
}) => {
  const imgUrl = () => {
    if (macro_activity_generic_image) {
      const commaIndex = macro_activity_generic_image.indexOf(",");
      if (commaIndex !== -1) {
        return macro_activity_generic_image.substring(0, commaIndex);
      } else {
        return macro_activity_generic_image;
      }
    } else {
      return NotFound;
    }
  };

  const badge = {
    PUB: <span className="badge badge-green">Public</span>,
    PRIV: <span className="badge badge-pink">Privé</span>,
    AS: <span className="badge badge-blue">Association</span>,
    EVENT: <span className="badge badge-orange">Activité</span>,
    ALL: <span className="badge badge-purple">Autre</span>,
  };

  const copyToClipboard = () => {
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        navigator.clipboard.writeText(window.location.href + "/" + id).then(
          () => {
            setDisplayCopyClipboardMessage(true);
          },
          () => {
            console.log("problem. not copied");
          }
        );
      }
    });
  };

  return (
    <div className="locationCard-wrapper">
      <Link to={`/pdrs/${id}`}>
        <div id="locationCard" className="container-card">
          <img src={imgUrl()} alt={micro_activity_name} />
          <div className="details-card">
            <div className="location-card">
              <span>{name}</span>
              <span>{micro_activity_name}</span>
              <span>{address}</span>
            </div>
            <div className="type-card">
              {badge[category]}
              {start_date && (
                <span>
                  {start_date + " - " + duration + " - " + access_type}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
      <div className="related-card">
        <span onClick={copyToClipboard}>Partager</span>
      </div>
    </div>
  );
};

export default LocationCard;
