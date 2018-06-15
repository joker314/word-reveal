const gameState = {
	total: 50,   // => 0 => 300 =>
	round: 0,    // 0 => 4
	points: 100, // 0 <= 100
	penalty: 30, // 30 => 
	text: "",
	startedAt: null,
}

const C = document.querySelector("canvas")
const CTX = C.getContext("2d")

getWords().then(words => {
	const drawFrame = now => {
		if(gameState.round >= ROUNDS || gameState.total <= 0) return roundCheck(CTX, C);
		
		drawBackground(CTX, C, "black")
		drawCounter(CTX, C, gameState.points, gameState.penalty, "lightgreen", "red")
		drawWord(CTX, C, gameState.points, words[gameState.round], "green", "red")
		drawTotal(CTX, C, gameState.total, "yellow", "turquoise")
		
		
		if(gameState.startedAt === null) gameState.startedAt = now
		
		const delta = now - gameState.startedAt
		
		gameState.points = 100 * (delta / ROUND_DURATION)
		
		if(Math.floor(gameState.points) <= 0) {
			nextRound()
		}
		
		CTX.font = "20px monospace"
		CTX.fillStyle = "white"
		CTX.fillText(gameState.text, C.width / 5 + 10, C.height / 2 + 90)
		
		requestAnimationFrame(drawFrame)
	}
	
	requestAnimationFrame(drawFrame)
  
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
				nextRound()
			} else {
				gameState.text = ""
				gameState.penalty += 20
			}
		}
	})
})

function getWords() {
	return new Promise((ok, no) => {
		const base = [
			"apple", "now", "no", "stop",
			"yes", "green", "lemon", "cheese",
			"kiwi", "beer", "free", "six", "yarn",
			"power", "change", "wait", "drama",
			"mango", "yell", "taps", "pounce"
		]
    
    ok(Array(ROUNDS).fill('').map(() => base[Math.floor(Math.random() * base.length)]))  
  })
}

function nextRound() {
	gameState.total += gameState.points - gameState.penalty
	gameState.points = 100
	gameState.penalty = 30
	gameState.text = ""
	++gameState.round
}

function roundCheck(ctx, canvas) {
	if(gameState.total <= 0) {
		display(ctx, canvas, "loss", "red", "white")
		return;
	}
	if(gameState.round >= ROUNDS) {
		if(gameState.total < TARGET) display(ctx, canvas, "loss", "red", "white")
		else display(ctx, canvas, "win", "green", "white")
	}
}
