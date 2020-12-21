import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/index";
import LocationCard from "../components/LocationCard/index";
import Map from "../components/Map";
import axios from "axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";

const Pdrs = ({
  setSearchSport,
  setSearchCity,
  searchCity,
  searchSport,
  searchType,
  setSearchType,
  page,
  setPage,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchresults, setSearchresults] = useState(
    "Lancez une recherche avec au moins une ville !"
  );
  const [city, setCity] = useState("");
  const pagination = 30;
  const [nbResults, setNbResults] = useState();

  const [
    displayCopyClipboardMessage,
    setDisplayCopyClipboardMessage,
  ] = useState(false);

  useEffect(() => {
    if (searchCity) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const baseAPI = "https://bouge-api.herokuapp.com/v1.0";
          // city search
          const cityResponse = await axios.get(
            `${baseAPI}/city/name=${searchCity}`
          );
          const city = cityResponse.data;
          setCity(city);

          // search sport
          let sport;

          if (searchSport) {
            const sportResponse = await axios.get(
              `${baseAPI}/activity/name=${searchSport}`
            );
            sport = sportResponse.data[0];
            //console.log("sport =>", sport);
          }

          const results = await axios.get(
            `${baseAPI}/pdrs?city_id=${city.id}${
              sport ? "&macro_activity_id=" + sport.macro_activity_id : ""
            }&category=${searchType}&pagination=${pagination}&offset=${Math.ceil(
              page * pagination
            )}`
          );
          //console.log("results.data =>", results.data);

          // manage search results
          if (results.data.nb_results === 1) {
            setSearchresults({
              data: [results.data.data],
              nb_results: 1,
            });
            setNbResults(1);

            setIsLoading(false);
          } else {
            setSearchresults(results.data);
            setNbResults(results.data.nb_results);
            setIsLoading(false);
          }
        } catch (error) {
          setSearchresults(
            "Désolé, vos filtres de recherche ne donnent pas de résultat !"
          );
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [page, searchCity, searchSport, searchType]);

  useEffect(() => {
    if (displayCopyClipboardMessage) {
      setTimeout(() => {
        setDisplayCopyClipboardMessage(false);
      }, 3000);
    }
  }, [displayCopyClipboardMessage]);

  return (
    <main id="pdrs">
      {displayCopyClipboardMessage && (
        <div className="clipboard-message">
          <FontAwesomeIcon icon="check" className="icon-clipboard-message" />
          <p>Copié dans le presse-papiers</p>
        </div>
      )}
      <section>
        <SearchBar
          setSearchSport={setSearchSport}
          setSearchCity={setSearchCity}
          searchCity={searchCity}
          searchSport={searchSport}
          searchType={searchType}
          setSearchType={setSearchType}
          setPage={setPage}
        />
      </section>

      <section id="results">
        {isLoading ? (
          <div className="container no-results">
            <Loader type="Puff" color="#23D4CD" height={100} width={100} />
          </div>
        ) : typeof searchresults === "string" ? (
          <div className="container no-results">
            <h2>{searchresults}</h2>
          </div>
        ) : (
          <>
            <ReactPaginate
              pageCount={Math.ceil(nbResults / pagination)}
              pageRangeDisplayed={6}
              marginPagesDisplayed={2}
              onPageChange={(e) => {
                setPage(e.selected);
              }}
              //options
              initialPage={page}
              containerClassName={"pagination"}
              previousLabel={"précédent"}
              nextLabel={"suivant"}
              breakLabel={"..."}
              pageLinkClassName={"pageLinkClassName"}
              activeLinkClassName={"activeLinkClassName"}
              previousLinkClassName={"previousLinkClassName"}
              nextLinkClassName={"nextLinkClassName"}
              disabledClassName={"disabledClassName"}
            />
            <div className="container">
              <div className="results-list">
                {searchresults.data.map((pdrs) => {
                  return (
                    <LocationCard
                      {...pdrs}
                      key={pdrs.id}
                      setDisplayCopyClipboardMessage={
                        setDisplayCopyClipboardMessage
                      }
                    />
                  );
                })}
              </div>
              <div className="map">
                <Map {...searchresults} city={city} />
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Pdrs;
