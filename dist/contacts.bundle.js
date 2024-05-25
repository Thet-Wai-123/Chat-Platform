(self["webpackChunktemplate_repo"] = self["webpackChunktemplate_repo"] || []).push([["contacts"],{

/***/ "./src/contacts.js":
/*!*************************!*\
  !*** ./src/contacts.js ***!
  \*************************/
/***/ (() => {

document.addEventListener("DOMContentLoaded", async function(){
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html'; 
    }

    try {
        const response = await fetch('http://localhost:3000/contacts/friends', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const friends = await response.json();
        // Display the list of friends on the page
        const friendsListContainer = document.getElementById('friendsList');
        friends.forEach(friend => {
            const friendElement = document.createElement('button');
            friendElement.textContent = `${friend.name}`;
            friendElement.addEventListener('click', () => {
                // Redirect to chat.html with friend's ID as a query parameter
                window.location.href = `chat.html?friendId=${friend.to_user}`;
            });
            friendsListContainer.appendChild(friendElement);
        });
    } catch (error) {
        console.error('Error fetching friends:', error);
        // Handle the error (e.g., display an error message)
    }
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/contacts.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdHMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxNQUFNO0FBQ2pEO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLFlBQVk7QUFDdkQ7QUFDQTtBQUNBLDZEQUE2RCxlQUFlO0FBQzVFLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RlbXBsYXRlLXJlcG8vLi9zcmMvY29udGFjdHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgYXN5bmMgZnVuY3Rpb24oKXtcbiAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2xvZ2luLmh0bWwnOyBcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvY29udGFjdHMvZnJpZW5kcycsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW59YFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBmcmllbmRzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAvLyBEaXNwbGF5IHRoZSBsaXN0IG9mIGZyaWVuZHMgb24gdGhlIHBhZ2VcbiAgICAgICAgY29uc3QgZnJpZW5kc0xpc3RDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnJpZW5kc0xpc3QnKTtcbiAgICAgICAgZnJpZW5kcy5mb3JFYWNoKGZyaWVuZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBmcmllbmRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBmcmllbmRFbGVtZW50LnRleHRDb250ZW50ID0gYCR7ZnJpZW5kLm5hbWV9YDtcbiAgICAgICAgICAgIGZyaWVuZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gUmVkaXJlY3QgdG8gY2hhdC5odG1sIHdpdGggZnJpZW5kJ3MgSUQgYXMgYSBxdWVyeSBwYXJhbWV0ZXJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGBjaGF0Lmh0bWw/ZnJpZW5kSWQ9JHtmcmllbmQudG9fdXNlcn1gO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmcmllbmRzTGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZChmcmllbmRFbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgZnJpZW5kczonLCBlcnJvcik7XG4gICAgICAgIC8vIEhhbmRsZSB0aGUgZXJyb3IgKGUuZy4sIGRpc3BsYXkgYW4gZXJyb3IgbWVzc2FnZSlcbiAgICB9XG59KTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=