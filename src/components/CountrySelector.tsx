import React, { useState } from "react";
import axios from "axios";
import countries from "../assets/country.json";

interface CountrySelectorProps {
    setVisaFreeCountries: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
    selectedCountry: string;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ setVisaFreeCountries, setSelectedCountry, selectedCountry }) => {
    const [loading, setLoading] = useState(false);

    const fetchVisaFreeCountries = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_VISA_FREE_BASE_URL}/country?countryName=${selectedCountry}&isoAlpha2Code=${selectedCountry}`,
                { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
            );

            const visaArray = response.data.visaStatus.map((item: any) => item.isoNumericCode);
            setVisaFreeCountries(visaArray || []);
        } catch (error) {
            console.error("Error fetching visa-free countries", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <label>Select Your Country: </label>
            <select onChange={(e) => setSelectedCountry(e.target.value)} value={selectedCountry}>
                <option value="">-- Select --</option>
                {countries.map((country) => (
                    <option key={country.isoAlpha2Code} value={country.isoAlpha2Code}>
                        {country.countryName}
                    </option>
                ))}
            </select>
            <button onClick={fetchVisaFreeCountries} disabled={loading || !selectedCountry}>
                {loading ? "Loading..." : "Check Visa-Free Countries"}
            </button>
        </div>
    );
};

export default CountrySelector;
