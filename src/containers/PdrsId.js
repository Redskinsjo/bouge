import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../assets/style/pdrsId.css";
import Phone from "../assets/images/icons/phone-numbers-call.png";
import Email from "../assets/images/icons/email.png";
import Location from "../assets/images/icons/location.png";
import Arrow from "../assets/images/icons/right-arrow.png";
import Locker from "../assets/images/icons/changing-room.png"; //vestiaire
import Playfield from "../assets/images/icons/court.png"; //terrain
import Handicap from "../assets/images/icons/handicap.png"; //handicapé
import Inside from "../assets/images/icons/Interieur.png"; //intérieur
import Shower from "../assets/images/icons/shower.png"; //douche
import Toilet from "../assets/images/icons/toilet.png"; //toilette
import Light from "../assets/images/icons/light-bulb.png"; //éclairage
import axios from "axios";
import OpinionMatters from "../components/OpinionMatters/index";
import "../components/OpinionMatters/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PdrsId = () => {
    const params = useParams();
    const [data, setData] = useState({});
    const [specs, setSpecs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [
        displayCopyClipboardMessage,
        setDisplayCopyClipboardMessage,
    ] = useState(false);

    let renderTruthySpecs = specs.map((spec, index) => {
        if (spec.key !== "disabled_access") {
            if (spec.value) {
                let icon;
                let title;
                switch (spec.key) {
                    case "shower":
                        icon = Shower;
                        title = "Douche";
                        break;
                    case "sanitary":
                        icon = Toilet;
                        title = "Toilette";
                        break;
                    case "sanitary_disabled_access":
                        icon = Handicap;
                        title = "Accès handicapé toilette";
                        break;
                    case "stand":
                        icon = "null";
                        title = "Tribunes";
                        break;
                    case "stand_disabled_access":
                        icon = Handicap;
                        title = "Accès handicapé tribunes";
                        break;
                    case "lighting":
                        icon = Light;
                        title = "Éclairage";
                        break;
                    case "locker_room":
                        icon = Locker;
                        title = "Vestiaire";
                        break;
                    case "locker_room_disabled_access":
                        icon = Handicap;
                        title = "Accès handicapé vestiaire";
                        break;
                    case "outdoor":
                        icon = Inside;
                        title = "Extérieur";
                        break;
                    case "floor_type":
                        icon = Playfield;
                        title = "Synthétique";
                        break;
                    default:
                        console.log("passed in default");
                        break;
                }
                if (icon && title) {
                    return (
                        <div className="spec" key={index}>
                            <img src={icon} alt="" />
                            <span>{title}</span>
                        </div>
                    );
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    });

    let renderFalsySpecs = specs.map((spec, index) => {
        if (spec.key !== "disabled_access") {
            if (!spec.value) {
                let icon;
                let title;
                switch (spec.key) {
                    case "shower":
                        icon = Shower;
                        title = "Douche";
                        break;
                    case "sanitary":
                        icon = Toilet;
                        title = "Toilette";
                        break;
                    case "sanitary_disabled_access":
                        icon = Handicap;
                        title = "Accès handicapé toilette";
                        break;
                    case "stand":
                        icon = "null";
                        title = "Tribunes";
                        break;
                    case "stand_disabled_access":
                        icon = Handicap;
                        title = "Accès handicapé tribunes";
                        break;
                    case "lighting":
                        icon = Light;
                        title = "Éclairage";
                        break;
                    case "locker_room":
                        icon = Locker;
                        title = "Vestiaire";
                        break;
                    case "locker_room_disabled_access":
                        icon = Handicap;
                        title = "Accès handicapé vestiaire";
                        break;
                    case "outdoor":
                        icon = Inside;
                        title = "Extérieur";
                        break;
                    case "floor_type":
                        icon = Playfield;
                        title = "Synthétique";
                        break;
                    default:
                        console.log("passed in default");
                        break;
                }
                return (
                    <div
                        className={["spec", "unavailable-spec"].join(" ")}
                        key={index}
                    >
                        <img src={icon} alt="" />
                        <span>{title}</span>
                    </div>
                );
            } else {
                return null;
            }
        } else {
            return null;
        }
    });

    const renderBestEmoji = () => {
        const entries = Object.entries(data.rating_experience);
        let emojiHtml;
        let emoji = "";
        let max = 0;
        for (let i = 0; i < entries.length; i++) {
            if (entries[i][1] >= max) {
                emoji = entries[i][0];
                max = entries[i][1];
            }
        }
        switch (emoji) {
            case "rating_1":
                emojiHtml = (
                    <label htmlFor="1">
                        <span role="img" aria-label="swearing">
                            &#129324;
                        </span>
                    </label>
                );
                break;
            case "rating_2":
                emojiHtml = (
                    <label htmlFor="2">
                        <span role="img" aria-label="unhappy">
                            &#128577;
                        </span>
                    </label>
                );
                break;
            case "rating_3":
                emojiHtml = (
                    <label htmlFor="3">
                        <span role="img" aria-label="shrugging">
                            &#129335;
                        </span>
                    </label>
                );
                break;
            case "rating_4":
                emojiHtml = (
                    <label htmlFor="4">
                        <span role="img" aria-label="smiling">
                            &#128512;
                        </span>
                    </label>
                );
                break;
            case "rating_5":
                emojiHtml = (
                    <label htmlFor="5">
                        <span role="img" aria-label="in-love">
                            &#128525;
                        </span>
                    </label>
                );
                break;
            default:
                break;
        }
        return emojiHtml;
    };

    const copyToClipboard = () => {
        navigator.permissions
            .query({ name: "clipboard-write" })
            .then((result) => {
                if (result.state === "granted" || result.state === "prompt") {
                    navigator.clipboard.writeText(window.location.href).then(
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

    const fetchData = async () => {
        try {
            const response = await axios.get(
                "https://bouge-api.herokuapp.com/v1.0/pdrs/?id=" +
                    params.id +
                    "&radius=0&offset=0"
            );
            if (response) {
                setData(response.data.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error.response);
        }
    };

    const getSpecs = (data) => {
        const specs = [];
        for (let spec in data) {
            if (
                spec === "shower" ||
                spec === "sanitary" ||
                spec === "sanitary_disabled_access" ||
                spec === "stand" ||
                spec === "stand_disabled_access" ||
                spec === "lighting" ||
                spec === "locker_room" ||
                spec === "locker_room_disabled_access" ||
                spec === "outdoor" ||
                spec === "floor_type" ||
                spec === "disabled_access"
            ) {
                specs.push({ key: spec, value: data[spec] });
            }
        }
        setSpecs(specs);
    };

    let renderImages;
    if (!isLoading) {
        if (data.macro_activity_generic_image) {
            renderImages = data.macro_activity_generic_image
                .split(", ")
                .map((image, index) => {
                    if (index === 0) {
                        return <img src={image} alt="" key={index}></img>;
                    } else {
                        return null;
                    }
                });
        } else {
            renderImages = (
                <img
                    src="https://www.labaleine.fr/sites/default/files/image-not-found.jpg"
                    alt=""
                ></img>
            );
        }
    }

    let categClasses = [];
    if (!isLoading) {
        switch (data.category) {
            case "PUB":
                categClasses.push("badge-green");
                break;
            case "AS":
                categClasses.push("badge-blue");
                break;
            case "PRIV":
                categClasses.push("badge-pink");
                break;
            case "EVENT":
                categClasses.push("badge-orange");
                break;
            default:
                categClasses.push("badge-purple");
                break;
        }
        categClasses.join(" ");
    }

    useEffect(() => {
        if (isLoading) {
            fetchData();
        }
    });

    useEffect(() => {
        getSpecs(data);
    }, [data]);

    useEffect(() => {
        if (displayCopyClipboardMessage) {
            setTimeout(() => {
                setDisplayCopyClipboardMessage(false);
            }, 3000);
        }
    }, [displayCopyClipboardMessage]);

    return (
        <main id="pdrs-page" className="container">
            {displayCopyClipboardMessage && (
                <div className="clipboard-message">
                    <FontAwesomeIcon
                        icon="check"
                        className="icon-clipboard-message"
                    />
                    <p>Copié dans le presse-papiers</p>
                </div>
            )}
            <div className="pdrs-card">
                <div className="slider">
                    <div>{renderImages}</div>
                </div>
                <div className="pdrs-category">
                    <span className={categClasses}>
                        {data.category === "PUB"
                            ? "Public"
                            : data.category === "AS"
                            ? "Association"
                            : data.category === "PRIV"
                            ? "Privé"
                            : data.category === "EVENT"
                            ? "Événement"
                            : "All"}
                    </span>
                    <span>{data.start_date || "Accès libre"}</span>
                </div>
                <div className="pdrs-name">
                    <span className="title">{data.name}</span>
                    <span>{data.micro_activity_name}</span>
                </div>
                <div className="pdrs-ratings">
                    {isLoading || renderBestEmoji()}
                </div>
                <p className="pdrs-desc">
                    {data.description || "Pas de description"}
                </p>
                <div className="pdrs-share" onClick={copyToClipboard}>
                    <span>Partager cette fiche</span>
                </div>
            </div>
            <div className="pdrs-contact">
                <div className="pdrs-contact-left-part">
                    <div className="title">Accès & contact</div>
                    <div className="pdrs-contact-details">
                        <img src={Phone} alt="" />
                        <span>{data.phone_number || "-"}</span>
                    </div>
                    <div className="pdrs-contact-details">
                        <img src={Email} alt="" />
                        <span>{data.email || "-"}</span>
                    </div>
                    <div className="pdrs-contact-details">
                        <img src={Arrow} alt="" />
                        {data.website ? (
                            <a
                                href={data.website}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {data.website}
                            </a>
                        ) : (
                            <span>-</span>
                        )}
                    </div>
                    <div className="pdrs-contact-details">
                        <img src={Location} alt="" />
                        <span>{data.address || "-"}</span>
                    </div>
                </div>
                <div className="pdrs-map">
                    <img
                        src="https://snazzy-maps-cdn.azureedge.net/assets/122770-carte-vierge.png?v=00010101120000"
                        alt=""
                    />
                </div>
            </div>
            <div className="pdrs-specs">
                <div className="title">Spécificités</div>
                <div
                    className="specs-list"
                    style={{ display: "flex", flexWrap: "wrap" }}
                >
                    {renderTruthySpecs}
                    {renderFalsySpecs}
                </div>
            </div>
            <OpinionMatters data={data} />
        </main>
    );
};

export default PdrsId;
