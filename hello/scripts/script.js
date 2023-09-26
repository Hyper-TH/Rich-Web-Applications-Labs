alert('Hello');


/* LOCAL STORAGE */
// Save
localStorage.setItem("lastname", "Doe");
// Load
document.getElementById("name").innerHTML = 
localStorage.getItem("lastname");


/* GEOLOCATION */
const showLocation = (pos) => {
    console.log(pos.coords.latitude, pos.coords.longitude);
};
const errorHander = (err) => {
    console.log(err);
};

() => {
    let geolocation = navigator.geolocation;
    geolocation.getCurrentPosition(showLocation, errorHander);
};


/* Websocket API */
let connecton = new WebSocket('ws://example.com/endpoint');

// When the connection is open, send some data to the server
connection.onopen = () => {
    connection.send('Ping');
};
// Handle errors
connection.onerror = (error) => {
    console.log('Websocket Error ' + error);
};
// Recieve asynchronous messages from the server
connection.onmessage = function (e) {
    console.log('Server: ' + e.data);
};