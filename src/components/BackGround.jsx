import { Player } from "@lottiefiles/react-lottie-player";

function BackGround() {
  return (
    <>
      <img
        src={process.env.PUBLIC_URL + "logo.png"}
        alt="logo"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "300px",
          padding: "2rem",
        }}
      ></img>
      <Player
        autoplay
        loop
        src="https://assets1.lottiefiles.com/packages/lf20_06qof0oc.json"
        style={{ width: "100vw", position: "absolute", top: 0, zIndex: -1 }}
      ></Player>
    </>
  );
}

export default BackGround;
