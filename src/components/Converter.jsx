import { Input } from "antd";
import { SVY21 } from "./formula";
import { Button } from "antd";
import {
  CaretRightOutlined,
  CaretLeftOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { TextArea } = Input;
function Converter() {
  const Formula = new SVY21();

  const [latLong, setLatLong] = useState("");
  const [easNor, setEasNor] = useState("");

  function eastToLat(str) {
    if (str === "") {
      return;
    }
    const multiRows = str
      .split("\n")
      .map((item) => item.replaceAll(/\s+/g, ""))
      .filter((e) => e !== "");
    console.log(multiRows);
    let convertedLatlong = "";
    for (let row of multiRows) {
      const [east, north] = row.split(",");
      if (east === "" && north === "") continue;
      const { lat, lon } = Formula.computeLatLon(north, east);
      convertedLatlong += `${lat},${lon}\n`;
      setLatLong(convertedLatlong);
    }
  }

  function latToEast(str) {
    if (str === "") {
      return;
    }
    const multiRows = str
      .split("\n")
      .map((item) => item.replaceAll(/\s+/g, ""))
      .filter((e) => e !== "");
    let convertedEasNor = "";
    for (let row of multiRows) {
      const [lat, long] = row.split(",");
      if (lat === "" && long === "") continue;
      const { N, E } = Formula.computeSVY21(lat, long);
      convertedEasNor += `${E},${N}\n`;
      setEasNor(convertedEasNor);
    }
  }

  return (
    <div className="converter">
      <div className="textArea">
        <h2>Easting, Northing</h2>
        <TextArea
          rows={20}
          placeholder="Enter rows of easting and nothing values in the correct format here, eg. (12340.23,24210.34)"
          allowClear="true"
          onChange={(e) => setEasNor(e.target.value)}
          value={easNor}
        />
        <CopyOutlined onClick={() => navigator.clipboard.writeText(easNor)} />
      </div>
      <div className="butContainer">
        <Button
          className="button"
          type="primary"
          icon={<CaretRightOutlined />}
          size={"large"}
          onClick={() => eastToLat(easNor)}
        />
        <Button
          className="button"
          type="primary"
          icon={<CaretLeftOutlined />}
          size={"large"}
          onClick={() => latToEast(latLong)}
        />
      </div>
      <div className="textArea">
        <h2>Latitidue, Longitude</h2>
        <TextArea
          rows={20}
          placeholder="Enter rows of latidue and longitude values in the correct format here, eg. (1.235,103.692)"
          allowClear="true"
          onChange={(e) => setLatLong(e.target.value)}
          value={latLong}
        />
        <CopyOutlined onClick={() => navigator.clipboard.writeText(latLong)} />
      </div>
    </div>
  );
}
export default Converter;
