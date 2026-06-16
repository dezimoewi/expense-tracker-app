const button = document.getElementById('day')
const body = document.body

function updateToggleLabel () {
  button.textContent = body.classList.contains('dark') ? '☀️ Light' : '🌙 Dark'
}

const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') {
  body.classList.add('dark')
}
updateToggleLabel()

button.addEventListener('click', () => {
  body.classList.toggle('dark')
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light')
  updateToggleLabel()
})
