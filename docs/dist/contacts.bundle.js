(self["webpackChunktemplate_repo"] = self["webpackChunktemplate_repo"] || []).push([["contacts"],{

/***/ "./src/contacts.js":
/*!*************************!*\
  !*** ./src/contacts.js ***!
  \*************************/
/***/ (() => {

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


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/contacts.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdHMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsTUFBTTtBQUN6QyxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxNQUFNO0FBQ3pDLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLE1BQU07QUFDekMsU0FBUztBQUNULE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLG1CQUFtQjtBQUN0RDtBQUNBO0FBQ0EseURBQXlELGVBQWU7QUFDeEUsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLG1CQUFtQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5RkFBeUYsd0JBQXdCO0FBQ2pIO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxNQUFNO0FBQzNDLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUZBQXVGLGVBQWU7QUFDdEc7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLE1BQU07QUFDM0MsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxpQkFBaUI7QUFDbkQ7QUFDQTtBQUNBLHVEQUF1RCxlQUFlO0FBQ3RFLEtBQUs7QUFDTDtBQUNBLEdBQUc7O0FBRUgsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RlbXBsYXRlLXJlcG8vLi9zcmMvY29udGFjdHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgaWYgKCF0b2tlbikge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9sb2dpbi5odG1sJztcbiAgfVxuXG4gIC8vZmV0Y2ggZnJpZW5kIGFuZCBmcmllbmQgcmVxdWVzdHNcbiAgdmFyIFtmcmllbmRzUmVzcG9uc2UsIGZyaWVuZFJlcXVlc3RzUmVzcG9uc2UsIGdyb3Vwc1Jlc3BvbnNlXSA9XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgZmV0Y2goJ2h0dHBzOi8vY2hhdC1wbGF0Zm9ybS1pcno3Lm9ucmVuZGVyLmNvbS9jb250YWN0cy9mcmllbmRzJywge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIGZldGNoKCdodHRwczovL2NoYXQtcGxhdGZvcm0taXJ6Ny5vbnJlbmRlci5jb20vY29udGFjdHMvZnJpZW5kX3JlcXVlc3RzL2luYm94L0dFVCcsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICBmZXRjaCgnaHR0cHM6Ly9jaGF0LXBsYXRmb3JtLWlyejcub25yZW5kZXIuY29tL2NvbnRhY3RzL2dyb3VwL0dFVCcsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgXSk7XG5cbiAgLy8gRGlzcGxheSB0aGUgbGlzdCBvZiBmcmllbmRzIG9uIHRoZSBwYWdlXG4gIGNvbnN0IGZyaWVuZHMgPSBhd2FpdCBmcmllbmRzUmVzcG9uc2UuanNvbigpO1xuICBjb25zdCBmcmllbmRzTGlzdENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmcmllbmRzTGlzdCcpO1xuICBmcmllbmRzLmZvckVhY2goKGZyaWVuZCkgPT4ge1xuICAgIGNvbnN0IGZyaWVuZEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBmcmllbmRFbGVtZW50LnRleHRDb250ZW50ID0gYCR7ZnJpZW5kLmZyaWVuZF9uYW1lfWA7XG4gICAgZnJpZW5kRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIC8vIFJlZGlyZWN0IHRvIGNoYXQuaHRtbCB3aXRoIGZyaWVuZCdzIElEIGFzIGEgcXVlcnkgcGFyYW1ldGVyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGBmcmllbmRDaGF0Lmh0bWw/ZnJpZW5kSWQ9JHtmcmllbmQudG9fdXNlcn1gO1xuICAgIH0pO1xuICAgIGZyaWVuZHNMaXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGZyaWVuZEVsZW1lbnQpO1xuICB9KTtcblxuICAvL0Rpc3BsYXkgbGlzdCBvZiBmcmllbmRSZXF1ZXN0cyBvbiB0aGUgcGFnZVxuICBjb25zdCBmcmllbmRSZXF1ZXN0cyA9IGF3YWl0IGZyaWVuZFJlcXVlc3RzUmVzcG9uc2UuanNvbigpO1xuICBjb25zdCBmcmllbmRSZXF1ZXN0c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnJpZW5kUmVxdWVzdHNMaXN0Jyk7XG4gIGZyaWVuZFJlcXVlc3RzLmZvckVhY2goKGZyaWVuZFJlcXVlc3QpID0+IHtcbiAgICBjb25zdCByZXF1ZXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJlcXVlc3RFbGVtZW50LnRleHRDb250ZW50ID0gYCR7ZnJpZW5kUmVxdWVzdC5uYW1lfWA7XG4gICAgY29uc3QgYWNjZXB0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYWNjZXB0QnV0dG9uLmNsYXNzTGlzdCA9ICdhY2NlcHRSZXF1ZXN0QnV0dG9uJztcbiAgICBhY2NlcHRCdXR0b24udGV4dENvbnRlbnQgPSAnQWNjZXB0JztcbiAgICBmcmllbmRSZXF1ZXN0c0xpc3QuYXBwZW5kQ2hpbGQocmVxdWVzdEVsZW1lbnQpO1xuICAgIGZyaWVuZFJlcXVlc3RzTGlzdC5hcHBlbmRDaGlsZChhY2NlcHRCdXR0b24pO1xuXG4gICAgYWNjZXB0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2NoYXQtcGxhdGZvcm0taXJ6Ny5vbnJlbmRlci5jb20vY29udGFjdHMvZnJpZW5kX3JlcXVlc3RzL2luYm94L0FDQ0VQVC8ke2ZyaWVuZFJlcXVlc3Quc2VuZGVyX2lkfWAsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuICB9KTtcblxuICBkb2N1bWVudFxuICAgIC5nZXRFbGVtZW50QnlJZCgnc2VuZFJlcXVlc3RCdXR0b24nKVxuICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IG5ld0ZyaWVuZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld0ZyaWVuZCcpLnZhbHVlO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vY2hhdC1wbGF0Zm9ybS1pcno3Lm9ucmVuZGVyLmNvbS9jb250YWN0cy9mcmllbmRfcmVxdWVzdHMvaW5ib3gvU0VORC8ke25ld0ZyaWVuZElucHV0fWAsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgLy9zb21ldGhpbmcgd2l0aCBidXR0b24gcmVmcmVzaGluZyB0aGUgcGFnZSwgc28gdGhpcyBtZXNzYWdlcyBkbyBub3QgZ2V0IHNlbmRcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zb2xlLmxvZygnRnJpZW5kIHJlcXVlc3RzIHN1Y2Nlc3NmdWxseSBzZW50Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnRnJpZW5kIHJlcXVlc3QgZmFpbGVkZCcpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIC8vc2V0IHVwIGdyb3VwIGNoYXRzXG4gIGNvbnN0IGdyb3VwcyA9IGF3YWl0IGdyb3Vwc1Jlc3BvbnNlLmpzb24oKTtcbiAgY29uc3QgZ3JvdXBzTGlzdENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncm91cHNMaXN0Jyk7XG4gIGdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4ge1xuICAgIGNvbnN0IGdyb3VwRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGdyb3VwRWxlbWVudC50ZXh0Q29udGVudCA9IGAke2dyb3VwLmdyb3VwX25hbWV9YDtcbiAgICBncm91cEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAvLyBSZWRpcmVjdCB0byBjaGF0Lmh0bWwgd2l0aCBmcmllbmQncyBJRCBhcyBhIHF1ZXJ5IHBhcmFtZXRlclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgZ3JvdXBDaGF0Lmh0bWw/Z3JvdXBJZD0ke2dyb3VwLmdyb3VwX2lkfWA7XG4gICAgfSk7XG4gICAgZ3JvdXBzTGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZChncm91cEVsZW1lbnQpO1xuICB9KTtcblxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=