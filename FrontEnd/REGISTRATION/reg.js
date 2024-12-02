// reg.js

// Get form and input elements
const form = document.getElementById('register-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Event listener for form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent default form submission

    // Get input values
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate form fields
    if (!username ||  !password ) {
        alert('All fields are required!');
        return;
    }

    // Prepare data to be sent to the backend
    const userData = { username,  password, };

    try {
        // Send a POST request to the backend API
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        // Handle the response
        if (response.ok) {
            const result = await response.json();
            alert(result.message);  // Show success message
            window.location.href = '/FrontEnd/LOGIN/login.html';  // Redirect to login page
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);  // Show error message
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred. Please try again later.');
    }
});
