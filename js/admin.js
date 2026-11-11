// ======================================
// NADÉA PARFUM - ADMIN MANAGEMENT
// ======================================

// DATA PRODUK BAWAAN
const defaultProducts = [
    {
        id: 1,
        name: "NADÉA Rose",
        description: "Soft Floral & Romantic",
        price: 130000,
        category: "women",
        image: "img/nadea-rose.jpg"
    },
    {
        id: 2,
        name: "NADÉA Velvet",
        description: "Warm Woody & Elegant",
        price: 150000,
        category: "men",
        image: "img/nadea-velvet.jpg"
    },
    {
        id: 3,
        name: "NADÉA Bloom",
        description: "Fresh Floral & Sweet",
        price: 145000,
        category: "women",
        image: "img/nadea-bloom.jpg"
    },
    {
        id: 4,
        name: "NADÉA Noir",
        description: "Deep, Bold & Mysterious",
        price: 200000,
        category: "unisex",
        image: "img/nadea-noir.jpg"
    },
    {
        id: 5,
        name: "NADÉA Vanilla",
        description: "Sweet & Warm Vanilla",
        price: 180000,
        category: "unisex",
        image: "img/nadea-vanilla.jpg"
    },
    {
        id: 6,
        name: "NADÉA Oud",
        description: "Rich Woody & Oriental",
        price: 210000,
        category: "men",
        image: "img/nadea-oud.jpg"
    }
];

// ======================================
// DATA STORAGE
// ======================================

function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function formatPrice(price) {
    return "Rp" + Number(price).toLocaleString("id-ID");
}

function getProducts() {
    const saved = localStorage.getItem("nadeaAdminProducts");

    if (saved === null) {
        localStorage.setItem(
            "nadeaAdminProducts",
            JSON.stringify(defaultProducts)
        );

        return defaultProducts;
    }

    return JSON.parse(saved);
}

function saveProducts(products) {
    localStorage.setItem(
        "nadeaAdminProducts",
        JSON.stringify(products)
    );
}

// ======================================
// IMAGE HANDLING
// ======================================

let selectedProductImage = "";

function compressImage(file) {
    return new Promise(function(resolve, reject) {
        if (!file || !file.type.startsWith("image/")) {
            reject(new Error("File harus berupa gambar."));
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            reject(new Error("Ukuran foto maksimal 5 MB."));
            return;
        }

        const reader = new FileReader();

        reader.onload = function(event) {
            const image = new Image();

            image.onload = function() {
                const canvas = document.createElement("canvas");
                const maxSize = 600;

                let width = image.width;
                let height = image.height;

                if (width > height && width > maxSize) {
                    height = Math.round(height * maxSize / width);
                    width = maxSize;
                } else if (height > maxSize) {
                    width = Math.round(width * maxSize / height);
                    height = maxSize;
                }

                canvas.width = width;
                canvas.height = height;

                const context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, width, height);

                resolve(canvas.toDataURL("image/jpeg", 0.75));
            };

            image.onerror = function() {
                reject(new Error("Foto tidak dapat dibaca."));
            };

            image.src = event.target.result;
        };

        reader.onerror = function() {
            reject(new Error("Gagal membaca foto."));
        };

        reader.readAsDataURL(file);
    });
}

// Preview foto
const imageInput = document.getElementById("product-image");
const imagePreview = document.getElementById("image-preview");

if (imageInput) {
    imageInput.addEventListener("change", async function() {
        const file = this.files[0];

        if (!file) return;

        try {
            selectedProductImage = await compressImage(file);

            if (imagePreview) {
                imagePreview.src = selectedProductImage;
                imagePreview.style.display = "block";
            }
        } catch (error) {
            alert(error.message);
            this.value = "";
            selectedProductImage = "";
        }
    });
}

function resetImagePreview() {
    selectedProductImage = "";

    if (imageInput) {
        imageInput.value = "";
    }

    if (imagePreview) {
        imagePreview.src = "";
        imagePreview.style.display = "none";
    }
}

