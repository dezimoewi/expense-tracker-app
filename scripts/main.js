const button = document.getElementById('day')
const body = document.body

const colors = ['black', 'lightgray']

button.addEventListener('click.', () => {
  const chooseColor = Math.floor(Math.random() * colors.length)
  body.style.backgroundColor = colors[chooseColor]
})
