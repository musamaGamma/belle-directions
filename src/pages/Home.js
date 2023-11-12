import React, { useEffect, useState } from "react";
import Map from "../Map";
import { Button, CircularProgress, Paper } from "@mui/material";
import PlacesAutoComplete from "../components/PlacesAutoComplete";
import axios from "axios";
import PlaceMap from "../Map";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [userRefusal, setUserRefusal] = useState();
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [confirm, setConfrim] = useState(false);

  useEffect(() => {
    // window.ReactNativeWebView.postMessage("hello world from directions api");
  });

  useEffect(() => {
    async function fetchLocations() {
      if (query === "") return setPlaces([]);
      const { data } = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&poly_geojson=0&addressdetails=1&countrycodes=SA`
      );

      console.log(data);
      setPlaces(data);
    }

    fetchLocations();
  }, [query]);

  const handleClick = () => {
    if (window.ReactNativeWebView) {
      // ensure window.ReactNativeWebView is there, otherwise, web app might crash if is not there
    }
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ location, clicked: true })
    );
  };
  return (
    <div>
      <Paper>{/* <PlacesAutoComplete /> */}</Paper>
      <PlaceMap
        location={location}
        zoomControl={false}
        setLoading={setLoading}
        setLocation={setLocation}
        setUserRefusal={setUserRefusal}
      />
      {userRefusal ? (
        <div className="  grid place-items-center min-h-screen">
          <p className="text-3xl  capitalize">
            please allow location to continue
          </p>
        </div>
      ) : loading ? (
        <div className="text-black  grid place-items-center min-h-screen">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        ""
      )}

      <Button
        id="location"
        className="absolute !capitalize !font-bold  !bg-black h-[48px]   bottom-24 z-[999999] left-[%50]"
        variant="contained"
        onClick={handleClick}>
        confirm location
      </Button>
    </div>
  );
};
//  npm start
