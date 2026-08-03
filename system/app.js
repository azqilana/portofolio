import { checkPath } from "./route.js";
import { buildPage } from "./build.js";

async function runWeb() {
    try {
        const path = window.location.pathname;
        console.log(path);
        const data = await checkPath(path);
        if (!data) throw new Error("Route tidak ditemukan");
        await buildPage(data);
    } catch (err) {
        console.error("runWeb gagal:", err);
        document.querySelector("#main-go").innerHTML =
            "<p>Terjadi kesalahan saat memuat halaman.</p>";
    }
}

runWeb();
window.addEventListener("popstate", () => runWeb());
document.addEventListener("click", e => {
    const url = e.target.getAttribute("href");
    if (url) {
        let isExcluded = ["http://", "https://", "mailto:", "tel:"];
        isExcluded = isExcluded.some(isEx => url.includes(isEx));
        if (!isExcluded) {
            e.preventDefault();
            history.pushState({}, "", url);
            runWeb();
        }
    }
});
