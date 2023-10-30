const grid = document.querySelectorAll('.cell')
const gridCell = document.querySelector('.cell')
const statusMsg = document.querySelector('.status-msg')
const startBtn = document.querySelector('.start')
const refreshBtn = document.querySelector('.refresh')
const newGame = document.querySelector('.new-game')

const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],

  [0,3,6],
  [1,4,7],
  [2,5,8],

  [0,4,8],
  [2,4,6],
]

let conditions = ['','','','','','','','','']
let turns = []
let running = false
let won = false
let move = 'x'

newGame.addEventListener('click', refreshGame)

function refreshGame() {
  statusMsg.textContent = `Let's Play a Game!`
  grid.forEach(cell => cell.textContent = '')
  turns = []
  running = false
  won = false
  move = 'x'
  cellValue = null
  conditions = ['','','','','','','','','']
  initialize()
}

function initialize() {
  running = true
  let cellToUpdate
  let cellValue
  grid.forEach(cell => {  
  cell.addEventListener('click', () => {
    cellToUpdate = cell
    cellValue = cell.getAttribute('value')
    if (turns.length <= 9 && !cell.classList.contains('run')) {
      cell.classList.add('run')
      turns.push(cellValue)
      conditions[cellValue] = move
      moves(cellValue, cellToUpdate)
    } 
    else {
      running = false
      cell.classList.remove('run')    
      }
    })
  }) 
}

function moves(cellValue, cellToUpdate) {
  let char = ''
  if (move == 'x' && !won) {
    conditions[cellValue] = 'x'
    char = 'x'
    move = 'o'
    }

  else if (move == 'o' && !won) {
    conditions[cellValue] = 'o'
    char = 'o'
    move = 'x'
    } 

  cellToUpdate.textContent = char  
  if (turns.length > 2) {
    checkForWinner() 
  } 
}

function checkForWinner() {
  console.log(conditions)
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (conditions[a] && conditions[a] === conditions[b] && conditions[a] === conditions[c]) {
      running = false
      won = true
      statusMsg.textContent = `Winner: ${conditions[a]}`
      statusMsg.classList.add('uppercase')
      statusMsg.textContent = `${conditions[a]} Won!`
      return conditions[a]
      }
  }
    if (turns.length > 8 && !won) {
      statusMsg.textContent = `It's a Draw! Try Again!`
  }
  return null
}