// ======================================
// DASHBOARD
// ======================================

function displayDashboard() {
    const orders = getData("nadeaOrders");
    const customers = getData("nadeaUsers");
    const products = getProducts();

    const totalProducts = document.getElementById("total-products");
    const totalOrders = document.getElementById("total-orders");
    const totalCustomers = document.getElementById("total-customers");
    const totalRevenue = document.getElementById("total-revenue");

    if (totalProducts) totalProducts.textContent = products.length;
    if (totalOrders) totalOrders.textContent = orders.length;
    if (totalCustomers) totalCustomers.textContent = customers.length;

    const revenue = orders.reduce(function(total, order) {
        return total + Number(order.total || 0);
    }, 0);

    if (totalRevenue) {
        totalRevenue.textContent = formatPrice(revenue);
    }

    displayRecentOrders();
}

function displayRecentOrders() {
    const container = document.getElementById("recent-orders-list");

    if (!container) return;

    const orders = getData("nadeaOrders");

    if (orders.length === 0) {
        container.innerHTML = "<p>Belum ada pesanan.</p>";
        return;
    }

    container.innerHTML = "";

    orders.slice(-5).reverse().forEach(function(order) {
        container.innerHTML += `
            <div style="padding:15px 0;border-bottom:1px solid #eadbd7;">
                <strong>${order.nama}</strong>
                <p>${order.id}</p>
                <strong>${formatPrice(order.total)}</strong>
            </div>
        `;
    });
}

// ======================================
// PRODUCT MANAGEMENT
// ======================================

