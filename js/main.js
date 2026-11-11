// ======================================
// NADÉA PARFUM - MAIN JAVASCRIPT
// ======================================

// Data produk
const products = [
    {
        name: "NADÉA Rose",
        description: "Soft Floral & Romantic",
        price: 130000
    },
    {
        name: "NADÉA Velvet",
        description: "Warm Woody & Elegant",
        price: 150000
    },
    {
        name: "NADÉA Bloom",
        description: "Fresh Floral & Sweet",
        price: 145000
    },
    {
        name: "NADÉA Noir",
        description: "Deep, Bold & Mysterious",
        price: 200000
    },
    {
        name: "NADÉA Vanilla",
        description: "Sweet & Warm Vanilla",
        price: 180000
    },
    {
        name: "NADÉA Oud",
        description: "Rich Woody & Oriental",
        price: 210000
    }
];

// Mengambil data keranjang dari localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("nadeaCart")) || [];
}

// Format harga Rupiah
function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);
}

// Membuat tombol Bag pada navbar
const navbar = document.querySelector(".navbar");

if (navbar) {
    const cartButton = document.createElement("button");

    cartButton.className = "cart-button";
    cartButton.type = "button";
    cartButton.innerHTML = `Bag (<span id="cart-count">0</span>)`;

    navbar.appendChild(cartButton);

    // Klik Bag membuka halaman keranjang
    cartButton.addEventListener("click", function () {
        window.location.href = "cart.html";
    });
}

// Memperbarui jumlah produk pada Bag
function updateCart() {
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = getCart().length;
    }
}

// Membuat modal detail produk
const modal = document.createElement("div");

modal.className = "product-modal";

modal.innerHTML = `
    <div class="modal-content">
        <button class="close-modal" type="button">&times;</button>
        <p class="modal-label">NADÉA PARFUM COLLECTION</p>
        <h2 id="modal-name"></h2>
        <p id="modal-description"></p>
        <h3 id="modal-price"></h3>
        <button id="add-cart" type="button">
            Add to Bag
        </button>
    </div>
`;

document.body.appendChild(modal);

// Tombol detail produk
const detailButtons = document.querySelectorAll(
    ".product-card button"
);

detailButtons.forEach((button, index) => {

    button.addEventListener("click", function () {

        const product = products[index];

        if (!product) return;

        document.getElementById("modal-name").textContent =
            product.name;

        document.getElementById("modal-description").textContent =
            product.description;

        document.getElementById("modal-price").textContent =
            formatRupiah(product.price);

        modal.classList.add("active");

        document.getElementById("add-cart").onclick = function () {

            const cart = getCart();

            cart.push({
                name: product.name,
                price: product.price
            });

            localStorage.setItem(
                "nadeaCart",
                JSON.stringify(cart)
            );

            updateCart();

            modal.classList.remove("active");

            alert(product.name + " berhasil ditambahkan ke My Bag!");
        };
    });
});

// Menutup modal
const closeModal = document.querySelector(".close-modal");

if (closeModal) {
    closeModal.addEventListener("click", function () {
        modal.classList.remove("active");
    });
}

// Menutup modal ketika klik bagian luar
modal.addEventListener("click", function (event) {

    if (event.target === modal) {
        modal.classList.remove("active");
    }

});

// Menampilkan jumlah keranjang saat halaman dibuka
updateCart();

console.log("NADÉA PARFUM berhasil dijalankan!");
