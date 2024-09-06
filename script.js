const map = L.map('map');
const geolocation = navigator.geolocation;
const addToggle = document.getElementById('add-toggle');
let addToggled = false;

geolocation.getCurrentPosition(function success(result) {
    const latLng = L.latLng(result.coords.latitude, result.coords.longitude);
    map.setView(latLng, 15);
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

function onMarkerClick(e) {
    console.log(e);
}

function onMapClick(e) {
    console.log(e.latlng);

    if (!addToggled) return;

    const markerOptions = {
        title: 'Test Title',
        riseOnHover: true,
    };

    const marker = L.marker(e.latlng, markerOptions)
        .on('click', onMarkerClick)
        .addTo(map);
}

function onAddToggleClick(e) {
    console.log(e.target);

    if (addToggled) {
        e.target.textContent = 'ADD';
        e.target.classList.remove('toggled');
    } else {
        e.target.textContent = 'ADDING';
        e.target.classList.add('toggled');
    }

    addToggled = !addToggled;
}

map.on('click', onMapClick);
addToggle.addEventListener('click', onAddToggleClick);
