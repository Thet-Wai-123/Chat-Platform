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

  return io('http://localhost:50000', options);
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
