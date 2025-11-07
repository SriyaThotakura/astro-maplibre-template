const fs = require('fs');
const path = require('path');

// Read the original GeoJSON file
const geojsonPath = path.join(__dirname, '..', 'public', 'data', '2015_street_tree_census.geojson');
const outputPath = path.join(__dirname, '..', 'public', 'data', '2015_street_tree_census_simplified.geojson');

console.log(`Reading GeoJSON from: ${geojsonPath}`);

// Read and parse the GeoJSON file
const geojson = JSON.parse(fs.readFileSync(geojsonPath, 'utf8'));

// Create a simplified version with only the first 1000 features
const simplified = {
  type: 'FeatureCollection',
  features: geojson.features.slice(0, 1000).map(feature => ({
    type: 'Feature',
    properties: {
      tree_id: feature.properties.tree_id,
      tree_dbh: feature.properties.tree_dbh,
      spc_common: feature.properties.spc_common,
      status: feature.properties.status,
      health: feature.properties.health,
      address: feature.properties.address
    },
    geometry: {
      type: 'Point',
      coordinates: feature.geometry.coordinates
    }
  }))
};

// Write the simplified GeoJSON to a new file
fs.writeFileSync(outputPath, JSON.stringify(simplified));
console.log(`Simplified GeoJSON written to: ${outputPath}`);
