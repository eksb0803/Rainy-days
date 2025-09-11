const API_URL = 'https://v2.api.noroff.dev/rainy-days';
const container = document.querySelector('.product-container');


const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

if (!productId) {
    container.innerHTML = '<p>Ingen produkt valgt.</p>';
} else {
    fetchProduct(productId);
}


async function fetchProduct(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Kunne ikke hente produkt');
        const json = await response.json();
        const product = json.data;
        displayProduct(product);
    } catch (error) {
        container.innerHTML = `<p>${error.message}</p>`;
    }
}


function displayProduct(product) {
    container.innerHTML = `
        <img src="${product.image.url}" alt="${product.image.alt}">
        <h1>${product.title}</h1>
        <p>${product.description}</p>
        <p>Pris: ${product.discountedPrice ? product.discountedPrice.toFixed(2) : product.price.toFixed(2)} kr</p>
        <p>Kjønn: ${product.gender}</p>
        <p>Farger: ${product.baseColor}</p>
        <p>Størrelser: ${product.sizes.join(', ')}</p>
        <button class="add-to-cart">Legg i handlekurv</button>
    `;

    const addBtn = container.querySelector('.add-to-cart');
    addBtn.addEventListener('click', () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.title} er lagt til i handlekurven!`);
    });
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countElement = document.querySelector('.cart-count');
    countElement.textContent = cart.length;
}

// Kjør funksjonen når siden lastes
updateCartCount();