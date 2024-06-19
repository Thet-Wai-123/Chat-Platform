(self["webpackChunktemplate_repo"] = self["webpackChunktemplate_repo"] || []).push([["authenticationPage"],{

/***/ "./src/authenticationPage.js":
/*!***********************************!*\
  !*** ./src/authenticationPage.js ***!
  \***********************************/
/***/ (() => {

document.getElementById('signInForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    name: formData.get('name'),
    password: formData.get('password'),
  };

  try {
    const response = await fetch('https://chat-platform-irz7.onrender.com/log-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const result = await response.json();
      const token = result.token;
      localStorage.setItem('token', token);
      window.location.href = './contacts.html';
    } else {
      throw error('Invalid credentials');
    }
  } catch (error) {
    alert('Invalid credentials');
  }
});


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/authenticationPage.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb25QYWdlLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RlbXBsYXRlLXJlcG8vLi9zcmMvYXV0aGVudGljYXRpb25QYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduSW5Gb3JtJykuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYXN5bmMgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGUudGFyZ2V0KTtcbiAgY29uc3QgZGF0YSA9IHtcbiAgICBuYW1lOiBmb3JtRGF0YS5nZXQoJ25hbWUnKSxcbiAgICBwYXNzd29yZDogZm9ybURhdGEuZ2V0KCdwYXNzd29yZCcpLFxuICB9O1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9jaGF0LXBsYXRmb3JtLWlyejcub25yZW5kZXIuY29tL2xvZy1pbicsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgIH0pO1xuICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgY29uc3QgdG9rZW4gPSByZXN1bHQudG9rZW47XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCB0b2tlbik7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcuL2NvbnRhY3RzLmh0bWwnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBlcnJvcignSW52YWxpZCBjcmVkZW50aWFscycpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBhbGVydCgnSW52YWxpZCBjcmVkZW50aWFscycpO1xuICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==