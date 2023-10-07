import React, { useEffect, useState } from "react";
import Map from "../Map";
import { Paper } from "@mui/material";
import PlacesAutoComplete from "../components/PlacesAutoComplete";
import axios from "axios";
import PlaceMap from "../Map";

export const Home = () => {
  const [location, setLocation] = useState(null);
  const [userRefusal, setUserRefusal] = useState();
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [confirm,setConfrim]=useState(false)

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
  return (
    <div>
      <Paper>
        <PlacesAutoComplete />
      </Paper>
      <PlaceMap
        location={location}
        zoomControl={false}
        setLocation={setLocation}
        setUserRefusal={setUserRefusal}
      />
     
    </div>
  );
};
