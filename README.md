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

## `constants.js`
A file that contains all the numeric constants.

- The score needed to win at the end (`TARGET`)
- How many rounds are needed (and therefore how many words must be fetched) (`ROUNDS`)
- The character code for the enter key, which is 13. (`ENTER`)
- The character code for the backspace key, which is 8. (`BACKSPACE`)

## `canvasFunctions.js`
A file that contains all the functions that manipulate the canvas to draw game objects.

Note that all these functions **must** take the CanvasRenderingContext2D as the first argument; and **must** take the HTML canvas element as the second argument. These are represented with `...` in the table below.

<table>
  <tr>
    <th>Function name</th>
    <th>Arguments</th>
    <th>What it does</th>
  </tr>
  
  <tr>
    <td>
      <code>display</code>
    </td>
    <td>
      <ul>
        <li>text to display</li>
        <li>background behind text</li>
        <li>colour of text</li>
      </ul>
    </td>
    <td>
      Shows only the given text, in the centre of the canvas, over a certain background.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>drawWord</code>
    </td>
    <td>
      <ul>
        <li>percentage of round left (0 to 100)</li>
        <li>hidden word</li>
        <li>colour of word</li>
        <li>colour of cover (i.e. solid rectangle that obscures word)</li>
      </ul>
    </td>
    <td>
      Renders the round's word onto the canvas, covered by a solid rectangle of the size and colours specified.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>drawBackground</code>
    </td>
    <td>
      <ul>
        <li>colour of background</li>
      </ul>
    </td>
    <td>
      Covers the entire canvas with a solid rectangle of the colour specified.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>drawCounter</code>
    </td>
    <td>
      <ul>
        <li>percentage of round left (0 to 100)</li>
        <li>points lost by incorrect guesses</li>
        <li>colour of time left</li>
        <li>colour of time used</li>
      </ul>
    </td>
    <td>
      Renders the vertical counter using the percentage argument. Renders the round's score using both the percentage *and* the points lost.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>drawTotal</code>
    </td>
    <td>
      <ul>
        <li>total score</li>
        <li>colour of bar</li>
        <li>colour of label</li>
      </ul>
    </td>
    <td>
      Renders the total score in the bar at the bottom, using the colour specified. Also, attaches a numeric label to show the score as an absolute number rather than as a visual fraction of the target.
    </td>
  </tr>
</table>

## `index.js` 
A file that handles the main game loop.

### `getWords(rounds)`

This returns a promise, which should only ever resolve. Ideally, it should pull from an online database of words; however, it may fallback to a hard-coded list if there is no internet connection.

### `nextRound()`

Upgrades the round in the `gameState` object and resets the round's score, penalty, etc. 

### `roundCheck(ctx, canvas)`

This takes the `ctx` and `canvas` arguments, even though it doesn't directly manipulate the canvas. Instead, it will call `display` with relevant arguments that will depend on whether the game is a loss or a win.

This function will do nothing if the game hasn't reached an end.

### gameState

`gameState` is an object containing the state of the game.

#### `total`

The total number of points

#### `round`

The index of the round

#### `points`

This is actually counter-intuitive. The `points` is the percentage of the round yet to complete. If there are no wrong guesses, this happens to be the number of `points` the user gets. To calculate the user's points, one must subtract the `penalty`

#### `penalty`

The number which, when subtracted from `points`, is the round's points.

#### `text`

The text which a user has entered through their keyboard but not submitted yet

## General structure

The constants and canvas functions are imported. Then, `getWords(ROUNDS)` is called. The promise is resolved, and when that happens a series of things will happen.

Firstly, the game loop is declared.

Secondly, event listeners are binded to `document`

The game loop runs the following:

- Has the game ended? If so, call `roundCheck(CTX, C)` and quit the game loop.
- Draw the background, total score counter, round score counter, round timer, and the concealed word
- Lower the number of time in the round remaining
- If the time for this round has run out, move on to the next round
- Tell the browser you're ready for the next game tick
- Draw the inputted text to the screen so the user knows what they're typing

The event listener `keypress` runs:

- Figure out the keycode of the key that has just been pressed, in a cross-browser way
- If it's not backspace, add it to the `text` property in `gameState`

The event listener `keydown` runs:

- Figure out the keycode of the key that has just been pressed, in a cross-browser way
- If it's ENTER (13)
  - Trim off any newline characters (`\r` is the annoying one)
  - Compare it with the target word
  - If it's a match
    - Run `nextRound()`
  - Otherwise
    - Clear the text and add 20 to the `penalty` property of `gameState`
- If it's BACKSPACE (8)
  - Remove the rightmost character, if it exists, from the `text` property of `gameState`
