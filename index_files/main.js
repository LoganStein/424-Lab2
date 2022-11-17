function createMap() {
  function highlightFeature(e) {
    let layer = e.target;
    layer.setStyle({
      weight: 5,
      color: "#666",
      dashArray: "",
      fillOpacity: 1,
    });
  }

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  }

  function style(feature) {
    let colorScale = d3
      .scaleQuantize()
      .domain([0, 1000])
      .range(colorbrewer.YlOrRd[9]);
    return {
      fillColor: colorScale(feature.properties.density),
      fillOpacity: 0.5,
    };
  }

  let map = L.map("map").setView([37.8, -96], 4);
  let tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  let geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature,
  }).addTo(map);
}

function init() {
  createMap();
}

window.onload = init;
