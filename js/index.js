$(document).ready(function() {
    // Mapbox Token
    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9yeW5lYWxvbiIsImEiOiJQSkZ2NU9nIn0.8i2jsHIQQBU4lDdv3emAbQ';

    // Loads the Map
    var map = new mapboxgl.Map({
    center: [17.2283, 26.3351],
    zoom: 2,
    container: 'map', // container id
    style: 'mapbox://styles/rorynealon/cjen87w0y835b2rmye6p1m57k' // replace this with your style URL
    });

    $.getJSON('https://api.acleddata.com/acled/read?country=Libya', function(acled) {
        //data is the JSON string
        // console.log(acled.data)
        var jsonFeatures = [];

        acled.data.forEach(function(point){
            var lat = point.latitude;
            var lon = point.longitude;
            var feature = {type: 'Feature',
                    properties: point,
                    geometry: {
                        type: 'Point',
                        coordinates: [lon,lat]
                    }
            };
        
            jsonFeatures.push(feature);
        });
        
        var acledData = { type: 'FeatureCollection', features: jsonFeatures };
        console.log(acledData)


    // Mapbox JS
    map.on('load', function() {
        map.fitBounds([[9.31940084152, 19.20047],[25.16482, 33.58599575457]]);
        map.addSource('acledData', {
        "type": "geojson",
        //"data": "acledData.geojson"
        "data": acledData
        }),

    map.addLayer({
        id: 'acledData-heat',
        source: 'acledData',
        type: 'heatmap',
        paint: {
            'heatmap-radius': 25
        }
    });
    });
    console.log(acledData)

});
});
