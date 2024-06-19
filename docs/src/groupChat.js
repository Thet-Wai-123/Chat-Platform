import {
  initializeSocket,
  setupSocketListeners,
  fetchChatLog,
  addNewMessageToScreen,
} from './chat.js';

const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get('groupId');
const token = localStorage.getItem('token');

if (!token) {
  // Token not found, redirect to login page
  window.location.href = '/login.html';
}

const socket = initializeSocket(token, groupId);
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
    `https://chat-platform-irz7.onrender.com/contacts/group/${groupId}/chat`,
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

  sendButton.addEventListener('click', async () => {
    const message = messageInput.value.trim();
    if (message) {
      await fetch(`https://chat-platform-irz7.onrender.com/contacts/group/${groupId}/chat`, {
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
      socket.emit('send-message', 'group' + groupId, message);
    }
  });

  const addUserInput = document.getElementById('addUserInput');
  const addUserButton = document.getElementById('addUserButton');

  addUserButton.addEventListener('click', async () => {
    const userToAdd = addUserInput.value.trim();
    if (userToAdd) {
      const response = await fetch(`https://chat-platform-irz7.onrender.com/contacts/group/${groupId}/addUser`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userToAdd: userToAdd }),
      });
      if (response.status != 200){
        console.log("User not found")
      }
    }

  });
});
