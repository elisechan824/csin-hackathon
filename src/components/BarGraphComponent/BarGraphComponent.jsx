import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarGraphComponent = ({ precipitationData }) => {
    if (!precipitationData) {
        return <div>Loading...</div>;
    }

    const graphData = {
        labels: precipitationData.map((data) => data.Month),
        datasets: [
            {
                label: 'Monthly Precipitation (mm)',
                data: precipitationData.map((data) => data.Precipitation),
                backgroundColor: 'rgba(86, 201, 75, 0.7)',
                borderColor: 'rgba(86, 201, 75, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Monthly Precipitation In Indonesia (Average Over 30 Years)',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Precipitation (mm)',
                },
            },
        },
    };
    return (
        <div>
            <Bar data={graphData} options={options} />
        </div>
    );
};

export default BarGraphComponent;