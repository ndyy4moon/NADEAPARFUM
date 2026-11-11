// ======================================
// NADÉA PARFUM - SHOPPING CART
// ======================================

function getCart() {
    return JSON.parse(localStorage.getItem("nadeaCart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("nadeaCart", JSON.stringify(cart));
}

const productImages = {
    "NADÉA Rose": "img/nadea-rose.jpg",
    "NADÉA Velvet": "img/nadea-velvet.jpg",
    "NADÉA Bloom": "img/nadea-bloom.jpg",
    "NADÉA Noir": "img/nadea-noir.jpg",
    "NADÉA Vanilla": "img/nadea-vanilla.jpg",
    "NADÉA Oud": "img/nadea-oud.jpg"
};

function formatPrice(price) {
    return "Rp" + price.toLocaleString("id-ID");
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");
    const totalItemsElement = document.getElementById("total-items");

    if (!cartItems) return;

    const cart = getCart();
    let total = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your Bag Is Empty</h3>
                <p>Yuk, temukan aroma favoritmu di NADÉA PARFUM.</p>
                <a href="shop.html">Explore Collection</a>
            </div>
        `;

        totalElement.textContent = "Rp0";
        totalItemsElement.textContent = "0";
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;

        const image = productImages[item.name] || "img/logo-nadea.png";

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${image}" alt="${item.name}">

                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>Exclusive NADÉA PARFUM Collection</p>

                    <div class="item-price">
                        ${formatPrice(item.price)}
                    </div>

                    <button class="remove-btn"
                        onclick="removeProduct(${index})">
                        Hapus produk
                    </button>
                </div>
            </div>
        `;
    });

    totalElement.textContent = formatPrice(total);
    totalItemsElement.textContent = cart.length;
}

function removeProduct(index) {
    const cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);
    displayCart();
}

displayCart();

console.log("NADÉA PARFUM Shopping Bag berhasil dimuat!");
