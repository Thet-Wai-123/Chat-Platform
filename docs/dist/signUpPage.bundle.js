(self["webpackChunktemplate_repo"] = self["webpackChunktemplate_repo"] || []).push([["signUpPage"],{

/***/ "./src/sign-up.js":
/*!************************!*\
  !*** ./src/sign-up.js ***!
  \************************/
/***/ (() => {

document.getElementById('signUpForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    name: formData.get('name'),
    password: formData.get('password'),
    email: formData.get('email'),
  };

  const response = await fetch('https://chat-platform-irz7.onrender.com/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    window.location.href = './login.html';
  } else {
    const errorData = await response.json();
    console.log(errorData)
    console.log(errorData.errors[0].msg)
    errorData.errors.forEach((error)=>{
        alert(error.msg)
    })
  }
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/sign-up.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnblVwUGFnZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVtcGxhdGUtcmVwby8uL3NyYy9zaWduLXVwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduVXBGb3JtJykuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYXN5bmMgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGUudGFyZ2V0KTtcbiAgY29uc3QgZGF0YSA9IHtcbiAgICBuYW1lOiBmb3JtRGF0YS5nZXQoJ25hbWUnKSxcbiAgICBwYXNzd29yZDogZm9ybURhdGEuZ2V0KCdwYXNzd29yZCcpLFxuICAgIGVtYWlsOiBmb3JtRGF0YS5nZXQoJ2VtYWlsJyksXG4gIH07XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9jaGF0LXBsYXRmb3JtLWlyejcub25yZW5kZXIuY29tL3NpZ24tdXAnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICB9KTtcbiAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLi9sb2dpbi5odG1sJztcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc29sZS5sb2coZXJyb3JEYXRhKVxuICAgIGNvbnNvbGUubG9nKGVycm9yRGF0YS5lcnJvcnNbMF0ubXNnKVxuICAgIGVycm9yRGF0YS5lcnJvcnMuZm9yRWFjaCgoZXJyb3IpPT57XG4gICAgICAgIGFsZXJ0KGVycm9yLm1zZylcbiAgICB9KVxuICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==