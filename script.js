const map = L.map('map');
const geolocation = navigator.geolocation;
const addToggle = document.getElementById('add-toggle');
const lostPlaceholder = L.icon({
    iconUrl: 'images/placeholder.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [140, 37.5],
});

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
    if (!addToggled) return;

    const markerOptions = {
        title: 'Test Title',
        riseOnHover: true,
        icon: lostPlaceholder,
    };

    const marker = L.marker(e.latlng, markerOptions)
        .on('click', onMarkerClick)
        .addTo(map)
        .bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: 'popup-lostove',
            }),
        );
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
