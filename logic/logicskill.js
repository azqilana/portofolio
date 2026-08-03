import Helper from "../helper.js";
Helper.register("skill", () => {
  // Animasi masuk skill item
  const items = document.querySelectorAll(".skill-item");
  items.forEach((item, i) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = `opacity 0.3s ease ${i * 0.1}s, transform 0.3s ease ${i * 0.1}s`;
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, 50);
  });
});
