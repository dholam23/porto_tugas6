// Toggle Tema Gelap / Terang
document.getElementById("toggleTheme")?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Validasi Form Kontak
document.getElementById("contactForm")?.addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah submit default

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("pesan").value.trim();
    const msg = document.getElementById("formMsg");

    if (!name || !email || !message) {
        msg.textContent = "Semua field harus diisi!";
        msg.style.color = "red";
    } else {
        msg.textContent = "Form berhasil dikirim!";
        msg.style.color = "green";
        this.reset(); // Kosongkan form
    }
});

// Fungsi untuk menampilkan ulang data tamu dari localStorage
function tampilkanGuestList() {
    const list = document.getElementById("guestList");
    list.innerHTML = "";

    const guests = JSON.parse(localStorage.getItem("guestListData")) || [];

    guests.forEach((guest, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${guest.name}</strong> - ${guest.email}`;

        const btnHapus = document.createElement("button");
        btnHapus.textContent = "Hapus";
        btnHapus.style.marginLeft = "10px";
        btnHapus.onclick = () => {
            guests.splice(index, 1);
            localStorage.setItem("guestListData", JSON.stringify(guests));
            tampilkanGuestList();
        };

        li.appendChild(btnHapus);
        list.appendChild(li);
    });
}

// Form Buku Tamu: Tambah Nama dan Email
document.getElementById("formBukuTamu")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("guestName").value.trim();
    const email = document.getElementById("guestEmail").value.trim();

    if (!name || !email) return;

    const guests = JSON.parse(localStorage.getItem("guestListData")) || [];
    guests.push({ name, email });
    localStorage.setItem("guestListData", JSON.stringify(guests));

    tampilkanGuestList();
    this.reset(); // Bersihkan form
});

// Tampilkan data tamu saat halaman dimuat
document.addEventListener("DOMContentLoaded", tampilkanGuestList);

// Event Handling: Ambil Postingan dari API Online
document.getElementById("fetchPosts")?.addEventListener("click", function () {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
        .then(response => {
            if (!response.ok) {
                throw new Error("Gagal mengambil data");
            }
            return response.json();
        })
        .then(posts => {
            const list = document.getElementById("postList");
            list.innerHTML = ""; // Kosongkan list sebelumnya

            posts.forEach(post => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>${post.title}</strong><br>${post.body}`;
                list.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Terjadi kesalahan:", error);
        });
});

// Event Handling: Tampilkan Gambar dari API di section Multimedia
document.getElementById("loadMedia")?.addEventListener("click", function () {
    const mediaContainer = document.getElementById("mediaContainer");
    mediaContainer.innerHTML = "<p>Memuat gambar dari API...</p>";

    fetch("https://picsum.photos/v2/list?page=1&limit=3")  // Mengambil 3 gambar dari API
        .then(response => response.json())
        .then(images => {
            mediaContainer.innerHTML = "<h4>Gambar dari API:</h4>";
            images.forEach(img => {
                const image = document.createElement("img");
                image.src = img.download_url;
                image.alt = img.author;
                image.width = 300;
                image.style.margin = "10px";
                mediaContainer.appendChild(image);
            });
        })
        .catch(error => {
            mediaContainer.innerHTML = "<p>Gagal memuat gambar dari API.</p>";
            console.error("Kesalahan saat memuat gambar:", error);
        });
});


