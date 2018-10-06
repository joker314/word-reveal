display = (ctx, canvas, text, bg, fg) => {
	const w50 = canvas.width / 2;
	const h50 = canvas.height / 2;	
	drawBackground(ctx, canvas, bg);
	ctx.font = "50px Courier New";
	ctx.fillStyle = fg;
	ctx.fillText(text, w50 - ctx.measureText(text).width / 2, h50);
};

drawWord = (ctx, canvas, points, word, color, cover) => {
	const w10 = 0.1 * canvas.width;
	const h50 = 0.5 * canvas.height;
	ctx.font = "140px Courier New";
	ctx.fillStyle = color;
	ctx.fillText(word, w10 + 30, h50);
	const m = ctx.measureText(word);
	ctx.fillStyle = cover;
	ctx.fillRect(w10 + 30, h50 - 90 + 140 + (1 - 1.4 * points), m.width, 1.4 * points);
};

drawBackground = (ctx, canvas, color) => {
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
};

drawCounter = (ctx, canvas, score, penalty, good, bad) => {
	const percent = score / 100;
	const w10 = 0.1 * canvas.width;
	const h20 = 0.2 * canvas.height;	
	ctx.fillStyle = good;
	ctx.fillRect(w10, h20, 20, h20 * 3);
	ctx.fillStyle = bad;
	ctx.fillRect(w10, h20, 20, (1 - percent) * h20 * 3);
 	ctx.font = "20px monospace";
 	ctx.fillText(Math.floor(score - penalty), w10, h20 - 30);
}

drawTotal = (ctx, canvas, score, bg, fg) => {
	ctx.fillStyle = bg;
	ctx.fillRect(0, canvas.height - 10, canvas.width * (score / TARGET), 10);  
	ctx.fillStyle = fg;
	ctx.font = "20px monospace";
	ctx.fillText(Math.floor(score), canvas.width * (score / TARGET) - 10, canvas.height - 15);
}
