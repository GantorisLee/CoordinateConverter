import Converter from "./components/Converter";
import Map from "./components/Map";
import "./style.css";
import "./components/compoStyle.css";
import BackGround from "./components/BackGround";
function App() {
  return (
    <div className="container">
      <BackGround />
      <Map />
      <Converter />
    </div>
  );
}

export default App;
