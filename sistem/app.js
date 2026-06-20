import kelolaRute from "./kelola.js";
  const kR = new kelolaRute();
  const dataM = document.querySelector("#data-main");
  const main = document.createElement("main");
  main.setAttribute("id", "#data-main");
  document.addEventListener("click", async (e) => {
    const el = e.target.closest("a");
    const w_origin = window.location.origin;
    if (
      el &&
      el.hasAttribute("href") &&
      el.getAttribute("href") &&
      el.origin === w_origin
    ) {
      const hrefnya = el.getAttribute("href");
      e.preventDefault();
      history.pushState(null, "", hrefnya);
      const hasilRute = await kR.cekRute(hrefnya);
      // main.replaceWith(hasilRute);

      main.innerHTML = hasilRute;
      dataM.replaceWith(main);
    }
  });
  window.addEventListener("popstate", async () => {
    const hasilRute = await kR.cekRute(window.location.pathname);
    // main.replaceWith(hasilRute);
    main.innerHTML = hasilRute;
    dataM.replaceWith(main);
  });
  window.addEventListener("DOMContentLoaded", async () => {
    const hasilRute = await kR.cekRute(window.location.pathname);
    // main.replaceWith(hasilRute);
    main.innerHTML = hasilRute;
    dataM.replaceWith(main);
  });
export function jalankan(element,script) {
  if (element) {
    script()
  }else{
    console.log("Element belum ada")
    }
}