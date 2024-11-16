// Function to toggle the side menu
function toggleMenu() {
    const sideMenu = document.querySelector('.side-menu');
    sideMenu?.classList.toggle('active');
}

// Function to close the side menu
function closeMenu() {
    const sideMenu = document.querySelector('.side-menu');
    sideMenu?.classList.remove('active');
}

// Event listener for burger menu toggle
document.querySelector('.burger-menu')?.addEventListener('click', toggleMenu);

// Function to filter products based on the search query
function filterProducts() {
    const searchTerm = document.getElementById('searchBar')?.value.toLowerCase().trim(); // Get search input
    const productContainers = document.querySelectorAll('.product-container'); // Get all product containers

    if (searchTerm !== undefined) {
        productContainers.forEach((product) => {
            const productText = product.querySelector('.product-text')?.innerText.toLowerCase() || ''; // Get product text
            if (productText.includes(searchTerm)) {
                product.style.display = ''; // Show product if it matches search term
            } else {
                product.style.display = 'none'; // Hide product if it doesn't match
            }
        });
    }
}

// Add event listener to trigger search functionality as user types
document.getElementById('searchBar')?.addEventListener('input', filterProducts);

// Get modal and buttons
const modal = document.getElementById('added-to-cart-modal');
const closeButton = document.querySelector('.close-btn');

// Function to show the modal
function showModal() {
    if (modal) modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    if (modal) modal.style.display = 'none';
}

// Close the modal when clicking on the close button (X)
closeButton?.addEventListener('click', closeModal);

// Close the modal if the user clicks outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Add product to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', event => {
        const productContainer = event.target.closest('.product-container');
        const productName = productContainer.querySelector('.product-name')?.textContent.trim();
        const productPrice = parseFloat(productContainer.querySelector('.product-price')?.textContent.replace('$', '').trim());
        
        // Ensure productName and productPrice are valid
        if (productName && !isNaN(productPrice)) {
            // Retrieve the current cart from localStorage or initialize an empty cart
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if the product already exists in the cart
            const existingItemIndex = cart.findIndex(item => item.name === productName);

            if (existingItemIndex !== -1) {
                // If the item exists, update its quantity
                cart[existingItemIndex].quantity += 1;
            } else {
                // Add a new item with quantity 1
                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            // Save the updated cart back to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Optional: Show a modal or alert to confirm the addition
            showModal();
        } else {
            console.error('Product details are missing or invalid.');
        }
    });
});

// JavaScript to handle filter by tags
const filterButtons = document.querySelectorAll('.filter-btn');
const productContainers = document.querySelectorAll('.product-container');

// Add event listener to each filter button
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tag = button.getAttribute('data-tag');

        // Show only products with the selected tag
        productContainers.forEach(container => {
            const tags = container.getAttribute('data-tags')?.toLowerCase() || '';
            if (tags.includes(tag.toLowerCase()) || tag === 'all') {
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
        });
    });
});
