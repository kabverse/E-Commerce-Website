// Function to toggle the side menu
function toggleMenu() {
  const sideMenu = document.querySelector('.side-menu');
  sideMenu.classList.toggle('active');
}

// Function to close the side menu
function closeMenu() {
  const sideMenu = document.querySelector('.side-menu');
  sideMenu.classList.remove('active');
}

// Function to open the side menu (if using burger menu)
document.querySelector('.burger-menu').addEventListener('click', toggleMenu);

// cart.js

// Function to calculate the total price based on item quantity and price
function calculateTotal() {
  const cartItems = document.querySelectorAll('.cart-item');
  let total = 0;

  cartItems.forEach(item => {
      const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace('$', ''));
      const quantity = parseInt(item.querySelector('.item-quantity').value, 10);
      total += price * quantity;
  });

  document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Get the cart items container and total price element
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Function to update the cart display
    function updateCart() {
        cartItemsContainer.innerHTML = ''; // Clear existing items
        let total = 0;

        // Loop through cart items and display them
        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <label for="quantity-${index}">Quantity:</label>
                    <input id="quantity-${index}" type="number" class="cart-item-quantity" value="${item.quantity}" min="1" data-index="${index}">
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);

            // Calculate the total price
            total += item.price * item.quantity;
        });

        // Update the total price display
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }

    // Function to update the quantity of an item in the cart
    function updateQuantity(index, newQuantity) {
        if (newQuantity > 0) {
            cart[index].quantity = newQuantity; // Update the quantity
            localStorage.setItem('cart', JSON.stringify(cart)); // Save changes to localStorage
            updateCart(); // Refresh the cart display
        }
    }

    // Function to remove an item from the cart
    function removeItem(index) {
        cart.splice(index, 1); // Remove the item from the array
        localStorage.setItem('cart', JSON.stringify(cart)); // Save changes to localStorage
        updateCart(); // Refresh the cart display
    }

    // Event listener for quantity changes
    cartItemsContainer.addEventListener('input', (event) => {
        if (event.target.classList.contains('cart-item-quantity')) {
            const index = parseInt(event.target.dataset.index, 10);
            const newQuantity = parseInt(event.target.value, 10);
            if (!isNaN(newQuantity)) {
                updateQuantity(index, newQuantity);
            }
        }
    });

    // Event listener for remove button clicks
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const index = parseInt(event.target.dataset.index, 10);
            removeItem(index);
        }
    });

    // Initial call to display the cart on page load
    updateCart();
});
