import React, { useState, useEffect } from "react";
import "./App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    withRouter,
} from "react-router-dom";

// Containers
import Home from "./containers/Home";
import Contact from "./containers/Contact";
import Pdrs from "./containers/Pdrs";
import PdrsId from "./containers/PdrsId";
import Commerçant from "./containers/Commercant";
import CityListens from "./containers/CityListens";
import Update from "./containers/Update";
import CreateActivity from "./containers/CreateActivity";
import SportActor from "./containers/SportActor";

// Components

import Header from "./components/Header";
import Footer from "./components/Footer";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faHeart,
    faChevronRight,
    faAngleDown,
    faSearch,
    faLightbulb,
    faPersonBooth,
    faShower,
    faWheelchair,
    faAsterisk,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
library.add(
    faHeart,
    faChevronRight,
    faAngleDown,
    faSearch,
    faLightbulb,
    faPersonBooth,
    faShower,
    faWheelchair,
    faAsterisk,
    faCheck
);

const _ScrollToTop = (props) => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return props.children;
};
const ScrollToTop = withRouter(_ScrollToTop);

function App() {
    const [showPopup, setShowPopup] = useState(false);

    const [url, setUrl] = useState("");

    // manage search queries
    const [searchCity, setSearchCity] = useState("");
    const [searchSport, setSearchSport] = useState("");
    const [searchType, setSearchType] = useState("ALL");
    const [page, setPage] = useState(0);

    return (
        <Router>
            <ScrollToTop>
                <Header
                    showPopup={showPopup}
                    setShowPopup={setShowPopup}
                    url={url}
                    setUrl={setUrl}
                />
                <Switch>
                    <Route path="/pdrs/:id">
                        <PdrsId />
                    </Route>

                    <Route path="/pdrs">
                        <Pdrs
                            setSearchSport={setSearchSport}
                            setSearchCity={setSearchCity}
                            searchCity={searchCity}
                            searchSport={searchSport}
                            setSearchType={setSearchType}
                            searchType={searchType}
                            page={page}
                            setPage={setPage}
                        />
                    </Route>

                    <Route path="/commercant">
                        <Commerçant />
                    </Route>

                    <Route path="/creer-une-activite">
                        <CreateActivity />
                    </Route>

                    <Route path="/contact">
                        <Contact />
                    </Route>

                    <Route path="/city-listens">
                        <CityListens />
                    </Route>

                    <Route path="/sport-actor">
                        <SportActor />
                    </Route>

                    <Route path="/update">
                        <Update />
                    </Route>

                    {/*keep home page last route*/}
                    <Route path="/">
                        <Home
                            setSearchSport={setSearchSport}
                            setSearchCity={setSearchCity}
                            searchCity={searchCity}
                            searchSport={searchSport}
                            setSearchType={setSearchType}
                            searchType={searchType}
                            page={page}
                            setPage={setPage}
                        />
                    </Route>
                </Switch>
                <Footer />
            </ScrollToTop>
        </Router>
    );
}

export default App;
