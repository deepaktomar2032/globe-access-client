import { useState } from "react";
import MapContainer from "./components/MapContainer";
import CountrySelector from "./components/CountrySelector";
import "./App.css";

function App() {
    const [visaFreeCountries, setVisaFreeCountries] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>("");

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Visa-Free Countries Map</h1>
            <CountrySelector setVisaFreeCountries={setVisaFreeCountries} setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry} />
            <MapContainer visaFreeCountries={visaFreeCountries} selectedCountry={selectedCountry} />
        </div>
    );
}

export default App;
