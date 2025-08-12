
// Check if note is visible in the UI after page loads
document.addEventListener("DOMContentLoaded", function () {
  const el = document.getElementById("note");
  const style = window.getComputedStyle(el);

  const fontSize = parseFloat(style.fontSize);
  const color = style.color;

  // Check if the browser ignored the styling
  const isStyleIgnored = fontSize > 1 || color !== "rgb(61, 85, 101)";

  if (isStyleIgnored) {
    el.style.display = "none";
    el.style.visibility = "hidden";
  }
});
