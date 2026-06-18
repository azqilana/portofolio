const hamenu = document.querySelector("#hamburger");
const nav = document.querySelector("#nav");

hamenu.addEventListener("click", () => console.log("klik!"));
hamenu.addEventListener("click", () => {
  nav.classList.toggle("aktif");
  hamenu.classList.toggle("aktif");

  if (nav.classList.contains("aktif")) {
    const hRect = hamenu.getBoundingClientRect();
    const navWidth = nav.offsetWidth;
    nav.style.left = hRect.right - navWidth + "px";
    nav.style.top = hRect.bottom + 26 + "px";
  } else {
    nav.style.left = "";
    nav.style.top = "";
  }
});
// fhfjfj
document.addEventListener("click", (e) => {
  if (!hamenu.contains(e.target)) {
    nav.classList.remove("aktif");
    hamenu.classList.remove("aktif");
    nav.style.left = ""; // tambah ini
    nav.style.top = "";
  }
});
const tema = document.querySelector("#tema");
class PengaturTema {
  constructor(Tombol) {
    this.tombol = Tombol;
  }

  // 1. Fungsi untuk mengecek dan menerapkan tema saat pertama kali web dibuka
  inisialisasi() {
    // Cek apakah sistem perangkat user menggunakan Dark Mode
    const perangkatModeGelap = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (perangkatModeGelap) {
      this.setModeGelap();
    } else {
      this.setModeTerang();
    }

    // Jalankan event listener klik tombol
    this.tombol.addEventListener("click", () => this.handleKlik());
  }

  // 2. Fungsi untuk mengatur tampilan ke mode gelap
  setModeGelap() {
    document.documentElement.setAttribute("data-theme", "gelap");
    this.tombol.textContent = "Terang";
    this.tombol.setAttribute("aria-label", "tombol tema terang");
  }

  // 3. Fungsi untuk mengatur tampilan ke mode terang
  setModeTerang() {
    document.documentElement.removeAttribute("data-theme");
    this.tombol.textContent = "Gelap";
    this.tombol.setAttribute("aria-label", "tombol tema gelap");
  }

  // 4. Logika ketika tombol tema diklik
  handleKlik() {
    const isGelap =
      document.documentElement.getAttribute("data-theme") === "gelap";
    if (isGelap) {
      this.setModeTerang();
    } else {
      this.setModeGelap();
    }
  }
}

// --- CARA PAKAINYA ---
// Buat objek baru dari class PengaturTema dan jalankan inisialisasi
const temaAplikasi = new PengaturTema(tema);
temaAplikasi.inisialisasi();

const Wa = document.querySelector("#whatsapp");
const kirim = document.querySelector("#kirim");
class AksiForm {
  constructor() {
    this.namaInput = document.querySelector("#nama");
    this.emailInput = document.querySelector("#email");
    this.pesanTextarea = document.querySelector("#pesan");
  }
  ambilIsi() {
    this.nama = this.namaInput.value.trim();
    this.email = this.emailInput.value.trim();
    this.pesan = this.pesanTextarea.value.trim();
  }
  filter() {
    if (this.nama.length < 3) {
      alert("Nama minimal 3 karakter");
      return false;
    }

    this.emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(
      this.email,
    );
    if (!this.emailValid) {
      alert("Format email tidak valid");
      return false;
    }

    if (this.pesan.length < 10) {
      alert("Pesan minimal 10 karakter");
      return false;
    }
    return true;
  }
  kirimWhatsApp() {
    this.wa = "087732902083";
    this.teks = encodeURIComponent(
      `Halo, nama saya ${this.nama}.\nE-mail: ${this.email}\n\n${this.pesan}`,
    );
    window.open(`https://wa.me/${this.wa}?text=${this.teks}`, "_blank");
  }
  kirimSheet() {
    kirim.disabled = true;
    kirim.textContent = "Mengirim...";

    fetch(
      "https://script.google.com/macros/s/AKfycbz37d10__CCvUQHe7SuRc3DfsPms7W1Iw2MlQR3cSSeFOl_b61Kx6NiOtkf9QJIMCVC7Q/exec",
      {
        method: "POST",
        body: JSON.stringify({
          nama: this.nama,
          email: this.email,
          pesan: this.pesan,
        }),
      },
    )
      .then(() => {
        kirim.textContent = "Terkirim ✓";
        if ((kirim.textContent = "Terkirim ✓")) {
          kirim.textContent = "Kirim";
        }
      })
      .catch(() => alert("Gagal kirim"));
  }
}
if (Wa && kirim) {
  const Af = new AksiForm();
  Wa.addEventListener("click", (e) => {
    e.preventDefault();
    Af.ambilIsi();
    if (!Af.filter()) return;
    Af.kirimWhatsApp();
  });
  kirim.addEventListener("click", (e) => {
    e.preventDefault();
    Af.ambilIsi();
    if (!Af.filter()) return;
    Af.kirimSheet();
  });
}
