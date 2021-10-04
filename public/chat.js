const socket = io();
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
var person;

// To get the username while starting the application
window.onload = function () {
  person = prompt('Please enter your name');
  if (person != null) {
    alert('Welcome ' + person + ' You can now chat with your friends');
    document.getElementById('welcome').innerHTML =
      'Hello ' + person + '!!  Welcome to the Chat Application';
  }
};

// To get the message when the user clicks the send button
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', {
      handle: person,
      message: input.value,
    });
    input.value = '';
  }
});

// To append the messages in the window.
socket.on('chat message', function (msg) {
  var item = document.createElement('li');
  item.innerHTML = '<strong>' + msg.handle + ': </strong>' + msg.message;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
