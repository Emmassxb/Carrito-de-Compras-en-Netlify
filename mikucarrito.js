// Catálogo de periféricos y merch Miku
const products = [
    { id: 1, name: "Teclado Mecánico Miku Edition (Switches Cyan)", price: 120 },
    { id: 2, name: "Audífonos Gamer Inalámbricos Vocaloid 01", price: 95 },
    { id: 3, name: "Mousepad XL Project DIVA", price: 25 },
    { id: 4, name: "Figura Nendoroid Hatsune Miku V4X", price: 65 },
    { id: 5, name: "Mouse Ligero Miku Cyan RGB", price: 45 },
    { id: 6, name: "Micrófono Condensador Edición Cantante", price: 80 }
];

let cart = [];

function checkAuth() {
    const user = localStorage.getItem("authUser");
    if (user) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("store-section").style.display = "block";
        document.getElementById("user-display").innerText = user;
        loadCart();
        renderProducts();
    } else {
        document.getElementById("login-section").style.display = "block";
        document.getElementById("store-section").style.display = "none";
    }
}

function login() {
    const username = document.getElementById("username").value;
    if (username.trim() !== "") {
        localStorage.setItem("authUser", username);
        checkAuth();
    } else {
        alert("Por favor, ingresa un nombre para continuar.");
    }
}

function logout() {
    localStorage.removeItem("authUser");
    localStorage.removeItem("shoppingCart");
    cart = [];
    checkAuth();
}

function renderProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products.forEach(product => {
        productList.innerHTML += `
            <div class="product-item">
                <div class="product-info">
                    <span class="product-name">${product.name}</span>
                    <span class="product-price">$${product.price} USD</span>
                </div>
                <button onclick="addToCart(${product.id})" class="btn-primary">Añadir</button>
            </div>
        `;
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    saveCart();
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <li class="cart-item">
                <span>${item.name}</span>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="miku-pink font-bold">$${item.price}</span>
                    <button onclick="removeFromCart(${index})" class="btn-remove">✕</button>
                </div>
            </li>
        `;
    });
    cartTotal.innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem("shoppingCart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        renderCart();
    }
}

function checkout() {
    if (cart.length === 0) {
        alert("Tu carrito de compras está vacío.");
        return;
    }
    alert("¡Pedido confirmado! Tus periféricos de Miku están en camino.");
    cart = [];
    saveCart();
    renderCart();
}

// Inicializar
checkAuth();