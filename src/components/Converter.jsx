import { Input } from "antd";
import { SVY21 } from "./formula";
import { Button } from "antd";
import {
  CaretRightOutlined,
  CaretLeftOutlined,
  DownloadOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { TextArea } = Input;
function Converter() {
  const Formula = new SVY21();

  const [latLong, setLatLong] = useState("");
  const [easNor, setEasNor] = useState("");

  function eastToLat(str) {
    console.log(str);
    if (str === "") {
      return;
    }
    const multiRows = str
      .split("\n")
      .map((item) => item.replaceAll(/\s+/g, ""))
      .filter((e) => e !== "");
    let convertedLatlong = "";
    for (let row of multiRows) {
      const [label, east, north, RL] = row.split(",");
      // if (east === "" && north === "") continue;
      const { lat, lon } = Formula.computeLatLon(north, east);
      if (isNaN(lat) && isNaN(lon)) {
        alert(
          "Your input format is not correct, the format should be LABEL,NORTHING,EASTING,RL. e.g.(103,35375.333,32797.733,2.664)"
        );
      }
      convertedLatlong += `${label} N${north} E${east} RL..${RL},${lat},${lon}\n`;
    }
    setLatLong(convertedLatlong);
  }

  function latToEast(str) {
    if (str === "") {
      return;
    }
    const multiRows = str
      .split("\n")
      // .map((item) => item.replaceAll(/\s+/g, ""))
      .filter((e) => e !== "");
    let convertedEasNor = "";
    for (let row of multiRows) {
      console.log(row.split(" "));
      const lat = row.split(",")[1];
      const long = row.split(",")[2];
      const { N, E } = Formula.computeSVY21(lat, long);
      if (isNaN(N) && isNaN(E)) {
        alert(
          "Your input format is not correct, the format should be LABEL,NORTHING,EASTING,RL,LATITUDE,LONGITUDE. e.g.(103 N35375.333 E32797.733 RL..2.664,1.3128784785049925,103.899589588639)"
        );
      } else {
        convertedEasNor += `${E},${N}\n`;
      }
    }
    setEasNor(convertedEasNor);
  }

  function exportToCSV() {
    // const test = latLong;
    // console.log(test);
    // console.log(test.split(","));
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "LABEL NORTHING EASTING RL LATITUDE LONGITUDE \n" +
      latLong.split(",").join(" ");
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
        {/* <Button
          className="button"
          type="primary"
          icon={<CaretLeftOutlined />}
          size={"large"}
          onClick={() => latToEast(latLong)}
        /> */}
      </div>
      <div className="latLonTextArea">
        <h2>LABEL,NORTHING,EASTING,RL,LATITUDE,LONGITUDE</h2>
        <TextArea
          rows={20}
          placeholder="Enter rows of values in the format of 'LABEL,NORTHING,EASTING,RL,LATITUDE,LONGITUDE', e.g.(103 N35375.333 E32797.733 RL..2.664,1.3128784785049925,103.899589588639)"
          allowClear="true"
          onChange={(e) => setLatLong(e.target.value)}
          value={latLong}
        />
        <CopyOutlined onClick={() => navigator.clipboard.writeText(latLong)} />
        {latLong !== "" && (
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            size={"large"}
            onClick={exportToCSV}
          >
            Export as CSV
          </Button>
        )}
      </div>
    </div>
  );
}
export default Converter;
