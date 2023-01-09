import { Input } from "antd";
import { SVY21 } from "./formula";
import { Button } from "antd";
import {
  CaretRightOutlined,
  CaretLeftOutlined,
  // DownloadOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { TextArea } = Input;
function TwoWayConverter() {
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
      const [east, north] = row.split(",");
      // if (east === "" && north === "") continue;
      const { lat, lon } = Formula.computeLatLon(north, east);
      if (isNaN(lat) && isNaN(lon)) {
        alert(
          "Your input format is not correct, the format should be NORTHING,EASTING. e.g.(35375.333,32797.733)"
        );
        break;
      }
      convertedLatlong += `${lat},${lon}\n`;
    }
    setLatLong(convertedLatlong);
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
    let isInputCorrect = true;
    for (let row of multiRows) {
      const [lat, long] = row.split(",");
      const { N, E } = Formula.computeSVY21(lat, long);
      if (isNaN(N) && isNaN(E)) {
        alert(
          "Your input format is not correct, the format should be LATITUDE,LONGITUDE. e.g.(1.3128784785049925,103.899589588639)"
        );
        isInputCorrect = false;
        break;
      } else {
        convertedEasNor += `${E},${N}\n`;
      }
    }
    isInputCorrect && setEasNor(convertedEasNor);
  }

  // function exportToCSV() {
  //   const csvContent =
  //     "data:text/csv;charset=utf-8," +
  //     "LABEL NORTHING EASTING RL LATITUDE','LONGITUDE \n" +
  //     latLong.split(",").join(" ");
  //   const encodedUri = encodeURI(csvContent);
  //   window.open(encodedUri);
  // }

  return (
    <div className="converter">
      <div className="easNorTextArea_2">
        <h2>NORTHING,EASTING</h2>
        <TextArea
          rows={20}
          placeholder="Enter rows of values in the format of 'Northing,Easting', e.g.(35375.333,32797.733)"
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
      <div className="latLonTextArea_2">
        <h2>LATITUDE,LONGITUDE</h2>
        <TextArea
          rows={20}
          placeholder="Enter rows of easting and nothing values in the correct format here, eg. (12340.23,24210.34)"
          allowClear="true"
          onChange={(e) => setLatLong(e.target.value)}
          value={latLong}
        />
        <CopyOutlined onClick={() => navigator.clipboard.writeText(latLong)} />
        {/* {latLong !== "" && (
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            size={"large"}
            onClick={exportToCSV}
          >
            Export as CSV
          </Button>
        )} */}
      </div>
    </div>
  );
}
export default TwoWayConverter;
