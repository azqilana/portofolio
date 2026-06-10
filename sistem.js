const hamenu = document.querySelector("#hamburger");
const nav = document.querySelector("#nav");
hamenu.addEventListener("click", () => {
  nav.classList.toggle("aktif");
  hamenu.classList.toggle("aktif");

  if (nav.classList.contains("aktif")) {
    const hRect = hamenu.getBoundingClientRect();
    const navWidth = nav.offsetWidth;
    nav.style.left = (hRect.right - navWidth) + "px";
    nav.style.top = (hRect.bottom + 26) + "px";
  } else {
    nav.style.left = "";
    nav.style.top = "";
  }
});
const tema = document.querySelector("#tema")
tema.addEventListener('click', () => {
  if (document.documentElement.getAttribute('data-theme') === 'gelap') {
    document.documentElement.removeAttribute('data-theme')
    tema.textContent = "Gelap"
  } else {
    document.documentElement.setAttribute('data-theme', 'gelap')
    tema.textContent = "Terang"
  }
})
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !hamenu.contains(e.target)) {
    nav.classList.remove("aktif");
    hamenu.classList.remove("aktif");
  }
});
const Wa = document.querySelector("#whatsapp")
const kirim = document.querySelector('#kirim');
class AksiForm {
  constructor() {
    this.namaInput = document.querySelector('#nama')
    this.emailInput = document.querySelector('#email')
    this.pesanTextarea = document.querySelector('#pesan')
  }
  ambilIsi() {
    this.nama = this.namaInput.value.trim()
    this.email = this.emailInput.value.trim()
    this.pesan = this.pesanTextarea.value.trim()
  }
  filter() {
    if (this.nama.length < 3) {
      alert('Nama minimal 3 karakter');
      return false;
    }

    this.emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(this.email);
    if (!this.emailValid) {
      alert('Format email tidak valid');
      return false;
    }

    if (this.pesan.length < 10) {
      alert('Pesan minimal 10 karakter');
      return false;
    }
    return true;
  }
  kirimWhatsApp() {
    this.wa = "087732902083"
    this.teks = encodeURIComponent(`Halo, nama saya ${this.nama}.\nE-mail: ${this.email}\n\n${this.pesan}`);
    window.open(`https://wa.me/${this.wa}?text=${this.teks}`, '_blank');
  }
  kirimSheet() {
    kirim.disabled = true;
    kirim.textContent = 'Mengirim...';

    fetch('https://script.google.com/macros/s/AKfycbz37d10__CCvUQHe7SuRc3DfsPms7W1Iw2MlQR3cSSeFOl_b61Kx6NiOtkf9QJIMCVC7Q/exec', {
      method: 'POST',
      body: JSON.stringify({
        nama: this.nama, email: this.email, pesan: this.pesan
      })
    })
    .then(() => {
      kirim.textContent = 'Terkirim ✓';
      if (kirim.textContent = 'Terkirim ✓') {
        kirim.textContent = 'Kirim';
      }
    })
    .catch(() => alert('Gagal kirim'));
  }
}
const Af = new AksiForm()
Wa.addEventListener('click', (e) => {
  e.preventDefault();
  Af.ambilIsi()
  if (!Af.filter()) return;
  Af.kirimWhatsApp();
});
kirim.addEventListener('click', (e) => {
  e.preventDefault();
  Af.ambilIsi()
  if (!Af.filter()) return;
  Af.kirimSheet();
});