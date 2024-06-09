import {
  initializeSocket,
  setupSocketListeners,
  fetchChatLog,
  addNewMessageToScreen,
} from './chat.js';

//initialize stuffs from passed in parameters
const urlParams = new URLSearchParams(window.location.search);
const friendId = urlParams.get('friendId');
const token = localStorage.getItem('token');

if (!token) {
  // Token not found, redirect to login page
  window.location.href = '/login.html';
}
const socket = initializeSocket(token);
setupSocketListeners(socket, (message, sendByName, sendTime) =>
  addNewMessageToScreen(
    message,
    sendByName,
    sendTime,
    document.getElementById('messageLog')
  )
);

document.addEventListener('DOMContentLoaded', async function () {
  const chatLog = await fetchChatLog(
    `http://localhost:3000/contacts/${friendId}/chat`,
    token
  );
  chatLog.forEach((message) => {
    addNewMessageToScreen(
      message.content,
      message.postedbyname,
      message.postedtime,
      document.getElementById('messageLog')
    );
  });

  const messageLog = document.getElementById('messageLog');
  const messageInput = document.getElementById('messageInput');
  const sendButton = document.getElementById('sendButton');

  // Event listener for sending messages
  sendButton.addEventListener('click', async () => {
    const message = messageInput.value.trim();
    if (message) {
      await fetch(`http://localhost:3000/contacts/${friendId}/chat`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message }),
      });
      messageLog.scrollTop = messageLog.scrollHeight;

      // Clear input box
      messageInput.value = '';
      //update message live
      var INTfriendId = Number(friendId); //needed to pass in as an INT cause socket differs between string and int
      socket.emit('send-message', INTfriendId, message);
    }
  });
});
