
//w3szOS90YFmCi3SdOpPxeeoHkecId1WN7bRZmZRDuvg
// 3624fb03238440b180cb4473a5afce37 - hereApiKey
// ctEzMqC9mv78aFYIAeBc

const axios = require('axios'); /// JS library to make HTTP requests to server to retrieve data

//Formula to calculate the distance using difference in latitude and longitude
//Used here to sort the list of centers by distance ---- ******Showing the centers that are close to your Area******

const haversine = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;
  
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
    return R * c; // in meters
  };
  
  const attachDiagnosticRoutes = (app) => {
  app.post('/search-clinics', async (req, res) => {
    const { areaCode } = req.body;
    try {
      const hereApiKey = '3624fb03238440b180cb4473a5afce37';
      const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json`;
      
      // Gather the Area coordinates using the parameters below ---- Retrieving the data(GET operation)
      const geoResponse = await axios.get(geocodeUrl, {
        params: {
          q: areaCode,
          key: hereApiKey,
          countrycode: 'us',
          language: 'en',
          pretty: 1
        }
      });
      if (geoResponse.data.total_results === 0) {
        // Returns this message if there is no info about the area code
        return res.status(404).json({ message: 'No geographic coordinates found for the provided area code.' });
      }

      //Sending the data to overpass API and using the amenity = clinic condition to get details of only clinics
  
      const { lat, lng } = geoResponse.data.results[0].geometry;
      const radius = 30 * 1609.34; // 30 miles in meters
      const overpassUrl = "http://overpass-api.de/api/interpreter";
      const overpassQuery = `
          [out:json][timeout:25];
          (
              node["amenity"="clinic"](around:${radius},${lat},${lng});
              way["amenity"="clinic"](around:${radius},${lat},${lng});
              rel["amenity"="clinic"](around:${radius},${lat},${lng});
          );
          out center;
      `;
  
      const response = await axios.get(overpassUrl, { params: { data: overpassQuery } });
      //res.json(response.data);
      //console.log(response.data);


      /******Filtering the data retrieved based on our Requirement*********/
      //Here we are filtering the data that mainly have the data for these sections and sorting them based on the distance.

      let clinicsData = response.data.elements.map(element => {
        const distance = haversine(lat, lng, element.lat, element.lon);
        return{
        name: element.tags?.name,
        houseNumber: element.tags?.['addr:housenumber'],
        street: element.tags?.['addr:street'],
        postcode: element.tags?.['addr:postcode'],
        city: element.tags?.['addr:city'],
        state: element.tags?.['addr:state'],
        email: element.tags?.email,
        phone: element.tags?.phone,
        website: element.tags?.website,
        openingHours: element.tags?.opening_hours,
        distance: distance};
      });
      clinicsData.sort((a, b) => a.distance - b.distance);
  
      res.json(clinicsData);
      
    } catch (error) {
      console.error('Error in API calls:', error);
      res.status(500).json({ message: 'Error fetching data' });
    }
  });
}

//Exporting it to server file to run it.

module.exports = attachDiagnosticRoutes;
  