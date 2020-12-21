import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import NotFound from "../../assets/images/image-not-found.jpg";
import { useHistory } from "react-router-dom";
import "./index.css";

const mapboxKey =
  "pk.eyJ1IjoibWVkaGlzYXZhcnlib3VnZSIsImEiOiJja2k4ZTN0ZHEwNHJ2MnJyczFzbXA0cnVxIn0.1L3ahfViqqgQgV6UBLqq8w";

const Map = ({ data, city }) => {
  let history = useHistory();
  const [viewport, setViewport] = useState({
    longitude: city.longitude,
    latitude: city.latitude,
    zoom: 11,
    width: "100%",
    height: "585px",
  });

  const [selectedPDRS, setSelectedPDRS] = useState(null);

  useEffect(() => {
    const listener = (event) => {
      if (event.key === "Escape") setSelectedPDRS(null);
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const badge = {
    PUB: <span className="badge badge-green">Public</span>,
    PRIV: <span className="badge badge-pink">Privé</span>,
    AS: <span className="badge badge-blue">Association</span>,
    EVENT: <span className="badge badge-orange">Activité</span>,
    ALL: <span className="badge badge-purple">Autre</span>,
  };

  const imgUrl = () => {
    if (selectedPDRS.macro_activity_generic_image) {
      const commaIndex = selectedPDRS.macro_activity_generic_image.indexOf(",");
      if (commaIndex !== -1) {
        return selectedPDRS.macro_activity_generic_image.substring(
          0,
          commaIndex
        );
      } else {
        return selectedPDRS.macro_activity_generic_image;
      }
    } else {
      return NotFound;
    }
  };

  return (
    <main>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={mapboxKey}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        mapStyle="mapbox://styles/medhisavarybouge/cki8vpz0l0iee1aoiw7r69bwr"
      >
        {data.map((pdrs) => {
          const { id, latitude, longitude } = pdrs;
          return (
            <Marker key={id} latitude={latitude} longitude={longitude}>
              <button
                className="marker-btn"
                onClick={(event) => {
                  event.preventDefault();
                  setSelectedPDRS(pdrs);
                }}
              >
                <img src="/map-pin.svg" alt="" />
              </button>
            </Marker>
          );
        })}

        {selectedPDRS && (
          <Popup
            latitude={selectedPDRS.latitude}
            longitude={selectedPDRS.longitude}
            onClose={() => {
              setSelectedPDRS(null);
            }}
            closeOnclick={false}
            captureClick={true}
          >
            <div className="selectedPDRS">
              <img
                src={imgUrl()}
                alt={selectedPDRS.micro_activity_name}
                onMouseDown={() => {
                  history.push(`/pdrs/${selectedPDRS.id}`);
                }}
              />

              <div className="selectedPDRS-details">
                <div className="selectedPDRS-title">
                  <h4>
                    {selectedPDRS.name.substring(0, 35)}
                    {selectedPDRS.name.length > 35 ? "..." : ""}
                  </h4>
                  <span>
                    {selectedPDRS.micro_activity_name.substring(0, 30)}
                    {selectedPDRS.micro_activity_name.length > 30 ? "..." : ""}
                  </span>
                </div>
                <div className="selectedPDRS-date">
                  {selectedPDRS.start_date &&
                    selectedPDRS.start_date +
                      " - " +
                      selectedPDRS.duration +
                      " - " +
                      selectedPDRS.access_type}
                </div>
                <div className="selectedPDRS-badge">
                  {badge[selectedPDRS.category]}
                  <a href="# ">Partager</a>
                </div>
              </div>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </main>
  );
};

export default Map;
