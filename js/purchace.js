
let cart = JSON.parse(localStorage.getItem('cart')) || [];


const container = document.querySelector('.Checkout-items-container');
const totalElement = document.querySelector('.total-amount');
const checkoutBtn = document.getElementById('checkout-btn');


function displayCart() {
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p>Handlekurven er tom</p>';
        totalElement.textContent = 'Total: 0 kr';
        toggleCheckoutButton();
        updateCartCount();
        return;
    }

    cart.forEach((product, index) => {
        const item = document.createElement('div');
        item.classList.add('checkout-item');
        item.innerHTML = `
            <img src="${product.image.url}" alt="${product.image.alt}">
            <div class="text">
                <h3>${product.title}</h3>
                <p>${product.discountedPrice ? product.discountedPrice.toFixed(2) : product.price.toFixed(2)} kr</p>
                <button class="remove-btn" data-index="${index}">Fjern</button>
            </div>
        `;
        container.appendChild(item);
    });

  
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = e.target.dataset.index;
            removeFromCart(idx);
        });
    });

    updateTotal();
    toggleCheckoutButton();
    updateCartCount();
}


function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}


function updateTotal() {
    const total = cart.reduce((sum, product) => sum + (product.discountedPrice || product.price), 0);
    totalElement.textContent = `Total: ${total.toFixed(2)} kr`;
}


function toggleCheckoutButton() {
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
    }
}


const clearCartBtn = document.createElement('button');
clearCartBtn.textContent = 'Tøm handlekurv';
clearCartBtn.classList.add('clear-cart-btn');
container.parentElement.insertBefore(clearCartBtn, container.nextSibling);

clearCartBtn.addEventListener('click', () => {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
});


function updateCartCount() {
    const countElement = document.querySelector('.cart-count');
    if (countElement) {
        countElement.textContent = cart.length;
    }
}


checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {

        localStorage.setItem('purchasedCart', JSON.stringify(cart));


        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));


        window.location.href = 'thanks.html';
    }
});


displayCart();
