import Helper from "../helper.js";

Helper.register("kontak", () => {

  const btnWa = Helper.getElement("#btnWa");
  btnWa.onTheEvents("click", () => {
    const nama  = document.querySelector("#inputNama").value.trim();
    const email = document.querySelector("#inputEmail").value.trim();
    const pesan = document.querySelector("#inputPesan").value.trim();
    if (!nama || !pesan) {
      alert("Mohon isi Nama dan Pesan terlebih dahulu.");
      return;
    }
    const teks = `Halo Azqilana!%0ANama: ${nama}%0AEmail: ${email}%0APesan: ${pesan}`;
    window.open(`https://wa.me/628123456789?text=${teks}`, "_blank");
  });

  const kirim = document.querySelector("#btnKirim");
  kirim.addEventListener("click", () => {
    const nama  = document.querySelector("#inputNama").value.trim();
    const email = document.querySelector("#inputEmail").value.trim();
    const pesan = document.querySelector("#inputPesan").value.trim();

    if (!nama || !email || !pesan) {
      alert("Mohon lengkapi semua field.");
      return;
    }

    kirim.disabled = true;
    kirim.textContent = "Mengirim...";

    fetch(
      "https://script.google.com/macros/s/AKfycbz37d10__CCvUQHe7SuRc3DfsPms7W1Iw2MlQR3cSSeFOl_b61Kx6NiOtkf9QJIMCVC7Q/exec",
      {
        method: "POST",
        body: JSON.stringify({ nama, email, pesan }),
      }
    )
      .then(() => {
        kirim.textContent = "Terkirim ✓";
        document.querySelector("#inputNama").value = "";
        document.querySelector("#inputEmail").value = "";
        document.querySelector("#inputPesan").value = "";
        setTimeout(() => {
          kirim.textContent = "Kirim";
          kirim.disabled = false;
        }, 2000);
      })
      .catch(() => {
        alert("Gagal kirim, coba lagi.");
        kirim.textContent = "Kirim";
        kirim.disabled = false;
      });
  });

});
