# word-reveal
A game where a word is slowly revealed

# Instructions

## Displays

On the screen, you will see many displays.

### Total Score

Your total score is displayed above the yellow bar at the bottom. The yellow bar will show your total score too: it will scale based on how many total points you have. If you have 300 or more, it will cover the entire width of the canvas.

### Round Score

In each round, your score is displayed (**before** the deduction of 30 points), above the vertical bar on the left.

### Time in Round

The green vertical bar will show how much time is left in the round. If it covers the red completely, the round just started. If it's half way down the red, so is the word cover (as well as the round). If the green bar is no longer visible, the round has ended.

# Rules

In each round, you start with 100 round points. This steadily decreases. Each time you make an incorrect guess, **20 round points will be deducted**. When the round ends, **30 points are deducted** and the result is added to the total points.

The total points will begin at 50. To win, at the end of the game you must have 300 points.

If at any time your total points become 0 or below, you lose.

To make a guess, type what you think the word is through your keyboard. To remove multiple letter, you can't just hold down "backspace". To make it harder, you must press and release the backspace key for each letter you wish to remove. To submit your answer, hit the return key.

# Programming

To help you, the code is split into three files.

`constants.js` is a file that contains all the numeric constants.

- The score needed to win at the end (`TARGET`)
- How many rounds are needed (and therefore how many words must be fetched) (`ROUNDS`)
- The character code for the enter key, which is 13. (`ENTER`)
- The character code for the backspace key, which is 8. (`BACKSPACE`)

--------------

`canvasFunctions.js` is a file that contains all the functions that manipulate the canvas to draw game objects.

Note that all these functions **must** take the CanvasRenderingContext2D as the first argument; and **must** take the HTML canvas element as the second argument. These are represented with `...` in the table below.

<table>
  <tr><th>Function name</th><th>How to call</th><th>What it does</th></tr>
  
  <tr><td><code>display</code></td><td><code>display(..., &lt;text to display&gt;, &lt;background color&gt;, &lt;color of text&gt;)</td><td>Centers the text and renders it, on its own, in the middle of the canvas on a background as specified</td></tr>
  
  <tr><td><code>drawBackground</code></td><td><code>drawBackground(..., &lt;color&gt;)</code></td><td>Fills the entire canvas with the specified colour.</td></tr>
  
  <tr><td><code>drawWord</code></td><td><code>display(..., &lt;word to display&gt;, &lt;percentage of round not completed&gt;, &lt;color of text&gt;, &lt;covering color&gt;)</td><td>Draws a word in a specified color, then obscures it by a certain amount (determined by an argument) with a solid rectangle of a specified color</td></tr>
  <tr><td><code>display</code></td><td><code>display(..., &lt;text to display&gt;, &lt;background color&gt;, &lt;color of text&gt;)</td><td>Centers the text and renders it, on its own, in the middle of the screen on a background as specified</td></tr>
</table>
