import { io } from 'socket.io-client';

//pass in the JWT token and (optional) group id if it is a group chat socket
export function initializeSocket(token, groupId) {
  const options = {
    auth: {
      token: `${token}`,
    },
  };
  if (groupId) {
    options.query = { groupId: `${groupId}` };
  }

  const socket = io('https://chat-platform-irz7.onrender.com:443', options);

  // Debugging connection issues
  socket.on('connect', () => {
    console.log('Connected to the server');
  });

  socket.on('connect_error', (err) => {
    console.error('Connection error:', err.message);
  });

  return socket;
}


export function setupSocketListeners(socket, addNewMessageToScreen) {
  socket.on('receive-message', async (newMessageInfo) => {
    const { message, sendByName, sendTime } = newMessageInfo;
    addNewMessageToScreen(message, sendByName, sendTime);
  });
}

export async function fetchChatLog(url, token) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

export function formatTime(timestamp) {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'medium',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }).format(date);
}

export function addNewMessageToScreen(
  content,
  postedBy,
  postedTime,
  messageLogOnScreen
) {
  const formattedTime = formatTime(postedTime);
  const messageElement = document.createElement('div');
  messageElement.textContent = `${postedBy}: ${content} ${formattedTime}`;
  messageLogOnScreen.appendChild(messageElement);
  messageLogOnScreen.scrollTop = messageLogOnScreen.scrollHeight;
}
