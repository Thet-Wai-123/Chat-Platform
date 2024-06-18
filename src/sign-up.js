document.getElementById('signUpForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    name: formData.get('name'),
    password: formData.get('password'),
    email: formData.get('email'),
  };

  const response = await fetch('http://localhost:3000/sign-up', {
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
