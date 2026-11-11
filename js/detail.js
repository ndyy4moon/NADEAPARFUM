// ======================================
// NADÉA PARFUM - PRODUCT DETAIL
// ======================================

const detailProducts = [
    { id: 1, name: "NADÉA Rose", description: "Soft Floral & Romantic", price: 130000, category: "women", image: "img/nadea-rose.jpg" },
    { id: 2, name: "NADÉA Velvet", description: "Warm Woody & Elegant", price: 150000, category: "men", image: "img/nadea-velvet.jpg" },
    { id: 3, name: "NADÉA Bloom", description: "Fresh Floral & Sweet", price: 145000, category: "women", image: "img/nadea-bloom.jpg" },
    { id: 4, name: "NADÉA Noir", description: "Deep, Bold & Mysterious", price: 200000, category: "unisex", image: "img/nadea-noir.jpg" },
    { id: 5, name: "NADÉA Vanilla", description: "Sweet & Warm Vanilla", price: 180000, category: "unisex", image: "img/nadea-vanilla.jpg" },
    { id: 6, name: "NADÉA Oud", description: "Rich Woody & Oriental", price: 210000, category: "men", image: "img/nadea-oud.jpg" }
];

let savedProducts = [];

try {
    savedProducts = JSON.parse(localStorage.getItem("nadeaAdminProducts")) || [];
} catch (error) {
    savedProducts = [];
}

const products = savedProducts.length > 0 ? savedProducts : detailProducts;

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const product = products.find(item => String(item.id) === String(productId));

if (product) {
    document.getElementById("detail-name").textContent = product.name;
    document.getElementById("detail-description").textContent = product.description;
    document.getElementById("detail-price").textContent =
        "Rp" + Number(product.price).toLocaleString("id-ID");

    document.getElementById("detail-category").textContent =
        "Category: " + product.category;

    const imageMap = {
        "NADÉA Rose": "img/nadea-rose.jpg",
        "NADÉA Velvet": "img/nadea-velvet.jpg",
        "NADÉA Bloom": "img/nadea-bloom.jpg",
        "NADÉA Noir": "img/nadea-noir.jpg",
        "NADÉA Vanilla": "img/nadea-vanilla.jpg",
        "NADÉA Oud": "img/nadea-oud.jpg"
    };

    document.getElementById("detail-image").src =
        product.image || imageMap[product.name] || "img/logo-nadea.png";

    // ADD TO BAG
    document.getElementById("detail-add-cart").onclick = function () {
        const cart = JSON.parse(localStorage.getItem("nadeaCart") || "[]");

        cart.push({
            name: product.name,
            price: Number(product.price)
        });

        localStorage.setItem("nadeaCart", JSON.stringify(cart));

        alert(product.name + " berhasil ditambahkan ke My Bag!");
    };

    // ADD TO WISHLIST
    document.getElementById("detail-wishlist").onclick = function () {
        let wishlist = [];

        try {
            wishlist = JSON.parse(localStorage.getItem("nadeaWishlist") || "[]");
        } catch (error) {
            wishlist = [];
        }

        const savedProduct = {
            ...product,
            id: product.id ?? product.name,
            price: Number(product.price),
            image: product.image || imageMap[product.name] || "img/logo-nadea.png"
        };

        if (wishlist.some(item => String(item.id) === String(savedProduct.id))) {
            alert("Produk sudah ada di Wishlist!");
            return;
        }

        wishlist.push(savedProduct);

        localStorage.setItem("nadeaWishlist", JSON.stringify(wishlist));

        alert(product.name + " berhasil ditambahkan ke Wishlist!");

        console.log("Wishlist tersimpan:", localStorage.getItem("nadeaWishlist"));
    };

} else {
    document.querySelector(".detail-info").innerHTML = `
        <h1>Produk tidak ditemukan</h1>
        <p>Silakan kembali ke halaman Collection.</p>
        <a href="shop.html">Kembali ke Collection</a>
    `;
}
