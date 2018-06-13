const gameState = {
	total: 50,   // 0 => 300
  round: 0,    // 0 => 4
  points: 100, // 0 <= 100
  penalty: 0, //   => 0
  text: "",
}

const C = document.querySelector("canvas")
const CTX = C.getContext("2d")

getWords().then(words => {
	const drawFrame = () => {  
  	if(gameState.round >= ROUNDS) return roundCheck(CTX, C);
    
    drawBackground(CTX, C, "black")
    drawCounter(CTX, C, gameState.points, gameState.penalty, "lightgreen", "red")
    drawWord(CTX, C, gameState.points, words[gameState.round], "green", "red")
    drawTotal(CTX, C, gameState.total, "yellow", "turquoise")
    
		gameState.points -= 0.1
    
    if(Math.floor(gameState.points) <= 0) {
    	nextRound()
    }

    requestAnimationFrame(drawFrame);
    
    CTX.font = "20px monospace"
    CTX.fillStyle = "white"
    CTX.fillText(gameState.text, C.width / 5 + 10, C.height / 2 + 90)
  }

  drawFrame()
  
  document.addEventListener("keypress", e => {
  	const key = e.which || e.keyCode || e.charCode
    if(key !== BACKSPACE) {
    	gameState.text += String.fromCharCode(key).toLowerCase()
    }
  })
  
  document.addEventListener("keydown", e => {
    const key = e.which || e.keyCode || e.charCode
  	if(key === BACKSPACE) {
    	gameState.text = gameState.text.substr(0, gameState.text.length - 1)
    }
    if(key === ENTER) {
    	const [entered, target] = [gameState.text.toLowerCase().trim(), words[gameState.round]]
    	if(entered === target) {
      	console.log("Match")
      	nextRound()
      } else {
      	console.log(JSON.stringify(gameState.text), JSON.stringify(words[gameState.round]))
      	gameState.text = ""
        gameState.penalty += 20
      }
    }
  })
})

function getWords() {
	return new Promise((ok, no) => {
  	const base = ["apple", "now", "no", "stop",
    							"yes", "green", "lemon", "cheese",
                  "kiwi", "beer", "free", "six", "yarn",
                  "power", "change", "wait", "drama"]
    
    ok(Array(ROUNDS).fill('').map(() => base[Math.floor(Math.random() * base.length)]))  
  })
}

function nextRound() {
	console.log("Next round.")
	gameState.total += gameState.points - 30
	gameState.points = 100
	gameState.penalty = 0
  gameState.text = ""
++gameState.round
}
