(() => {
  // Tema terang / gelap
  const root = document.documentElement;
  const btn = document.getElementById("tema");

  const paint = () => {
    const dark = root.dataset.theme === "dark";
    btn.querySelector(".lbl").textContent = dark ? "Terang" : "Gelap";
    btn.querySelector(".ico").textContent = dark
      ? "\u2600\uFE0E"
      : "\u263E\uFE0E";
    btn.setAttribute(
      "aria-label",
      dark ? "Ganti ke mode terang" : "Ganti ke mode gelap",
    );
  };

  // Tema dibawa lewat nama tab dan parameter di tautan menu, supaya jalan
  // juga saat file dibuka langsung (tanpa bergantung pada penyimpanan browser)
  const bawa = () => {
    const t = root.dataset.theme;
    window.name = `tema:${t}`;
    document.querySelectorAll("a[href]").forEach((a) => {
      const h = a.getAttribute("href");
      if (/^[\w-]+\.html/.test(h)) {
        a.setAttribute("href", `${h.split("?")[0]}?tema=${t}`);
      }
    });
  };

  btn.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("tema", root.dataset.theme);
    } catch {}
    bawa();
    paint();
  });
  paint();
  bawa();

  // Menu hamburger (HP)
  const menu = document.getElementById("menu");
  const nav = document.getElementById("nav");

  const tutup = () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Buka menu");
  };

  menu.addEventListener("click", () => {
    const o = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(o));
    menu.setAttribute("aria-label", o ? "Tutup menu" : "Buka menu");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") tutup();
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".bar")) tutup();
  });

  // Formulir kontak (sama seperti portofolio lama)
  const form = document.getElementById("contactForm");
  if (!form) return;

  const WA = "6287732902083";
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbz37d10__CCvUQHe7SuRc3DfsPms7W1Iw2MlQR3cSSeFOl_b61Kx6NiOtkf9QJIMCVC7Q/exec";
  const $ = (id) => document.getElementById(id);
  const status = $("status");
  const kirim = $("kirim");

  const ambil = () => {
    const d = {
      nama: $("nama").value.trim(),
      email: $("email").value.trim(),
      pesan: $("pesan").value.trim(),
    };
    let e = "";
    if (d.nama.length < 3) e = "Nama minimal 3 karakter";
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(d.email))
      e = "Format email tidak valid";
    else if (d.pesan.length < 10) e = "Pesan minimal 10 karakter";
    status.textContent = e;
    return e ? null : d;
  };

  $("whatsapp").addEventListener("click", () => {
    const d = ambil();
    if (!d) return;
    const { nama, email, pesan } = d;
    const teks = encodeURIComponent(
      `Halo, nama saya ${nama}.\nE-mail: ${email}\n\n${pesan}`,
    );
    window.open(`https://wa.me/${WA}?text=${teks}`, "_blank");
  });

  kirim.addEventListener("click", async () => {
    const d = ambil();
    if (!d) return;
    kirim.disabled = true;
    kirim.textContent = "Mengirim...";
    try {
      await fetch(SCRIPT_URL, { method: "POST", body: JSON.stringify(d) });
      kirim.textContent = "Terkirim ✓";
      setTimeout(() => {
        kirim.textContent = "Kirim";
        kirim.disabled = false;
      }, 2000);
    } catch {
      status.textContent = "Gagal kirim, coba lagi atau pakai WhatsApp";
      kirim.textContent = "Kirim";
      kirim.disabled = false;
    }
  });
})();
