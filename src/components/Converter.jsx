import { Input } from "antd";
import { SVY21 } from "./formula";
import { Button } from "antd";
import {
  CaretRightOutlined,
  // CaretLeftOutlined,
  DownloadOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import KMLGenerator from "./KMLGenerator";
import Map from "./Map";
const { TextArea } = Input;
function Converter() {
  const Formula = new SVY21();

  const [latLong, setLatLong] = useState("");
  const [easNor, setEasNor] = useState("");

  const [coordinates, setCoordinates] = useState([]);
  const [isConverted, setIsConverted] = useState(false);

  function eastToLat(str) {
    if (str === "") {
      return;
    }
    const multiRows = str
      .split("\n")
      .map((item) => item.replaceAll(/\s+/g, ""))
      .filter((e) => e !== "");
    let convertedLatlng = "";
    let isInputCorrect = true;
    let coordinates = [];
    for (let row of multiRows) {
      const [label, north, east, RL] = row.split(",");
      console.log("RL: ", RL);
      // if (east === "" && north === "") continue;
      const { lat, lon } = Formula.computeLatLon(north, east);
      if (isNaN(lat) && isNaN(lon)) {
        alert(
          "Your input format is not correct, the format should be LABEL,NORTHING,EASTING,RL. e.g.(103,35375.333,32797.733,2.664)"
        );
        setIsConverted(false);
        break;
      }
      convertedLatlng += RL
        ? `${label} N${north} E${east} RL..${RL},${lat},${lon}\n`
        : `${label} N${north} E${east} ${lat},${lon}\n`;

      // convertedLatlng += `${label} N${north} E${east} RL..${RL},${lat},${lon}\n`;
      coordinates.push({
        label: label,
        lat: lat,
        lon: lon,
        RL: RL,
        north: north,
        east: east,
      });
    }
    isInputCorrect && setLatLong(convertedLatlng);
    setCoordinates(coordinates);
    setIsConverted(true);
  }

  function exportToCSV() {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "LABEL NORTHING EASTING RL,LATITUDE,LONGITUDE \n" +
      latLong.split(",");
    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  return (
    <div className="converter">
      <div className="easNorTextArea">
        <h2>LABEL,NORTHING,EASTING,RL</h2>
        <TextArea
          rows={20}
          placeholder="Enter rows of values in the format of 'Label,Northing,Easting,RL', e.g.(103,35375.333,32797.733,2.664)"
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
      </div>
      <div className="latLonTextArea">
        <h2>LABEL,NORTHING,EASTING,RL,LATITUDE,LONGITUDE</h2>
        <TextArea
          rows={20}
          // placeholder="Enter rows of values in the format of 'LABEL,NORTHING,EASTING,RL,LATITUDE,LONGITUDE', e.g.(103 N35375.333 E32797.733 RL..2.664,1.3128784785049925,103.899589588639)"
          allowClear="true"
          onChange={(e) => setLatLong(e.target.value)}
          value={latLong}
        />
        <CopyOutlined onClick={() => navigator.clipboard.writeText(latLong)} />

        <Button
          type="primary"
          icon={<DownloadOutlined />}
          size={"large"}
          onClick={exportToCSV}
          disabled={!latLong}
        >
          Export as CSV
        </Button>
      </div>

      <KMLGenerator coordinates={coordinates} isConverted={isConverted} />
      <Map
        center={{ lat: 40.712776, lng: -74.005974 }}
        zoom={10}
        locations={coordinates}
        isConverted={isConverted}
      />
    </div>
  );
}
export default Converter;
