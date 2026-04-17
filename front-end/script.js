const URL_FAVORITES = 'https://travel-favorites-abcd.onrender.com/favorites';
const URL_WISHLIST = 'https://travel-wishlist-efgh.onrender.com/wishlist';
const URL_VISITED = 'https://travel-visited-ijkl.onrender.com/visited';

let currentCountry = "";

async function searchCountry() {
    const name = document.getElementById('searchInput').value;
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const data = await res.json();
    
    if(data.status === 404) {
        document.getElementById('result').innerHTML = "<p>País no trobat</p>";
        return;
    }

    currentCountry = data[0].name.common;
    const flag = data[0].flags.svg;

    document.getElementById('result').innerHTML = `
        <h2>${currentCountry}</h2>
        <img src="${flag}" width="100">
        <br><br>
        <button onclick="sendToService('favorites')">Afegir a Favorites ⭐️</button>
        <button onclick="sendToService('wishlist')">Afegir a Wishlist 🗺️</button>
        <button onclick="sendToService('visited')">Marcar Visited ✈️</button>
    `;
}

async function sendToService(service) {
    let url = service === 'favorites' ? URL_FAVORITES : service === 'wishlist' ? URL_WISHLIST : URL_VISITED;
    
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: currentCountry })
    });
    alert(`${currentCountry} enviat a ${service}!`);
    getServiceData(service); // Actualitza la llista
}

async function getServiceData(service) {
    let url = service === 'favorites' ? URL_FAVORITES : service === 'wishlist' ? URL_WISHLIST : URL_VISITED;
    
    const res = await fetch(url);
    const data = await res.json();
    
    const list = document.getElementById(`${service}-list`);
    list.innerHTML = "";
    data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
}