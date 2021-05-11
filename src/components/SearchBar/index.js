import React, { useState, useEffect } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";

const SearchBar = ({
  setSearchSport,
  setSearchCity,
  searchCity,
  searchSport,
  setSearchType,
  searchType,
  setPage,
}) => {
  let location = useLocation();
  let history = useHistory();
  const [city, setCity] = useState(searchCity);
  const [sport, setSport] = useState(searchSport);
  const [title, setTitle] = useState("");
  const [type, setType] = useState(searchType);
  const [cityData, setCityData] = useState([]);
  const [sportData, setSportData] = useState([]);
  const [autoComplete, setAutoComplete] = useState([]);
  const [displayAutoComplete, setDisplayAutoComplete] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(city);
    setSearchSport(sport);
    type ? setSearchType(type) : setSearchType("ALL");
    setPage(0);
    if (location.pathname !== "/pdrs") history.push("/pdrs");
  };

  const autoCompleteCity = async (input) => {
    const regex = new RegExp(`^${input}`, "gi");
    const filteredData = cityData.filter((city) => {
      return regex.test(city.city);
    });
    setAutoComplete(filteredData);
  };

  const autoCompleteSport = async (input) => {
    const regex = new RegExp(`^${input}`, "gi");
    const filteredData = sportData.filter((sport) => {
      return regex.test(sport.sport);
    });
    setAutoComplete(filteredData);
  };
  const renderAutoComplete = autoComplete.map((elem, index) => {
    if (index <= 9) {
      return (
        <div
          className="autocomplete-div"
          key={index}
          onClick={() => {
            if (elem.type === "city") {
              setCity(elem.city);
            }
            if (elem.type === "sport") {
              setSport(elem.sport);
            }
            setDisplayAutoComplete(false);
          }}
        >
          <p>{elem.type === "city" ? elem.city : elem.sport}</p>
        </div>
      );
    } else {
      return null;
    }
  });

  const fetchDataCity = async (source) => {
    try {
      const { data } = await axios.get("https://bouge.herokuapp.com/cities", {
        cancelToken: source.token,
      });
      if (data) {
        // console.log("line cities", data);
        const dataMapped = data.map((city) => {
          return { city: city.name, type: "city" };
        });
        setCityData(dataMapped);
      } else {
        console.log("error. no response found for cities");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchDataSport = async (source) => {
    try {
      const { data } = await axios.get(
        "https://bouge.herokuapp.com/activities",
        {
          cancelToken: source.token,
        }
      );
      if (data) {
        // console.log("line sport", data);
        const dataMapped = data.map((sport) => {
          return { sport: sport.macro_activity_name, type: "sport" };
        });
        setSportData(dataMapped);
      } else {
        console.log("error. no response found for sports");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    // if (isLoading) {
    fetchDataCity(source);
    fetchDataSport(source);
    // }
    return () => {
      source.cancel("Bienvenu(e)s !");
    };
  }, []);

  return (
    <div className="super-container-search">
      <form
        id="search-bar"
        className="container"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="city">
          <label htmlFor="city">Ville</label>
          <input
            type="text"
            name="city"
            placeholder="Où veux-tu jouer?"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setDisplayAutoComplete(true);
              autoCompleteCity(e.target.value);
              if (e.target.value.length === 0) {
                setDisplayAutoComplete(false);
              }
            }}
          />
        </div>
        <div className="sport">
          <label htmlFor="sport">Sport</label>
          <input
            type="text"
            name="sport"
            placeholder="Spécifie le sport"
            value={sport}
            onChange={(e) => {
              setSport(e.target.value);
              setDisplayAutoComplete(true);
              autoCompleteSport(e.target.value);
              if (e.target.value.length === 0) {
                setDisplayAutoComplete(false);
              }
            }}
          />
        </div>
        <div className="title">
          <label htmlFor="title">Nom</label>
          <input
            type="text"
            name="title"
            placeholder="Recherche par nom"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="type">
          <label htmlFor="type">Type</label>
          <select
            type="text"
            name="type"
            placeholder="Type de structure"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="ALL" defaultValue>
              Type de structure
            </option>
            <option value="AS">Association</option>
            <option value="PRIV">Privé</option>
            <option value="PUB">Public</option>
            <option value="EVENT">Activité</option>
          </select>
        </div>
        <button type="submit" className="submit">
          <FontAwesomeIcon icon="search" className="icon"></FontAwesomeIcon>
          Rechercher
        </button>
      </form>
      {displayAutoComplete ? (
        <div className="search-results">{renderAutoComplete}</div>
      ) : null}
    </div>
  );
};

export default SearchBar;
