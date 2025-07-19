const API = 'https://ТВОЙ-БЭКЕНД-URL/places';

const map = L.map('map').setView([55.75, 37.61], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let tempLatLng = null;
map.on('click', e => {
  tempLatLng = e.latlng;
  document.getElementById('form-container').classList.remove('hidden');
});

document.getElementById('cancel').onclick = () => {
  document.getElementById('form-container').classList.add('hidden');
};

document.getElementById('save-place').onclick = async () => {
  const name = document.getElementById('place-name').value;
  const desc = document.getElementById('place-desc').value;
  const rating = +document.getElementById('place-rating').value;

  const place = { name, desc, rating, lat: tempLatLng.lat, lng: tempLatLng.lng };
  await fetch(API, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(place)
  });
  addMarker(place);
  document.getElementById('form-container').classList.add('hidden');
};

function addMarker(place) {
  const stars = '★'.repeat(place.rating) + '☆'.repeat(5 - place.rating);
  L.marker([place.lat, place.lng])
    .addTo(map)
    .bindPopup(`<b>${place.name}</b><br>${place.desc}<br>Оценка: ${stars}`);
}

async function loadPlaces() {
  const res = await fetch(API);
  const places = await res.json();
  places.forEach(addMarker);
}

loadPlaces();
