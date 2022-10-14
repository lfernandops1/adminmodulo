import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  GeoJSON,
} from "react-leaflet";
// import countries from "./countries.json";
import countries from "./geojs-100-mun.json";

// const data: GeoJSON.Feature = {
//   type: "Feature",
//   geometry: {
//     type: "Point",
//     coordinates: [125.6, 10.1],
//   },
//   properties: {},
// };

export default function Map() {
  return (
    <div>
      <p>i</p>

      <MapContainer
        // center={[-35.6172994394, -9.4692533354]}
        zoom={1}
        style={{ height: "80vh" }}
      >
        <GeoJSON
          style={{
            fillColor: "#EBEBEB",
            fillOpacity: 1,
            // color: '#717171',
            weight: 0.5,
            stroke: true,
            color: "#000000",
            // border: '1px solid #dddd'
          }}
          data={countries.features}
        >
          <Marker position={[-9.648139, -35.717239]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </GeoJSON>
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
}
