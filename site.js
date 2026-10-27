(function () {
  var SPRITE = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none"><symbol id="linkedin" viewBox="0 0 640 640"><path fill="#0077b5" d="M196.3 512L103.4 512L103.4 212.9L196.3 212.9L196.3 512zM149.8 172.1C120.1 172.1 96 147.5 96 117.8C96 103.5 101.7 89.9 111.8 79.8C121.9 69.7 135.6 64 149.8 64C164 64 177.7 69.7 187.8 79.8C197.9 89.9 203.6 103.6 203.6 117.8C203.6 147.5 179.5 172.1 149.8 172.1zM543.9 512L451.2 512L451.2 366.4C451.2 331.7 450.5 287.2 402.9 287.2C354.6 287.2 347.2 324.9 347.2 363.9L347.2 512L254.4 512L254.4 212.9L343.5 212.9L343.5 253.7L344.8 253.7C357.2 230.2 387.5 205.4 432.7 205.4C526.7 205.4 544 267.3 544 347.7L544 512L543.9 512z" /></symbol><symbol id="github" viewBox="0 0 640 640"><path fill="currentColor" d="M237.9 461.4C237.9 463.4 235.6 465 232.7 465C229.4 465.3 227.1 463.7 227.1 461.4C227.1 459.4 229.4 457.8 232.3 457.8C235.3 457.5 237.9 459.1 237.9 461.4zM206.8 456.9C206.1 458.9 208.1 461.2 211.1 461.8C213.7 462.8 216.7 461.8 217.3 459.8C217.9 457.8 216 455.5 213 454.6C210.4 453.9 207.5 454.9 206.8 456.9zM251 455.2C248.1 455.9 246.1 457.8 246.4 460.1C246.7 462.1 249.3 463.4 252.3 462.7C255.2 462 257.2 460.1 256.9 458.1C256.6 456.2 253.9 454.9 251 455.2zM316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72zM169.2 416.9C167.9 417.9 168.2 420.2 169.9 422.1C171.5 423.7 173.8 424.4 175.1 423.1C176.4 422.1 176.1 419.8 174.4 417.9C172.8 416.3 170.5 415.6 169.2 416.9zM158.4 408.8C157.7 410.1 158.7 411.7 160.7 412.7C162.3 413.7 164.3 413.4 165 412C165.7 410.7 164.7 409.1 162.7 408.1C160.7 407.5 159.1 407.8 158.4 408.8zM190.8 444.4C189.2 445.7 189.8 448.7 192.1 450.6C194.4 452.9 197.3 453.2 198.6 451.6C199.9 450.3 199.3 447.3 197.3 445.4C195.1 443.1 192.1 442.8 190.8 444.4zM179.4 429.7C177.8 430.7 177.8 433.3 179.4 435.6C181 437.9 183.7 438.9 185 437.9C186.6 436.6 186.6 434 185 431.7C183.6 429.4 181 428.4 179.4 429.7z" /></symbol></svg>`;
  var pages = [["index.html", "Beranda"], ["karya.html", "Karya"], ["tentang.html", "Tentang"], ["kontak.html", "Kontak"]];
  var cur = document.body.dataset.page;
  var links = pages.map(function (p) {
    return '<a href="' + p[0] + '"' + (p[0] === cur ? ' aria-current="page"' : "") + ">" + p[1] + "</a>";
  }).join("");
  document.body.insertAdjacentHTML("afterbegin", SPRITE);
  document.body.insertAdjacentHTML("afterbegin",
    '<header class="bar"><a class="logo" href="index.html"><b>Azqilana</b><small>Mulai aja dulu</small></a><nav aria-label="Menu utama">' + links + '</nav><button id="tema" type="button"></button></header>');
  document.body.insertAdjacentHTML("beforeend", "<footer>© 2026 Azqilana. Mulai aja dulu.</footer>");

  // Tema terang / gelap
  var root = document.documentElement, btn = document.getElementById("tema");
  function paint() {
    var dark = root.dataset.theme === "dark";
    btn.textContent = dark ? "Terang" : "Gelap";
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
