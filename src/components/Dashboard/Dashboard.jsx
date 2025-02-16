import { Card, CardContent, Typography } from '@mui/material';
import { useGetList, Title } from 'react-admin';
import MapComponent from '../MapComponent/MapComponent';
import TrendlineComponent from '../TrendlineComponent/TrendlineComponent';
import BarGraphComponent from '../BarGraphComponent/BarGraphComponent';
import PrecipitationTile from '../PrecipitationTile/PrecipitationTile';
import './dashboard.css';

const Dashboard = () => {
    // data sources
    const { data: data_centers } = useGetList('indonesia_data_centers');
    const { data: cyclone_data } = useGetList('cyclone_data');
    const { data: temperatureData } = useGetList('temp_data');
    const { data: seaLevelData } = useGetList('sea_level_data');
    const { data: precipitationData } = useGetList('precipitation_data');
    const { data: monthlyPrecipitationData } = useGetList('monthly_precipitation_data');

    return(
        <div className="dashboard-container"> 
            <Title title="Climate Vulnerability of Indonesian Data Centers" 
                style={{
                    "font-size":"27px",
                    "margin-left":"10px",
                    "font-weight":"bold"
                }}
            />
            <div className="left-side-container">
                <Card id="MapContainer" className="map-card">
                    <CardContent className="card-content">
                        <h2>Data Centers in Indonesia</h2>
                        <p>Increased tropical storm frequency and rising sea levels put data centers at risk.</p>
                        <MapComponent dataCenterData={data_centers} cycloneData={cyclone_data} />
                    </CardContent>
                </Card>
                <div id="TilesContainer">
                    <Card className="precipitation-tile">
                        <CardContent className="card-content">
                            <PrecipitationTile header={"85 Years Ago"} year={1940} precipitation={2193}></PrecipitationTile>
                        </CardContent>
                    </Card>
                    <Card className="precipitation-tile">
                        <CardContent className="card-content">
                        <PrecipitationTile header={"Now"} year={2024} precipitation={3567}></PrecipitationTile>
                        </CardContent>
                    </Card>
                </div>
            </div>
                
            <div className="right-side-container">
                <Card id="TrendlineContainer" className="trendline-card">
                    <CardContent className="card-content">
                        <h2>Indonesia Over 30 Years (1993-2023)</h2>
                        <TrendlineComponent 
                            temperatureData={temperatureData} 
                            seaLevelData={seaLevelData}
                            precipitationData={precipitationData} />
                    </CardContent>
                </Card>
                <Card id="BarGraphContainer" className="bar-graph-card">
                    <CardContent className="card-content">
                        <h2> Monthly Precipitation in Indonesia (Average Over 30 Years)</h2>
                        <BarGraphComponent precipitationData={monthlyPrecipitationData} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
};

export default Dashboard;
