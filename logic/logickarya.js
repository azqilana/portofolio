import Helper from "../helper.js";
Helper.register("karya", () => {
  // Animasi masuk kartu proyek
  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(24px)";
    card.style.transition = `opacity 0.35s ease ${i * 0.15}s, transform 0.35s ease ${i * 0.15}s`;
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 50);
  });
});
