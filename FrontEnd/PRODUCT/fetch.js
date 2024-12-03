document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.querySelector('.modal-body form');

    // Select input elements using their respective IDs
    const fullnameInput = document.getElementById('Fullname');
    const contactInput = document.getElementById('Contact');
    const quantityInput = document.getElementById('number');
    const pizzaFlavorSelect = document.getElementById('pizzaFlavor');

    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fullname = fullnameInput.value.trim();
        const contactNumber = contactInput.value.trim();
        const quantity = parseInt(quantityInput.value, 10);
        const pizzaFlavor = pizzaFlavorSelect.value;

        if (!fullname || !contactNumber || !quantity || !pizzaFlavor) {
            alert('All fields are required!');
            return;
        }

        const orderData = { fullname, contactNumber, quantity, pizzaFlavor };

        try {
            console.log('Sending order data:', orderData);

            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message || 'Order placed successfully!');
                orderForm.reset();
                const modalElement = bootstrap.Modal.getInstance(document.getElementById('buyNowModal'));
                if (modalElement) modalElement.hide();
            } else {
                const errorData = await response.json();
                console.error('Backend error:', errorData);
                alert(`Error: ${errorData.message || 'Something went wrong!'}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Unable to connect to the server. Please try again later.');
        }
    });
});
