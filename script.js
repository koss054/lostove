const map = L.map('map');
const geolocation = navigator.geolocation;

geolocation.getCurrentPosition(function success(result) {
    const latLng = L.latLng(result.coords.latitude, result.coords.longitude);
    map.setView(latLng, 15);
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
