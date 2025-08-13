let offsetX = 0;
let offsetY = 0;
let button = null;
let isDragging = false; // isDragging muss auch global sein

document.addEventListener("DOMContentLoaded", function () {
  button = document.getElementById("draggableButton");

  if (!button) {
    console.error("Draggable button not found!");
    return;
  }

  button.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - button.offsetLeft;
    offsetY = e.clientY - button.offsetTop;
    button.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging || !button) return;

    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;

    // Begrenzungen für die Bewegung
    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;

    // Sicherstellen, dass der Button nicht aus dem Viewport ragt
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    button.style.left = x + "px";
    button.style.top = y + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    button.style.cursor = "grab";
  });

  document.addEventListener("mouseleave", () => {
    isDragging = false;
    button.style.cursor = "grab";
  });
});
