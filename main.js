const inputsContainer = document.querySelector('.inputs'),
  discTitle = document.querySelector('.disc'),
  guessCount = document.querySelector('.guess_count'),
  resetBtn = document.querySelector('button'),
  typing = document.querySelector('.typing'),
  winner = document.querySelector('.winner'),
  loser = document.querySelector('.loser')
winnerSound = new Audio('./WinnerSound.mp3')
//all words with descriptions
const words = [
  {
    word: 'react',
    disc: 'JavaScript library'
  },
  {
    word: 'vue',
    disc: 'JavaScript Framework'
  },
  {
    word: 'angular',
    disc: 'JavaScript MVW Framework'
  },
  {
    word: 'nodejs',
    disc: 'JavaScript runtime environment'
  },
  {
    word: 'php',
    disc: 'general-purpose scripting language'
  },
  {
    word: 'ruby',
    disc: 'open source programming language'
  },
  {
    word: 'python',
    disc: 'Programming Language'
  },
  {
    word: 'tailwind',
    disc: 'A utility-first CSS framework'
  },
  {
    word: 'bootstrap',
    disc: "world's most famous free CSS framework"
  }
]

//global variables
let word,
  maxGuess = 12,
  countWin = []
// tow ways to
// window.addEventListener('load', () => {
//   typing.focus()
// })

document.addEventListener('keydown', () => {
  typing.focus()
})
typing.addEventListener('input', startGame)

//Get Random Word
const getRandomWord = () => {
  //reset function
  resetGame()

  let randomObject = words[Math.floor(Math.random() * 9)]
  word = randomObject.word
  discTitle.innerHTML = randomObject.disc
  guessCount.innerHTML = maxGuess
  console.log(word)
  let inputs = ''
  for (let i = 0; i < word.length; i++) {
    inputs += '<input type="text" disabled />'
  }
  inputsContainer.innerHTML = inputs
}
getRandomWord()

//reset Button
resetBtn.onclick = () => {
  getRandomWord()
}

//Start Game Fun
function startGame (e) {
  let char = e.target.value
  if (!char.match(/[a-z]/i)) return
  let inputs = inputsContainer.querySelectorAll('input')
  if (word.includes(char)) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === char && !inputs[i].value) {
        inputs[i].value = char
        countWin.push(char)
      }
    }
  } else {
    maxGuess--
  }
  guessCount.innerText = maxGuess
  typing.value = ''

  // check winner
  if (word.length === countWin.length) {
    winnerSound.play()
    countWin = []
    winner.style.display = 'block'
  }
  //check Loser
  setTimeout(() => {
    if (maxGuess <= 0) {
      // loser.style.display = 'block'
      alert('يا خسران صعب تكسب')
      for (let i = 0; i < word.length; i++) {
        inputs[i].value = word[i]
      }
    }
  })
}

function resetGame () {
  maxGuess = 12
  winner.style.display = 'none'
  loser.style.display = 'none'
  countWin = []
  winnerSound.pause()
}
