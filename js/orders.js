// ======================================
// NADÉA PARFUM - MY ORDERS
// ======================================

function getOrders() {
    return JSON.parse(localStorage.getItem("nadeaOrders")) || [];
}

function formatPrice(price) {
    return "Rp" + price.toLocaleString("id-ID");
}

function displayOrders() {
    const ordersList = document.getElementById("orders-list");
    const orders = getOrders();

    ordersList.innerHTML = "";

    if (orders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-orders">
                <h3>No Orders Yet</h3>
                <p>Kamu belum memiliki pesanan di NADÉA PARFUM.</p>
                <a href="shop.html">Explore Collection</a>
            </div>
        `;
        return;
    }

    orders.slice().reverse().forEach(function(order) {
        let productsHTML = "";

        order.items.forEach(function(item) {
            productsHTML += `
                <div class="order-product">
                    <span>${item.name}</span>
                    <span>${formatPrice(item.price)}</span>
                </div>
            `;
        });

        ordersList.innerHTML += `
            <div class="order-card">

                <div class="order-header">
                    <h3>Order #${order.id}</h3>
                    <span class="order-status">${order.status}</span>
                </div>

                <div class="order-info">
                    <p><strong>Tanggal:</strong> ${order.tanggal}</p>
                    <p><strong>Nama:</strong> ${order.nama}</p>
                    <p><strong>Nomor HP:</strong> ${order.telepon}</p>
                    <p><strong>Alamat:</strong> ${order.alamat}</p>
                    <p><strong>Pembayaran:</strong> ${order.pembayaran}</p>
                </div>

                <div class="order-products">
                    ${productsHTML}
                </div>

                <div class="order-total">
                    <span>Total Pembayaran</span>
                    <span>${formatPrice(order.total)}</span>
                </div>

            </div>
        `;
    });
}

displayOrders();

console.log("NADÉA PARFUM My Orders berhasil dimuat!");
