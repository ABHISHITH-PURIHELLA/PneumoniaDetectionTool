import requests

# Define the Overpass API endpoint
overpass_url = "http://overpass-api.de/api/interpreter"

# Define the Overpass query
# This is a very simple query that looks for nodes tagged as "amenity=clinic" as an example.
# You would need to refine this query based on the specific tags that are relevant to diagnostic centers.
overpass_query = """
[out:json];
area["ISO3166-1"="US"][admin_level=2];
(node["amenity"="clinic"](area);
 way["amenity"="clinic"](area);
 rel["amenity"="clinic"](area);
);
out center;
"""

# Make the HTTP GET request to the Overpass API
response = requests.get(overpass_url, params={'data': overpass_query})
data = response.json()

# Extract and print diagnostic center names and their locations
for element in data['elements']:
    # Check if the element has a name and a position (latitude and longitude)
    if 'tags' in element and 'name' in element['tags'] and 'lat' in element and 'lon' in element:
        name = element['tags']['name']
        latitude = element['lat']
        longitude = element['lon']
        print(f"{name}: {latitude}, {longitude}")
