(function () {

  // Tema terang / gelap
  var root = document.documentElement, btn = document.getElementById("tema");
  function paint() {
    var dark = root.dataset.theme === "dark";
    btn.querySelector(".lbl").textContent = dark ? "Terang" : "Gelap";
    btn.querySelector(".ico").textContent = dark ? "\u2600\uFE0E" : "\u263E\uFE0E";
    btn.setAttribute("aria-label", dark ? "Ganti ke mode terang" : "Ganti ke mode gelap");
  }
  // Tema dibawa lewat nama tab dan parameter di tautan menu, supaya jalan
  // juga saat file dibuka langsung (tanpa bergantung pada penyimpanan browser)
  function bawa() {
    var t = root.dataset.theme;
    window.name = "tema:" + t;
    document.querySelectorAll("a[href]").forEach(function (a) {
      var h = a.getAttribute("href");
      if (/^[\w-]+\.html/.test(h)) a.setAttribute("href", h.split("?")[0] + "?tema=" + t);
    });
  }
  btn.addEventListener("click", function () {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("tema", root.dataset.theme); } catch (e) {}
    bawa(); paint();
  });
  paint(); bawa();

  // Menu hamburger (HP)
  var menu = document.getElementById("menu"), nav = document.getElementById("nav");
  function tutup() {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Buka menu");
  }
  menu.addEventListener("click", function () {
    var o = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(o));
    menu.setAttribute("aria-label", o ? "Tutup menu" : "Buka menu");
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") tutup(); });
  document.addEventListener("click", function (e) { if (!e.target.closest(".bar")) tutup(); });

  // Formulir kontak (sama seperti portofolio lama)
  var form = document.getElementById("contactForm");
  if (!form) return;
  var WA = "6287732902083";
  var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz37d10__CCvUQHe7SuRc3DfsPms7W1Iw2MlQR3cSSeFOl_b61Kx6NiOtkf9QJIMCVC7Q/exec";
  var $ = function (id) { return document.getElementById(id); };
  var status = $("status"), kirim = $("kirim");

  function ambil() {
    var d = { nama: $("nama").value.trim(), email: $("email").value.trim(), pesan: $("pesan").value.trim() };
    var e = "";
    if (d.nama.length < 3) e = "Nama minimal 3 karakter";
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(d.email)) e = "Format email tidak valid";
    else if (d.pesan.length < 10) e = "Pesan minimal 10 karakter";
    status.textContent = e;
    return e ? null : d;
  }

  $("whatsapp").addEventListener("click", function () {
    var d = ambil(); if (!d) return;
    var teks = encodeURIComponent("Halo, nama saya " + d.nama + ".\nE-mail: " + d.email + "\n\n" + d.pesan);
    window.open("https://wa.me/" + WA + "?text=" + teks, "_blank");
  });

  kirim.addEventListener("click", function () {
    var d = ambil(); if (!d) return;
    kirim.disabled = true; kirim.textContent = "Mengirim...";
    fetch(SCRIPT_URL, { method: "POST", body: JSON.stringify(d) })
      .then(function () {
        kirim.textContent = "Terkirim ✓";
        setTimeout(function () { kirim.textContent = "Kirim"; kirim.disabled = false; }, 2000);
      })
      .catch(function () {
        status.textContent = "Gagal kirim, coba lagi atau pakai WhatsApp";
        kirim.textContent = "Kirim"; kirim.disabled = false;
      });
  });
})();
