import Converter from "./components/Converter";
import Map from "./components/Map";
import "./style.css";
import "./components/compoStyle.css";
import BackGround from "./components/BackGround";
import { Tabs } from "antd";
import TwoWayConverter from "./components/TwoWayConverter";
function App() {
  return (
    <div className="container">
      <BackGround />
      <Map />
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: `Tab 1`,
            key: "1",
            children: <Converter />,
          },
          {
            label: `Tab 2`,
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