function displayAdminProducts() {
    const tableBody = document.getElementById("product-table-body");

    if (!tableBody) return;

    const products = getProducts();

    tableBody.innerHTML = "";

    if (products.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7">Belum ada produk.</td>
            </tr>
        `;
        return;
    }

    products.forEach(function(product, index) {
        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>

                <td>
                    ${
                        product.image
                        ? `<img src="${product.image}"
                            class="product-image"
                            alt="${product.name}">`
                        : "-"
                    }
                </td>

                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${formatPrice(product.price)}</td>
                <td>${product.category}</td>

                <td>
                    <button class="edit-btn"
                        onclick="editProduct(${product.id})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteProduct(${product.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

// MENAMPILKAN FORM
function showProductForm() {
    const form = document.getElementById("product-form");

    if (!form) return;

    form.reset();
    resetImagePreview();

    document.getElementById("product-id").value = "";
    document.getElementById("form-title").textContent = "Add New Product";

    form.classList.add("active");
}

// MENUTUP FORM
function hideProductForm() {
    const form = document.getElementById("product-form");

    if (!form) return;

    form.classList.remove("active");
    form.reset();
    resetImagePreview();
}

// MENAMBAHKAN DAN MENGEDIT PRODUK
const productForm = document.getElementById("product-form");

if (productForm) {
    productForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const id = document.getElementById("product-id").value;
        const name = document.getElementById("product-name").value.trim();
        const description = document.getElementById("product-description").value.trim();
        const price = Number(document.getElementById("product-price").value);
        const category = document.getElementById("product-category").value;

        if (!name || !description || price <= 0 || !category) {
            alert("Mohon isi semua data produk dengan benar!");
            return;
        }

        const products = getProducts();

        let oldProduct = null;

        if (id) {
            oldProduct = products.find(function(product) {
                return product.id === Number(id);
            });
        }

        const image = selectedProductImage || (oldProduct && oldProduct.image) || "";

        if (!image) {
            alert("Silakan pilih foto produk terlebih dahulu!");
            return;
        }

        const productData = {
            id: id ? Number(id) : Date.now(),
            name: name,
            description: description,
            price: price,
            category: category,
            image: image
        };

        if (id) {
            const index = products.findIndex(function(product) {
                return product.id === Number(id);
            });

            if (index !== -1) {
                products[index] = productData;
            }
        } else {
            products.push(productData);
        }

        try {
            saveProducts(products);

            alert(
                id
                ? "Produk berhasil diperbarui!"
                : "Produk berhasil ditambahkan!"
            );

            displayAdminProducts();
            displayDashboard();
            hideProductForm();

        } catch (error) {
            alert("Penyimpanan gagal. Coba gunakan foto yang lebih kecil.");
        }
    });
}

// EDIT PRODUK
function editProduct(id) {
    const products = getProducts();

    const product = products.find(function(item) {
        return item.id === id;
    });

    if (!product) return;

    document.getElementById("product-id").value = product.id;
    document.getElementById("product-name").value = product.name;
    document.getElementById("product-description").value = product.description;
    document.getElementById("product-price").value = product.price;
    document.getElementById("product-category").value = product.category;

    resetImagePreview();

    if (product.image && imagePreview) {
        imagePreview.src = product.image;
        imagePreview.style.display = "block";
    }

    document.getElementById("form-title").textContent = "Edit Product";
    document.getElementById("product-form").classList.add("active");
}

// HAPUS PRODUK
function deleteProduct(id) {
    const confirmDelete = confirm("Yakin ingin menghapus produk ini?");

    if (!confirmDelete) return;

    let products = getProducts();

    products = products.filter(function(product) {
        return product.id !== id;
    });

    saveProducts(products);

    displayAdminProducts();
    displayDashboard();

    alert("Produk berhasil dihapus!");
}

// ======================================
// LOGOUT
// ======================================

function logoutAdmin() {
    const confirmLogout = confirm("Apakah kamu yakin ingin keluar?");

    if (confirmLogout) {
        window.location.href = "../index.html";
    }
}

// ======================================
// ADMIN ORDER MANAGEMENT
// ======================================

function displayAdminOrders() {
    const orders = getData("nadeaOrders");
    const orderList = document.getElementById("admin-orders-list");

    if (!orderList) return;

    if (orders.length === 0) {
        orderList.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    Belum ada pesanan.
                </td>
            </tr>
        `;
        return;
    }

    orderList.innerHTML = orders.map(function(order, index) {
        const statuses = [
            "Menunggu konfirmasi",
            "Diproses",
            "Dikirim",
            "Selesai",
            "Dibatalkan"
        ];

        return `
            <tr>
                <td>${order.id}</td>
                <td>${order.nama}</td>
                <td>${formatPrice(order.total)}</td>
                <td>${order.pembayaran || "-"}</td>

                <td>
                    <select id="status-${index}">
                        ${statuses.map(function(status) {
                            return `
                                <option value="${status}"
                                    ${order.status === status ? "selected" : ""}>
                                    ${status}
                                </option>
                            `;
                        }).join("")}
                    </select>
                </td>

                <td>
                    <button onclick="updateOrderStatus(${index})">
                        Simpan
                    </button>
                </td>
            </tr>
        `;
    }).join("");
}

function updateOrderStatus(index) {
    const orders = getData("nadeaOrders");
    const selectedStatus = document.getElementById(`status-${index}`);

    if (!orders[index] || !selectedStatus) return;

    orders[index].status = selectedStatus.value;

    localStorage.setItem("nadeaOrders", JSON.stringify(orders));

    alert("Status pesanan berhasil diperbarui!");

    displayAdminOrders();
}

// ======================================
// ADMIN CUSTOMER MANAGEMENT
// ======================================

function displayAdminCustomers() {
    const users = getData("nadeaUsers");
    const customerList = document.getElementById("admin-customers-list");

    if (!customerList) return;

    if (users.length === 0) {
        customerList.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center;">
                    Belum ada pelanggan terdaftar.
                </td>
            </tr>
        `;
        return;
    }

    customerList.innerHTML = users.map(function(user, index) {
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${user.nama}</td>
                <td>${user.email}</td>
            </tr>
        `;
    }).join("");
}

// ======================================
// JALANKAN FITUR ADMIN
// ======================================

displayDashboard();
displayAdminProducts();
displayAdminOrders();
displayAdminCustomers();

console.log("NADÉA PARFUM Admin berhasil dimuat!");
