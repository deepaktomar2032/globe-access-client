import { CountryData } from './country'

export type ImmigrationData = CountryData & {
  visaStatus: CountryData[]
}
