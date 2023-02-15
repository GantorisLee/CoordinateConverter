import GoogleMapReact from "google-map-react";

const Map = ({ zoom, locations, isConverted }) => {
  const markers = locations.map((location, index) => (
    <Marker key={index} lat={location.lat} lng={location.lng} />
  ));

  return (
    <div style={{ height: "700px", width: "90%", padding: "2rem 0 2rem 0" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        }}
        center={
          isConverted
            ? { lat: locations[0].lat, lng: locations[0].lng }
            : { lat: 1.3361954206928641, lng: 103.87642865465838 }
        }
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
};

// const Marker = () => <div className="marker" />;
const Marker = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="#FF0000"
      d="M12,0C7.584,0,3.758,2.005,1.196,5.459C-0.305,8.038-0.304,11.287,1.196,13.862L11.535,24l10.34-10.138
  C24.306,11.287,24.305,8.038,22.804,5.459C20.242,2.005,16.416,0,12,0z M12,18.985c-3.584,0-6.491-2.906-6.491-6.491
  c0-3.585,2.907-6.492,6.491-6.492s6.491,2.907,6.491,6.492C18.491,16.079,15.584,18.985,12,18.985z"
    />
  </svg>
);

export default Map;
