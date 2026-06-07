const hamenu = document.querySelector("#hamburger");
const nav = document.querySelector("#nav");
hamenu.addEventListener("click", () => {
  nav.classList.toggle("aktif");
  hamenu.classList.toggle("aktif")
});
const tema=document.querySelector("#tema")
tema.addEventListener('click', () => {
  if (document.documentElement.getAttribute('data-theme') === 'gelap') {
    document.documentElement.removeAttribute('data-theme')
    tema.textContent = "Gelap"
  } else {
    document.documentElement.setAttribute('data-theme', 'gelap')
    tema.textContent = "Terang"
  }
})
const Wa=document.querySelector("#whatsapp")

Wa.addEventListener('click', (e) => {
  e.preventDefault();

  const nama = document.querySelector('#nama').value.trim();
  const email = document.querySelector('#email').value.trim();
  const pesan = document.querySelector('#pesan').value.trim();

  // Validasi
  if (nama.length < 3) {
    alert('Nama minimal 3 karakter');
    return;
  }

  const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/. test(email);
  if (!emailValid) {
    alert('Format email tidak valid');
    return;
  }

  if (pesan.length < 10) {
    alert('Pesan minimal 10 karakter');
    return;
  }

  const NOMOR_WA = '6281234567890';
  const teks = encodeURIComponent(`Halo, nama saya ${nama}.\nE-mail: ${email}\n\n${pesan}`);
  window.open(`https://wa.me/${NOMOR_WA}?text=${teks}`, '_blank');
});

const kirim = document.querySelector('#kirim');

kirim.addEventListener('click', (e) => {
  e.preventDefault();
  
  const nama = document.querySelector('#nama').value.trim();
  const email = document.querySelector('#email').value.trim();
  const pesan = document.querySelector('#pesan').value.trim();
  kirim.disabled = true;
  kirim.textContent = 'Mengirim...';

  fetch('https://script.google.com/macros/s/AKfycbz37d10__CCvUQHe7SuRc3DfsPms7W1Iw2MlQR3cSSeFOl_b61Kx6NiOtkf9QJIMCVC7Q/exec', {
    method: 'POST',
    body: JSON.stringify({ nama, email, pesan })
  })
  .then(() =>{
    kirim.textContent = 'Terkirim ✓';
  })
  .catch(() => alert('Gagal kirim'));
});