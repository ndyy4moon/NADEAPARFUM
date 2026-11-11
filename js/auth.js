// ======================================
// NADÉA PARFUM - AUTHENTICATION
// ======================================

// Mengambil data akun
function getUsers() {
    return JSON.parse(localStorage.getItem("nadeaUsers")) || [];
}

// REGISTER
const registerForm = document.getElementById("register-form");

if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nama = document.getElementById("nama").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("Konfirmasi password tidak cocok!");
            return;
        }

        const users = getUsers();

        const emailExists = users.some(function(user) {
            return user.email === email;
        });

        if (emailExists) {
            alert("Email sudah terdaftar. Silakan login.");
            return;
        }

        users.push({
            nama: nama,
            email: email,
            password: password
        });

        localStorage.setItem("nadeaUsers", JSON.stringify(users));

        alert("Registrasi berhasil! Silakan login.");

        window.location.href = "login.html";
    });
}

// LOGIN
const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;

        const users = getUsers();

        const user = users.find(function(item) {
            return item.email === email && item.password === password;
        });

        if (!user) {
            alert("Email atau password salah!");
            return;
        }

        localStorage.setItem("nadeaCurrentUser", JSON.stringify(user));

        alert("Selamat datang, " + user.nama + "!");

        window.location.href = "index.html";
    });
}

console.log("NADÉA PARFUM Authentication berhasil dimuat!");
