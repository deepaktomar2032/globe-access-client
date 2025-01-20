import React from 'react'
import { CountryData } from 'src/types'

const Tooltip: React.FC<{
  tooltipData: {
    x: number
    y: number
    country: CountryData
  }
}> = ({ tooltipData }) => {
  const { x, y, country } = tooltipData

  return (
    <div
      style={{
        position: 'absolute',
        top: y + 10,
        left: x + 10,
        background: '#FFFFFF',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        pointerEvents: 'none',
        zIndex: 1000
      }}
    >
      <strong>Country Name:</strong> {country.countryName} <br />
      <strong>Capital:</strong> {country.capital} <br />
      <strong>Currency:</strong> {country.currency.currencyName} ({country.currency.currencySymbol}) <br />
      <strong>Language:</strong> {country.language.languageName} <br />
      <img
        src={country.flag}
        alt={`${country.countryName} flag`}
        style={{ width: '50px', height: '30px', marginTop: '5px' }}
      />
    </div>
  )
}

export default Tooltip
