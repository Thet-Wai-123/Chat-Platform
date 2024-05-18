document.addEventListener("DOMContentLoaded", async function(){
    const cat = window.localStorage.getItem("myCat");
    console.log(cat)
    const token = localStorage.getItem('token');
    console.log(token)
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