import { load } from "./route.js";
import { runPageInit } from "./registry.js";

const page = document.querySelector("main");
const pageStyle = document.querySelector("#page-style");
let theChace = {};

export async function buildPage(data) {
  document.title = data.title + " — Azqilana";

  let thePage = theChace[`page:${data.page}`];
  if (!thePage) {
    thePage = await load(`./page/${data.page}.html`);
    theChace[`page:${data.page}`] = thePage;
  }
  page.innerHTML = thePage;

  let theStyle = theChace[`style:${data.style}`];
  if (!theStyle) {
    theStyle = await load(`./style/${data.style}.css`);
    theChace[`style:${data.style}`] = theStyle;
  }
  pageStyle.textContent = theStyle;

  // Update active nav link
  const path = window.location.pathname;
  const map = { "/": "nav-beranda", "/skill": "nav-skill", "/karya": "nav-karya", "/kontak": "nav-kontak" };
  document.querySelectorAll(".sidebar a").forEach(a => a.classList.remove("active-link"));
  const id = map[path];
  if (id) document.getElementById(id)?.classList.add("active-link");

  runPageInit(data.page);
}
