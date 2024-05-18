document.addEventListener("DOMContentLoaded", async function() {
    const token = localStorage.getItem('token');
    if (!token) {
        // Token not found, redirect to login page
        window.location.href = '/login.html';
        return;
    }

    const messageLog = document.getElementById('messageLog');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    // Fetch chat log from backend
    const urlParams = new URLSearchParams(window.location.search);
    const friendId = urlParams.get('friendId');
    const response = await fetch(`http://localhost:3000/contacts/${friendId}/chat`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const chatLog = await response.json();
    chatLog.forEach(message => {
        console.log(message)
        addReceivedMessage(message.content, message.postedbyname, message.postedtime);
    });

    // Function to add received messages to the message log
    function addReceivedMessage(content, postedBy, postedtime) {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${postedBy}: ${content} \br ${postedtime}`;
        messageLog.appendChild(messageElement);
        messageLog.scrollTop = messageLog.scrollHeight;
    }

    // Event listener for sending messages
    sendButton.addEventListener('click', async () => {
        const message = messageInput.value.trim();
        if (message) {
            try {
                const sendMessageResponse = await fetch(`http://localhost:3000/contacts/${friendId}/chat`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: message })
                });
                const sendMessageResult = await sendMessageResponse.json();
                console.log(sendMessageResult);
                if (sendMessageResult === 'Posted Successfully') {
                    // Add sent message to message log
                    const messageElement = document.createElement('div');
                    messageElement.textContent = `You: ${message}`;
                    messageLog.appendChild(messageElement);
                    messageLog.scrollTop = messageLog.scrollHeight;

                    // Clear input box
                    messageInput.value = '';
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