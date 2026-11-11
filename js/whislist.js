// ======================================
// NADÉA PARFUM - WISHLIST
// ======================================

function getWishlist() {
    try {
        return JSON.parse(localStorage.getItem("nadeaWishlist")) || [];
    } catch (error) {
        return [];
    }
}

function displayWishlist() {
    const container = document.getElementById("wishlist-items");

    if (!container) return;

    const wishlist = getWishlist();

    if (wishlist.length === 0) {
        container.innerHTML = `
            <div class="empty-wishlist">
                <h2>Your Wishlist Is Empty ♡</h2>
                <p>Simpan parfum favoritmu di sini.</p>
                <a href="shop.html">Explore Collection</a>
            </div>
        `;
        return;
    }

    container.innerHTML = wishlist.map((product, index) => {
        const image = product.image || "img/logo-nadea.png";
        const price = Number(product.price) || 0;

        return `
            <div class="wishlist-card">
                <img src="${image}" alt="${product.name}">
                <h3>${product.name || "NADÉA PARFUM"}</h3>
                <p>${product.description || ""}</p>
                <h4>Rp${price.toLocaleString("id-ID")}</h4>

                <button onclick="addWishlistToCart(${index})">
                    ADD TO BAG
                </button>

                <button class="remove-wishlist" onclick="removeWishlist(${index})">
                    REMOVE
                </button>
            </div>
        `;
    }).join("");
}

// ADD TO BAG
function addWishlistToCart(index) {
    const wishlist = getWishlist();
    const product = wishlist[index];

    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("nadeaCart")) || [];

    cart.push({
        name: product.name,
        price: Number(product.price)
    });

    localStorage.setItem("nadeaCart", JSON.stringify(cart));

    alert("Produk berhasil ditambahkan ke My Bag!");
}

// REMOVE PRODUCT
function removeWishlist(index) {
    const wishlist = getWishlist();

    wishlist.splice(index, 1);

    localStorage.setItem("nadeaWishlist", JSON.stringify(wishlist));

    displayWishlist();
}

// DISPLAY WHEN PAGE LOADS
displayWishlist();

