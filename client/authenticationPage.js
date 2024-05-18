document.getElementById('signInForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        password: formData.get('password')
    };

    try {
        const response = await fetch('http://localhost:3000/log-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        const token = result.token;
        localStorage.setItem('token', token);
        window.location.href = '/client/contacts.html';
        
    } catch (error) {
        console.error('Error:', error);
    }
});