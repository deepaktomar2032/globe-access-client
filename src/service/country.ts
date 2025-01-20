import apiClient from './apiClient'
import { InitialCallResponse, ImmigrationData } from 'src/types'

// Get All Country data
export const getAllCountryData = async (): Promise<InitialCallResponse> => {
  const response = await apiClient().get('/initial-call')
  return response.data
}

// Get Visa Free country data
export const getVisaFreeCountryData = async (selectedCountry: string): Promise<ImmigrationData> => {
  const response = await apiClient().get(`/country?countryName=${selectedCountry}&isoAlpha2Code=${selectedCountry}`)
  return response.data
}
