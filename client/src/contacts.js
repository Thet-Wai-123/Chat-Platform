document.addEventListener('DOMContentLoaded', async function () {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login.html';
  }

  //fetch friend and friend requests
  var [friendsResponse, friendRequestsResponse] = await Promise.all([
    fetch('http://localhost:3000/contacts/friends', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    fetch('http://localhost:3000/contacts/friend_requests/inbox/GET', {
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
    friendElement.textContent = `${friend.name}`;
    friendElement.addEventListener('click', () => {
      // Redirect to chat.html with friend's ID as a query parameter
      window.location.href = `chat.html?friendId=${friend.to_user}`;
    });
    friendsListContainer.appendChild(friendElement);
  });

  //Display list of friendRequests on the pag
  const friendRequests = await friendRequestsResponse.json();
  const friendRequestsList = document.getElementById('friendRequestsList');
  friendRequests.forEach((friendRequest) => {
    const requestElement = document.createElement('div');
    requestElement.textContent = `${friendRequest.name}`;
    console.log(friendRequest.id);
    const acceptButton = document.createElement('button');
    acceptButton.classList = "acceptRequestButton";
    //so I need to somehow also pass in the target id here as well.
    acceptButton.textContent = 'Accept';
    friendRequestsList.appendChild(requestElement);
    friendRequestsList.appendChild(acceptButton);

    acceptButton.addEventListener('click', async () => {
              await fetch(
                `http://localhost:3000/contacts/friend_requests/inbox/ACCEPT/${friendRequest.name}`,
                {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            });
  });

  document
    .getElementById('sendRequestButton')
    .addEventListener('click', async () => {
      const newFriendInput = document.getElementById('newFriend').value;
      const response = await fetch(
        `http://localhost:3000/contacts/friend_requests/inbox/SEND/${newFriendInput}`,
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


//Needs to differentiate different users, coming back to it later
//   document
//     .getElementsByClassName('acceptRequestButton')[0]
//     .addEventListener('click', async () => {
//       const response = await fetch(
//         `http://localhost:3000/contacts/friend_requests/inbox/ACCEPT/${friendRequest.name}`,
//         {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//     });
});
