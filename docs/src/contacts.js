document.addEventListener('DOMContentLoaded', async function () {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login.html';
  }

  //fetch friend and friend requests
  var [friendsResponse, friendRequestsResponse, groupsResponse] =
    await Promise.all([
      fetch('https://chat-platform-irz7.onrender.com/contacts/friends', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      fetch('https://chat-platform-irz7.onrender.com/contacts/friend_requests/inbox/GET', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      fetch('https://chat-platform-irz7.onrender.com/contacts/group/GET', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

  // Display the list of friends on the page
  const friends = await friendsResponse.json();
  const friendsListContainer = document.getElementById('friendsList');
  friends.forEach((friend) => {
    const friendElement = document.createElement('button');
    friendElement.textContent = `${friend.friend_name}`;
    friendElement.addEventListener('click', () => {
      // Redirect to chat.html with friend's ID as a query parameter
      window.location.href = `friendChat.html?friendId=${friend.to_user}`;
    });
    friendsListContainer.appendChild(friendElement);
  });

  //Display list of friendRequests on the page
  const friendRequests = await friendRequestsResponse.json();
  const friendRequestsList = document.getElementById('friendRequestsList');
  friendRequests.forEach((friendRequest) => {
    const requestElement = document.createElement('div');
    requestElement.textContent = `${friendRequest.name}`;
    const acceptButton = document.createElement('button');
    acceptButton.classList = 'acceptRequestButton';
    acceptButton.textContent = 'Accept';
    friendRequestsList.appendChild(requestElement);
    friendRequestsList.appendChild(acceptButton);

    acceptButton.addEventListener('click', async () => {
      await fetch(
        `https://chat-platform-irz7.onrender.com/contacts/friend_requests/inbox/ACCEPT/${friendRequest.sender_id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    });
  });

  document
    .getElementById('sendRequestButton')
    .addEventListener('click', async () => {
      const newFriendInput = document.getElementById('newFriend').value;
      const response = await fetch(
        `https://chat-platform-irz7.onrender.com/contacts/friend_requests/inbox/SEND/${newFriendInput}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //something with button refreshing the page, so this messages do not get send
      if (response.ok) {
        console.log('Friend requests successfully sent');
      } else {
        console.log('Friend request failedd');
      }
    });

  //set up group chats
  const groups = await groupsResponse.json();
  const groupsListContainer = document.getElementById('groupsList');
  groups.forEach((group) => {
    const groupElement = document.createElement('button');
    groupElement.textContent = `${group.group_name}`;
    groupElement.addEventListener('click', () => {
      // Redirect to chat.html with friend's ID as a query parameter
      window.location.href = `groupChat.html?groupId=${group.group_id}`;
    });
    groupsListContainer.appendChild(groupElement);
  });

});
