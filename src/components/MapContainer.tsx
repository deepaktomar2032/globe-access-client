import React, { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import Tooltip from 'src/components/Tooltip'
import { getAllCountryData } from 'src/service'
import { InitialCallResponse, CountryData } from 'src/types'
import worldMap from '../assets/world-110m.json'

interface MapContainerProps {
  visaFreeCountries: string[]
  selectedCountry: string
}

const MapContainer: React.FC<MapContainerProps> = ({ visaFreeCountries }) => {
  const [worldData, setWorldData] = useState<any[]>([])
  const [tooltipData, setTooltipData] = useState<{
    x: number
    y: number
    country: CountryData
  } | null>(null)

  // Fetch overall world information
  const fetchWorldInfo = async () => {
    try {
      const response: InitialCallResponse = await getAllCountryData()
      setWorldData(response.items)
    } catch (error) {
      console.error('Error fetching world info:', error)
    }
  }

  const getCountryInfoByIso = (isoNumericCode: string) => {
    return worldData.find((country: CountryData) => country.isoNumericCode === isoNumericCode) || null
  }

  useEffect(() => {
    fetchWorldInfo()
  }, [])

  return (
    <div>
      <ComposableMap>
        <Geographies geography={worldMap}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryInfo = getCountryInfoByIso(geo.id)

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={visaFreeCountries.includes(geo.id) ? '#90EE90' : '#FFFFFF'}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#2E8B57', outline: 'none' },
                    pressed: { fill: '#D6D6D6', outline: 'none' }
                  }}
                  stroke="#000"
                  strokeWidth={0.5}
                  onMouseEnter={(e) => {
                    if (countryInfo) {
                      setTooltipData({
                        x: e.clientX,
                        y: e.clientY,
                        country: countryInfo
                      })
                    }
                  }}
                  onMouseLeave={() => setTooltipData(null)}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>

      {tooltipData && <Tooltip tooltipData={tooltipData} />}
    </div>
  )
}

export default MapContainer
