let button = document.getElementById("day");
let body = document.body;

let colors = ["black", "lightgray"];

button.addEventListener("click", () => {
  const chooseColor = Math.floor(Math.random() * colors.length);
  body.style.backgroundColor = colors[chooseColor];
});
