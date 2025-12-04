const button = document.getElementById('day');
const body = document.body;

const colors = ['black', 'lightgray'];

button.addEventListener('click', () => { // removed the dot
  const chooseColor = Math.floor(Math.random() * colors.length);
  body.style.backgroundColor = colors[chooseColor];
});
