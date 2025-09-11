const API_URL = 'https://v2.api.noroff.dev/rainy-days';

const productContainer = document.createElement('div');
productContainer.classList.add('product-container');
document.querySelector('main').appendChild(productContainer);

const loadingIndicator = document.createElement('p');
loadingIndicator.textContent = 'Laster produkter...';
loadingIndicator.classList.add('loading');
document.querySelector('main').appendChild(loadingIndicator);

async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Kunne ikke hente produkter');
        const json = await response.json();
        const products = json.data; 
        
        displayProducts(products);
    } catch (error) {
        alert('Det oppstod en feil: ' + error.message);
        productContainer.innerHTML = '<p>Kunne ikke laste produkter. Prøv igjen senere.</p>';
    }
}

function displayProducts(products) {
    productContainer.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.image.url}" alt="${product.image.alt}">
            <h3>${product.title}</h3>
            <p>${product.discountedPrice ? product.discountedPrice.toFixed(2) : product.price.toFixed(2)} kr</p>
            <button class="add-to-cart" data-id="${product.id}">Legg i handlekurv</button>
            <a href="product.html?id=${product.id}">Se produkt</a>
        `;
        productContainer.appendChild(card);

        const button = card.querySelector('.add-to-cart');
        button.addEventListener('click', () => addToCart(product));
    });
} 

function addToCart(product) {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.title} er lagt i handlekurven!`);
        updateCartCount();
    } catch (error) {
        alert('Kunne ikke legge til produkt i handlekurven: ' + error.message);
    }
}

fetchProducts();

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countElement = document.querySelector('.cart-count');
    countElement.textContent = cart.length;
}

updateCartCount();
