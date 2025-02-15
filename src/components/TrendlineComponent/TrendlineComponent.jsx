import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './TrendlineComponent.css';

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend
);

const TrendlineComponent = ({ temperatureData, seaLevelData, precipitationData}) => {

    const [ dataset, setDataset] = useState('temperatureData');

    if (!temperatureData || !seaLevelData || !precipitationData) {
        return <div>Loading...</div>;
    }

    const getData = () => {
        switch (dataset) {
            case 'temperatureData':
                return {
                    title: "Annual Mean Temperatures (1993-2023)",
                    labels: temperatureData.map((data) => data.Year), 
                    datasets: [
                        {
                            label: 'Mean Temperature (°C)',
                            data: temperatureData.map((data) => data.Annual_Temp_Mean), 
                            borderColor: 'rgb(206, 33, 33)', 
                            backgroundColor: 'rgba(206, 33, 33, 0.2)', 
                            fill: true
                        }
                    ],
                };
            case 'seaLevelData':
                return {
                    title: "Global Mean Sea Levels (1993-2023)",
                    labels: seaLevelData.map((data) => data.Year), 
                    datasets: [
                        {
                            label: 'Mean Sea Level (mm)',
                            data: seaLevelData.map((data) => data.Mean_Sea_Level), 
                            borderColor: 'rgba(75, 192, 192, 1)', 
                            backgroundColor: 'rgba(75, 192, 192, 0.2)', 
                            fill: true                        
                        }
                    ],
                };
            case 'precipitationData':
                return {
                    title: "Annual Total Precipitation in Indonesia (1993-2023)",
                    labels: precipitationData.map((data) => data.Year), 
                    datasets: [
                        {
                            label: 'Annual Total Precipitation (mm)',
                            data: precipitationData.map((data) => data.Annual_Precipitation), 
                            borderColor: 'rgb(58, 216, 37)', 
                            backgroundColor: 'rgba(58, 216, 37, 0.2)', 
                            fill: true
                        }
                    ],
                };
            default:
                return {};
        }
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: getData().title,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Year',
                },
            },
            y: {
                title: {
                    display: true,
                    text: dataset === 'seaLevelData' 
                        ? 'Mean Sea Level (mm)' 
                        : dataset === 'precipitationData' 
                        ? 'Annual Total Precipitation (mm)' 
                        : 'Temperature (°C)', //default
                },
            },
        },
    };

    return (
        <div>
            <div>
                <label>Select Dataset: </label>
                <select 
                    value={dataset} 
                    onChange={(e) => setDataset(e.target.value)}
                    style={{ padding: '5px', marginLeft: '10px' }} >
                    <option value="temperatureData">Temperature</option>
                    <option value="seaLevelData">Sea Level</option>
                    <option value="precipitationData">Annual Precipitation</option>
                </select>
            </div>
            <Line style={{marginTop: '10px'}} data={getData()} options={options} />
        </div>
    );
};

export default TrendlineComponent;