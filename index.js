// ============================================================
// Navigasi & Scroll
// ============================================================
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  document.getElementById("nav").classList.remove("aktif");
  document.getElementById("hamburger").classList.remove("aktif");
}

const hamenu = document.querySelector("#hamburger");
const nav = document.querySelector("#nav");

hamenu.addEventListener("click", () => {
  nav.classList.toggle("aktif");
  hamenu.classList.toggle("aktif");

  if (nav.classList.contains("aktif")) {
    const hRect = hamenu.getBoundingClientRect();
    nav.style.left = hRect.left + "px";
    nav.style.top = hRect.bottom + 40 + "px";
  } else {
    nav.style.left = "";
    nav.style.top = "";
  }
});

document.addEventListener("click", (e) => {
  if (!hamenu.contains(e.target)) {
    nav.classList.remove("aktif");
    hamenu.classList.remove("aktif");
    nav.style.left = "";
    nav.style.top = "";
  }
});

// ============================================================
// Pengatur Tema (Gelap / Terang)
// ============================================================
const tema = document.querySelector("#tema");

class PengaturTema {
  constructor(Tombol) {
    this.tombol = Tombol;
  }
  inisialisasi() {
    const perangkatModeGelap = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (perangkatModeGelap) {
      this.setModeGelap();
    } else {
      this.setModeTerang();
    }

    this.tombol.addEventListener("click", () => this.handleKlik());
  }
  setModeGelap() {
    document.documentElement.setAttribute("data-theme", "gelap");
    this.tombol.textContent = "Terang";
    this.tombol.setAttribute("aria-label", "tombol tema terang");
  }
  setModeTerang() {
    document.documentElement.removeAttribute("data-theme");
    this.tombol.textContent = "Gelap";
    this.tombol.setAttribute("aria-label", "tombol tema gelap");
  }
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

const temaAplikasi = new PengaturTema(tema);
temaAplikasi.inisialisasi();

// ============================================================
// Formulir Kontak
// ============================================================
const Wa = document.querySelector("#whatsapp");
const kirim = document.querySelector("#kirim");
const element = Wa && kirim;

if (element) {
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
      this.emailValid =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(this.email);
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
      this.wa = "6287732902083";
      this.teks = encodeURIComponent(
        `Halo, nama saya ${this.nama}.\nE-mail: ${this.email}\n\n${this.pesan}`
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
        }
      )
        .then(() => {
          kirim.textContent = "Terkirim ✓";
          setTimeout(() => {
            kirim.textContent = "Kirim";
            kirim.disabled = false;
          }, 2000);
        })
        .catch(() => {
          alert("Gagal kirim");
          kirim.textContent = "Kirim";
          kirim.disabled = false;
        });
    }
  }

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
