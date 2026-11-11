// ======================================
// NADÉA PARFUM - PRODUCT MANAGEMENT
// ======================================

// Data produk bawaan
const defaultProducts = [
    {
        id: 1,
        name: "NADÉA Rose",
        description: "Soft Floral & Romantic",
        price: 130000,
        category: "women"
    },
    {
        id: 2,
        name: "NADÉA Velvet",
        description: "Warm Woody & Elegant",
        price: 150000,
        category: "men"
    },
    {
        id: 3,
        name: "NADÉA Bloom",
        description: "Fresh Floral & Sweet",
        price: 145000,
        category: "women"
    },
    {
        id: 4,
        name: "NADÉA Noir",
        description: "Deep, Bold & Mysterious",
        price: 200000,
        category: "unisex"
    },
    {
        id: 5,
        name: "NADÉA Vanilla",
        description: "Sweet & Warm Vanilla",
        price: 180000,
        category: "unisex"
    },
    {
        id: 6,
        name: "NADÉA Oud",
        description: "Rich Woody & Oriental",
        price: 210000,
        category: "men"
    }
];

// Gambar produk
const productImages = {
    "NADÉA Rose": "img/nadea-rose.jpg",
    "NADÉA Velvet": "img/nadea-velvet.jpg",
    "NADÉA Bloom": "img/nadea-bloom.jpg",
    "NADÉA Noir": "img/nadea-noir.jpg",
    "NADÉA Vanilla": "img/nadea-vanilla.jpg",
    "NADÉA Oud": "img/nadea-oud.jpg"
};

// Mengambil produk dari Admin
function getShopProducts() {
    const savedProducts = localStorage.getItem("nadeaAdminProducts");

    if (savedProducts !== null) {
        return JSON.parse(savedProducts);
    }

    return defaultProducts;
}

// Format harga
function formatPrice(price) {
    return "Rp" + Number(price).toLocaleString("id-ID");
}

// Menampilkan produk
function displayProducts(productData = getShopProducts()) {
    const productGrid = document.getElementById("shop-product-grid");

    if (!productGrid) return;

    if (productData.length === 0) {
        productGrid.innerHTML = `
            <p>Produk belum tersedia.</p>
        `;
        return;
    }

    productGrid.innerHTML = productData.map(product => {
        const image = product.image || productImages[product.name] || "img/logo-nadea.png";

        return `
            <div class="shop-card">
                <img src="${image}" alt="${product.name}">

                <div class="shop-card-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <h4>${formatPrice(product.price)}</h4>

                    <button onclick="viewProduct(${product.id})">
                        View Details
                    </button>
                </div>
            </div>
        `;
    }).join("");
}

// Menambahkan produk ke keranjang
function viewProduct(id) {
    window.location.href = "detail.html?id=" + id;
}

// Pencarian produk
const searchInput = document.getElementById("search-product");

if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
}

// Filter kategori
const categoryFilter = document.getElementById("filter-category");

if (categoryFilter) {
    categoryFilter.addEventListener("change", filterProducts);
}

// Urutkan harga
const sortSelect = document.getElementById("sort-price");

if (sortSelect) {
    sortSelect.addEventListener("change", filterProducts);
}

// Menjalankan pencarian, filter, dan sorting
function filterProducts() {
    let products = getShopProducts();

    const searchValue = document.getElementById("search-product")?.value.toLowerCase() || "";
    const categoryValue = document.getElementById("filter-category")?.value || "all";
    const sortValue = document.getElementById("sort-price")?.value || "";

    products = products.filter(product => {
        const matchName = product.name.toLowerCase().includes(searchValue);
        const matchCategory = categoryValue === "all" || product.category === categoryValue;

        return matchName && matchCategory;
    });

    if (sortValue === "low-high") {
        products.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortValue === "high-low") {
        products.sort((a, b) => Number(b.price) - Number(a.price));
    }

    displayProducts(products);
}

// Tampilkan produk saat halaman dibuka
displayProducts();

console.log("NADÉA PARFUM Collection berhasil dimuat!");
