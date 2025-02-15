import React from 'react';
import { WiRain } from 'react-icons/wi';
import './PrecipitationTile.css';

const PrecipitationTile = ({ header, year, precipitation }) => {  
    return (
        <div className="tile">
            <div className="top">
                <h1>{header}</h1>
            </div>
            <div className="bottom">
                <WiRain className="rain-icon"/>
                <div className="tile-text">
                    <div className="precipitation">{precipitation} mm</div>
                    <div className="desc">of Precipitation in {year}</div>
                </div>
            </div>            
        </div>
    );
};
  
export default PrecipitationTile;