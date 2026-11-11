// ======================================
// NADÉA PARFUM - CHECKOUT
// ======================================

function getCart() {
    return JSON.parse(localStorage.getItem("nadeaCart")) || [];
}

function formatPrice(price) {
    return "Rp" + price.toLocaleString("id-ID");
}

// Menampilkan ringkasan pesanan
function displayCheckout() {
    const cart = getCart();
    const checkoutItems = document.getElementById("checkout-items");
    const checkoutTotal = document.getElementById("checkout-total");

    let total = 0;

    if (cart.length === 0) {
        checkoutItems.innerHTML = `
            <p>Keranjang kamu masih kosong.</p>
            <a href="shop.html">Kembali ke Collection</a>
        `;
        checkoutTotal.textContent = "Rp0";
        return;
    }

    checkoutItems.innerHTML = "";

    cart.forEach(function(item) {
        total += item.price;

        checkoutItems.innerHTML += `
            <div class="order-item">
                <span>${item.name}</span>
                <span>${formatPrice(item.price)}</span>
            </div>
        `;
    });

    checkoutTotal.textContent = formatPrice(total);
}

// Memproses pesanan
document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const cart = getCart();

    if (cart.length === 0) {
        alert("Keranjang belanja kamu masih kosong!");
        return;
    }

    const nama = document.getElementById("nama").value.trim();
    const telepon = document.getElementById("telepon").value.trim();
    const alamat = document.getElementById("alamat").value.trim();
    const pembayaran = document.getElementById("pembayaran").value;

    const total = cart.reduce(function(sum, item) {
        return sum + item.price;
    }, 0);

    const order = {
        id: "NDP-" + Date.now(),
        nama: nama,
        telepon: telepon,
        alamat: alamat,
        pembayaran: pembayaran,
        items: cart,
        total: total,
        tanggal: new Date().toLocaleString("id-ID"),
        status: "Menunggu konfirmasi"
    };

    let orders = JSON.parse(localStorage.getItem("nadeaOrders")) || [];
    orders.push(order);

    localStorage.setItem("nadeaOrders", JSON.stringify(orders));
    localStorage.removeItem("nadeaCart");

    alert(
        "Pesanan berhasil dibuat!\n\n" +
        "Nomor Pesanan: " + order.id + "\n" +
        "Total: " + formatPrice(total) + "\n\n" +
        "Terima kasih sudah memilih NADÉA PARFUM!"
    );

    window.location.href = "orders.html";
});

displayCheckout();

console.log("NADÉA PARFUM Checkout berhasil dimuat!");
