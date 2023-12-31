import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useSearchParams } from "react-router-dom";

const Map = ({ setUserRefusal, location, setLocation, setLoading }) => {
  // const [location, setLocation] = useState(null);

  const [pickUpLocation, setPickUpLocation] = useState(null);

  const markerRef = useRef();
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const place = markerRef.current;

        if (place != null) {
          const { lat, lng } = place.getLatLng();

          setLocation({ lat, lng });
        }
      },
    }),
    []
  );

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("lngf"));

  useEffect(() => {
    if (searchParams.get("latitude")) {
      setLocation({
        lat: searchParams.get("latitude"),
        lng: searchParams.get("longitude"),
      });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => setUserRefusal("you must allow location to continue"),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }, []);
  console.log({ location });
  return (
    location && (
      <MapContainer
        className="min-h-screen w-full"
        center={location}
        whenReady={() => setLoading(false)}
        zoom={13}
        scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          ref={markerRef}
          draggable={true}
          className="h-[100px]"
          eventHandlers={eventHandlers}
          position={location}>
          <Popup>your salon location</Popup>
        </Marker>
      </MapContainer>
    )
  );
};

// function MyLocation({ markerRef, setLocation }) {
//   const map = useMapEvents({
//     click: (e) => {
//       setLocation(e.latlng);
//     },
//   });
//   return null;
// }

export default Map;
