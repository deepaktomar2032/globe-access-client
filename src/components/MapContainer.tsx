import React, { useState, useEffect } from "react";
import axios from "axios";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import worldMap from "../assets/world-110m.json";
import Tooltip from "./Tooltip";

interface MapContainerProps {
    visaFreeCountries: string[];
    selectedCountry: string;
}

const MapContainer: React.FC<MapContainerProps> = ({ visaFreeCountries, selectedCountry }) => {
    const [worldData, setWorldData] = useState<any[]>([]);
    const [tooltipData, setTooltipData] = useState<{
        x: number;
        y: number;
        country: any;
    } | null>(null);

    // Fetch overall world information
    const fetchWorldInfo = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_VISA_FREE_BASE_URL}/initial-call`, {
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            });
            setWorldData(response.data.items);
        } catch (error) {
            console.error("Error fetching world info:", error);
        }
    };

    const getCountryInfoByIso = (isoNumericCode: string) => {
        return worldData.find((country: any) => country.isoNumericCode === isoNumericCode) || null;
    };

    useEffect(() => {
        fetchWorldInfo();
    }, []);

    return (
        <div>
            <ComposableMap>
                <Geographies geography={worldMap}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const countryInfo = getCountryInfoByIso(geo.id);

                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={visaFreeCountries.includes(geo.id) ? "#90EE90" : "#FFFFFF"}
                                    style={{
                                        default: { outline: "none" },
                                        hover: { fill: "#2E8B57", outline: "none" },
                                        pressed: { fill: "#D6D6D6", outline: "none" },
                                    }}
                                    stroke="#000"
                                    strokeWidth={0.5}
                                    onMouseEnter={(e) => {
                                        if (countryInfo) {
                                            setTooltipData({
                                                x: e.clientX,
                                                y: e.clientY,
                                                country: countryInfo,
                                            });
                                        }
                                    }}
                                    onMouseLeave={() => setTooltipData(null)}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>

            {tooltipData && <Tooltip tooltipData={tooltipData} />}
        </div>
    );
};

export default MapContainer;
