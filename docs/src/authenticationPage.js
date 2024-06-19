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
    console.error('Error:', error);
  }
});
