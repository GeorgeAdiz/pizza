document.addEventListener('DOMContentLoaded', () => {
    const ordersTableBody = document.querySelector('table tbody');
    const confirmModal = document.getElementById('confirmModal');
    const modalText = document.getElementById('modalText');
    let selectedOrderFullname = null; // Store the selected order fullname

    // Ensure modal is hidden on page load
    confirmModal.style.display = 'none';

    // Fetch and display orders
    async function fetchOrders() {
        try {
            const response = await fetch('http://localhost:5000/api/orders');
            if (response.ok) {
                const orders = await response.json();
                populateOrdersTable(orders);
            } else {
                console.error('Failed to fetch orders:', await response.text());
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    // Populate the orders table
    function populateOrdersTable(orders) {
        ordersTableBody.innerHTML = ''; // Clear existing rows
        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.fullname}</td>
                <td>${order.contactNumber}</td>
                <td>${order.quantity}</td>
                <td>${order.pizzaFlavor}</td>
                <td>
                    <button type="button" class="btn btn-success confirm-btn" data-fullname="${order.fullname}">Confirm</button>
                </td>
            `;
            ordersTableBody.appendChild(row);
        });

        // Add event listeners for "Confirm" buttons
        const confirmButtons = document.querySelectorAll('.confirm-btn');
        confirmButtons.forEach(button => {
            button.addEventListener('click', () => {
                selectedOrderFullname = button.getAttribute('data-fullname');
                modalText.textContent = `Are you sure you want to confirm the order for ${selectedOrderFullname}?`;
                console.log('Modal opened for:', selectedOrderFullname); // Debugging
                confirmModal.style.display = 'block'; // Only show modal when button is clicked
            });
        });
    }

    // Handle modal confirmation
    window.finalizeOrder = async () => {
        if (!selectedOrderFullname) return;

        try {
            const response = await fetch(`http://localhost:5000/api/orders/confirm`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullname: selectedOrderFullname }),
            });

            if (response.ok) {
                alert('Order confirmed successfully!');
                fetchOrders(); // Refresh the orders table
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error confirming order:', error);
            alert('Failed to confirm the order. Please try again.');
        } finally {
            closeModal();
        }
    };

    // Close modal function
    window.closeModal = () => {
        confirmModal.style.display = 'none'; // Hide the modal
        selectedOrderFullname = null; // Reset selected order
    };

    // Initialize by fetching orders
    fetchOrders();
});
