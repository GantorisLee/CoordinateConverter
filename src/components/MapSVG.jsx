import { Player } from "@lottiefiles/react-lottie-player";
function MapSVG() {
  return (
    <div className="map">
      <Player
        autoplay
        loop
        src="https://assets1.lottiefiles.com/private_files/lf30_noclpt6t.json"
        style={{ width: "500px" }}
      ></Player>
    </div>
  );
}

export default MapSVG;
