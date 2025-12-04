const form = document.getElementById('transaction-form')
const list = document.getElementById('transaction-list')
const balance = document.getElementById('balance')
const income = document.getElementById('income')
const expense = document.getElementById('expense')

const modal = document.getElementById('delete-modal')
const confirmYes = document.getElementById('confirm-yes')
const confirmNo = document.getElementById('confirm-no')

let transactions = JSON.parse(localStorage.getItem('transactions')) || []
let transactionToDelete = null

function addTransaction (e) {
  e.preventDefault()

  const desc = document.getElementById('description').value
  const amt = +document.getElementById('amount').value
  const date =
    document.getElementById('date').value ||
    new Date().toISOString().slice(0, 10)

  const transaction = {
    id: Date.now(),
    description: desc,
    amount: amt,
    date
  }

  transactions.push(transaction)
  saveAndRender()
  form.reset()
}

function deleteTransaction (id) {
  transactions = transactions.filter(t => t.id !== id)
  saveAndRender()
}

function saveAndRender () {
  localStorage.setItem('transactions', JSON.stringify(transactions))
  renderTransactions()
  updateTotals()
}

function renderTransactions () {
  list.innerHTML = ''

  transactions.forEach(fo => {
    const sign = fo.amount < 0 ? '-' : '+'

    const item = document.createElement('li')
    item.classList.add(fo.amount < 0 ? 'expense' : 'income')

    const right = document.createElement('div')
    right.className = 'right'

    const textSpan = document.createElement('span')
    textSpan.textContent = `${fo.description} (${fo.date})`

    const text = document.createElement('span')
    text.textContent = `${sign}$${Math.abs(fo.amount).toFixed(2)}`

    const delBtn = document.createElement('button')
    delBtn.textContent = 'Delete'
    delBtn.addEventListener('click', () => {
      transactionToDelete = fo.id
      modal.style.display = 'flex'
    })

    right.appendChild(textSpan)
    right.appendChild(text)

    item.appendChild(right)
    item.appendChild(delBtn)

    list.appendChild(item)
  })
}

function updateTotals () {
  const amounts = transactions.map(t => t.amount)

  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2)

  const incomeTotal = amounts
    .filter(a => a > 0)
    .reduce((acc, val) => acc + val, 0)
    .toFixed(2)

  const expenseTotal = (
    amounts.filter(a => a < 0).reduce((acc, val) => acc + val, 0) * -1
  ).toFixed(2)

  balance.innerText = total
  income.innerText = incomeTotal
  expense.innerText = expenseTotal
}

confirmYes.addEventListener('click', () => {
  if (transactionToDelete !== null) {
    deleteTransaction(transactionToDelete)
    transactionToDelete = null
    modal.style.display = 'none'
  }
})

confirmNo.addEventListener('click', () => {
  transactionToDelete = null
  modal.style.display = 'none'
})

form.addEventListener('submit', addTransaction)
saveAndRender()
