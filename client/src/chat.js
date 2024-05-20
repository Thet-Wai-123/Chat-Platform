import { io } from 'socket.io-client';
//initialize stuffs from passed in parameters
const urlParams = new URLSearchParams(window.location.search);
const friendId = urlParams.get('friendId');
const token = localStorage.getItem('token');
if (!token) {
  // Token not found, redirect to login page
  window.location.href = '/login.html';
}

//set up socket and pass in the token so that the user may join a room with its own id
const socket = io('http://localhost:50000', {
  auth: {
    token: `${token}`
  }
}
);

socket.on('receive-message', async (room) => {
  const chatLog = await fetchChatLog(token);
  const newestMessage = chatLog[chatLog.length - 1];
  addReceivedMessage(
    newestMessage.content,
    newestMessage.postedbyname,
    newestMessage.postedtime
  );
});

document.addEventListener('DOMContentLoaded', async function () {
  // Fetch chat log from backend
  const chatLog = await fetchChatLog();
  chatLog.forEach((message) => {
    addReceivedMessage(
      message.content,
      message.postedbyname,
      message.postedtime
    );
  });

  const messageLog = document.getElementById('messageLog');
  const messageInput = document.getElementById('messageInput');
  const sendButton = document.getElementById('sendButton');

  // Event listener for sending messages
  sendButton.addEventListener('click', async () => {
    const message = messageInput.value.trim();
    if (message) {
      try {
        const sendMessageResponse = await fetch(
          `http://localhost:3000/contacts/${friendId}/chat`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }),
          }
        );
        const sendMessageResult = await sendMessageResponse.json();
        if (sendMessageResult === 'Posted Successfully') {
          messageLog.scrollTop = messageLog.scrollHeight;

          // Clear input box
          messageInput.value = '';

          //update message live
          socket.emit('send-message', friendId);
        } else {
          // Handle error posting message
          console.error('Error posting message:', sendMessageResult);
        }
      } catch (error) {
        console.error('Error posting message:', error);
      }
    }
  });
});

// Function to add received messages to the message log
function addReceivedMessage(content, postedBy, postedtime) {
  const messageElement = document.createElement('div');
  messageElement.textContent = `${postedBy}: ${content} \br ${postedtime}`;
  messageLog.appendChild(messageElement);
  messageLog.scrollTop = messageLog.scrollHeight;
}
async function fetchChatLog() {
  const response = await fetch(
    `http://localhost:3000/contacts/${friendId}/chat`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const chatLog = await response.json();
  return chatLog;
}
