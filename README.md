# globe-access-client

## Tech Stack:
-  Frontend: React using TypeScript

# The idea of this project is to create a frontend that shows users how the world appears to them.

-  Get a list of all countries & other necessary information (e.g. currency, language, capital, flag, phone code, etc.)
-  See the world through the eyes of people from different countries.


# Required ENV's
- REACT_APP_GLOBE_ACCESS_API_BASE_URL=http://localhost:3000/api/v1


# Run Project Locally
-  clone the project


# To install dependencies
-  `yarn install`


# To run project in development mode
-  `yarn start`
-  Open [http://localhost:8000] to view it in the browser


# To build project
-  `yarn build`
-  `cd build`
-  Run live server or any other server to serve the build folder
-  Open [http://localhost:8080] to view it in the browser


# Project Structure
-  src/
   -  components/
      -  MapContainer/ - map container component
      -  CountrySelector/ - country selector component
      -  Tooltip/ - tooltip component
   -  services/ - services for making API calls
   -  types/ - has all types/interfaces used through out the project
   -  utils/ - has common functionality used through out the project (constants etc..)
   -  assets/ - has all static assets like world json files and css
   -  App.tsx - entry point of the project