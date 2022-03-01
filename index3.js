const wsUri = "wss://echo-ws-service.herokuapp.com";


const output = document.querySelector("#output");
const btnSend = document.querySelector(".chat-btn");


let websocket;

function writeToScreen(message) {
    let pre = document.createElement("p");
    pre.innerHTML = message;
    output.appendChild(pre);
}

window.onload = function() {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
    };
    websocket.onmessage = function(evt) {
      writeToScreen(
        `<span style="color: red;">Ответ от сервера: ${evt.data}</span>`
      );
    };
    };
  
  btnSend.addEventListener('click', () => {
    const inputValue = document.querySelector(".chat-input").value;
    if (inputValue.length == 0) {
      alert("Введите что-нибудь");
    } else {
      const message = inputValue;
      writeToScreen(`Ваше сообщение: ${inputValue}`);
      websocket.send(message);
    }
});


const btnGeo = document.querySelector(".chat-btn__geo");
const mapLink = document.querySelector("#map-link");

const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.latitude;

  status.textContent = `широта: ${latitude} *, долгота: ${longitude}`;

  const Geomap = mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.textContent = 'Ссылка на карту'
}

btnGeo.addEventListener('click', () => {
  mapLink.href = '';
  mapLink.textContent = '';

  if (!navigator.geolocation){
    status.textContent = 'Geolocation не потдерживается вашим брузером';
  }
  else {
    status.textContent = 'Определение местоположения_';
    navigator.geolocation.getCurrentPosition(success);
  }
});