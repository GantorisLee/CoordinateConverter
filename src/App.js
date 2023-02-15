import Converter from "./components/Converter";
import MapSVG from "./components/MapSVG";
import "./style.css";
import "./components/compoStyle.css";
import BackGround from "./components/BackGround";
import { Tabs } from "antd";
import TwoWayConverter from "./components/TwoWayConverter";
function App() {
  return (
    <div className="container">
      <BackGround />
      <MapSVG />
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: `Main`,
            key: "1",
            children: <Converter />,
          },
          {
            label: `Two Way`,
            key: "2",
            children: <TwoWayConverter />,
          },
        ]}
      />
      {/* <Converter /> */}
    </div>
  );
}

export default App;
