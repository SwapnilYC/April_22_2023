// Store the Html elements
const latEl = document.getElementById('lat');
const longEl = document.getElementById('lon');
const tableEl = document.getElementById('allData');
const mapBox = document.getElementById('mapBox');


let latitude;
let longitude;
const apiKey = `08d38c5694fd7a8b0417ae5b6c7edacf`;

const z = function () {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    // Displaying lat and long in  section 1
    latEl.textContent = latitude;
    longEl.textContent = longitude;
    console.log('latitude: ', latitude, 'longitude: ', longitude);

    // display location on map
    const mapUrl = `https://www.google.com/maps/@${latitude},${longitude},15z`;
    mapBox.innerHTML = `<iframe src="${mapUrl}"></iframe>`

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
      .then((r) => r.json())
      .then((data) => {
        // following data should be added to the table as elements
        const html = `
        <tr>
        <td>Location:  ${data.name}</td>
        </tr>
        <tr>
        <td>Lat:  ${latitude}</td>
        <td>Long:  ${longitude}</td>
        </tr>
        <tr>
        <td>Timezone:  ${data.timezone}</td>
        </tr>
        <tr>
        <td>Wind Speed:  ${data.wind.speed}</td>
        </tr>
        <tr>
        <td>Humidity:  ${data.main.humidity}</td>
        </tr>
        <tr>
        <td>Wind Direction(in deg):  ${data.wind.deg}</td>
        </tr>
        <tr>
        <td>Pressure:  ${data.main.pressure}</td>
        </tr>
        <tr>
        <td>Feels Like:${data.main.feels_like}</td>
        </tr>
        `
        tableEl.innerHTML = html;
        console.log('open weather data: ', data)
      }).catch((err) => alert(err.message))
  }, () => {
    alert('Sorry could not locate your current Location 😒😒😒')
  })
}

z();
