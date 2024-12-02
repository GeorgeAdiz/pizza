document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Validate inputs
    if (!username || !password) {
        Swal.fire({
            icon: 'error',
            title: 'Missing Fields',
            text: 'Please enter both username and password.',
        });
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: `Welcome back, ${username}!`,
            }).then(() => {
                // Redirect or perform additional actions
                window.location.href = '/FrontEnd/PRODUCT/product.html'; // Example redirect after successful login
            });
        } else {
            const errorData = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: errorData.message || 'Invalid username or password.',
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong. Please try again later.',
        });
        console.error('Login error:', error);
    }
});
