import { Button } from "antd";
export default function KMLGenerator({ coordinates, isConverted }) {
  const handleDownload = () => {
    console.log(coordinates);
    const kml = generateKML(coordinates);
    const blob = new Blob([kml], {
      type: "application/vnd.google-earth.kml+xml",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "coordinates.kml";
    link.href = url;
    link.click();
  };

  const generateKML = (coordinates) => {
    let kml =
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<kml xmlns="http://www.opengis.net/kml/2.2">\n' +
      "  <Document>\n" +
      "    <name>Coordinates</name>\n" +
      "    <Style id='icon-1899-0288D1-labelson'>\n" +
      "      <IconStyle>\n" +
      "        <color>ffd18802</color>\n" +
      "        <scale>1</scale>\n" +
      "        <Icon>\n" +
      "          <href>https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png</href>\n" +
      "        </Icon>\n" +
      "        <hotSpot x='32' xunits='pixels' y='64' yunits='insetPixels'/>\n" +
      "      </IconStyle>\n" +
      "    </Style>\n";
    coordinates.forEach((coordinate, index) => {
      // const name = `${index + 1} N${coordinate.north} E${coordinate.east}`;

      // const name = `${coordinate.label} N${coordinate.north} E${coordinate.east} RL..${coordinate.lat}, ${coordinate.lon}\n`;
      console.log(coordinate.RL);
      let name;
      if (coordinate.RL) {
        name = `${coordinate.label} N${coordinate.north} E${coordinate.east} RL..${coordinate.RL}\n`;
      } else {
        name = `${coordinate.label} N${coordinate.north} E${coordinate.east} \n`;
      }
      const description = `<![CDATA[LATITUDE: ${coordinate.lat}<br>LONGITUDE: ${coordinate.lon}]]>`;
      const latitudeData = `        <Data name="LATITUDE">\n          <value>${coordinate.lat}</value>\n        </Data>\n`;
      const longitudeData = `        <Data name="LONGITUDE">\n          <value>${coordinate.lon}</value>\n        </Data>\n`;
      const extendedData = `      <ExtendedData>\n${latitudeData}${longitudeData}      </ExtendedData>\n`;
      const point = `      <Point>\n        <coordinates>${coordinate.lon},${coordinate.lat}</coordinates>\n      </Point>\n`;
      const placemark = `    <Placemark>\n      <name>${name}</name>\n      <description>${description}</description>\n      <styleUrl>#icon-1899-0288D1-labelson</styleUrl>\n${extendedData}${point}    </Placemark>\n`;
      kml += placemark;
    });

    kml += "  </Document>\n" + "</kml>";

    return kml;
  };

  return (
    <Button
      className="KMLButton"
      type="primary"
      size={"large"}
      onClick={handleDownload}
      disabled={!isConverted}
    >
      Download KML
    </Button>
  );
}
