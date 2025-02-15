import './MapComponent.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import "leaflet.heat";
import { useState, useEffect, useRef } from 'react';

const HeatmapLayer = ({ heatmapData, showHeatmap }) => {
  const map = useMap();
  const heatmapLayerRef = useRef(null);

  useEffect(() => {
    if (showHeatmap && heatmapData) {
      const heatData = heatmapData
        .filter((data) => data.Latitude && data.Longitude)
        .map((data) => [
          data.Latitude, 
          data.Longitude, 
        (parseInt(data.Value)/2)|| 2
        ]);
      heatmapLayerRef.current = L.heatLayer(heatData, {
        radius: 25,
        blur: 15,
        maxZoom: 10,
      }).addTo(map);
    } else {
      if (heatmapLayerRef.current) {
        map.removeLayer(heatmapLayerRef.current);
      }
    }

    return () => {
      if (heatmapLayerRef.current) {
        map.removeLayer(heatmapLayerRef.current);
      }
    };
  }, [map, showHeatmap, heatmapData]);
  return null;
};

const MapComponent = ({ dataCenterData, cycloneData }) => {
  const [showDCHeatMap, setShowDCHeatmap] = useState(false);
  const [showCycloneHeatMap, setShowCycloneHeatMap] = useState(false);
  const [showRemainingDC, setShowRemainingDC] = useState(false);

  // Data centers above 2300 sea level of 15m
  const displayDataCenters = showRemainingDC 
    ? dataCenterData.filter(data => parseFloat(data.Elevation) > 15) 
    : dataCenterData;

  console.log(displayDataCenters);

  return (
    <div id="layers-control" >
      <div className='layers-toggle'>
        <label id="dc-heatmap-layer">
          <input
            type="checkbox"
            checked={showDCHeatMap}
            onChange={() => {
              setShowDCHeatmap(!showDCHeatMap);
              setShowRemainingDC(false);
            }}
          />
          Density of data centers
        </label><br/>
        <label>
          <input
            type="checkbox"
            checked={showCycloneHeatMap}
            onChange={() => {
              setShowCycloneHeatMap(!showCycloneHeatMap);
              setShowDCHeatmap(false);
            }}
          />
          Areas affected by cyclones (based on wind speeds)
        </label> <br/>
        <label>
          <input
            type="checkbox"
            checked={showRemainingDC}
            onChange={() => {
              setShowRemainingDC(!showRemainingDC)
            }}
          />
          Data centers above sea level in 2300 (sea level: +15 m)
        </label>
      </div>
      <MapContainer
        className="map-container"
        center={[-6.1754, 106.8272]} // jakarta coordinate
        zoom={4}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* data center markers */}
        {displayDataCenters?.map((data_center) => (
          <Marker key={data_center.id} position={[data_center.Latitude, data_center.Longitude]}>
            <Popup>
              <b>Data Center Name: {data_center.Name}</b> <br /> 
              Energy Consumption (in megawatts): {data_center.Energy ? data_center.Energy : "N/A"}
            </Popup>
          </Marker>
        ))}

        {/* heat map layer */}
        <HeatmapLayer heatmapData={dataCenterData} showHeatmap={showDCHeatMap} />
        <HeatmapLayer heatmapData={cycloneData} showHeatmap={showCycloneHeatMap} />

      </MapContainer>
    </div>
    
    )
};

export default MapComponent;