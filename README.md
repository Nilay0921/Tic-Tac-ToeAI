# Tic-Tac-ToeAI
Classic tic-tac-toe game with an incorporated AI which always wins or ties, but never loses! AI developed using the miniMax algorithm.

# How the game works

* You the player will always go first and will be the letter X

* AI will go second and will be the letter O

* First to three of the same letters either horizontally, vertically, or diagonally wins

# Demo

* Play the game for yourself ![here](https://nilay0921.github.io/Tic-Tac-ToeAI/)

# optimalMove helper for miniMax

**Uses miniMax to calculate the number of ways the AI can win at each remaining spot on the board and returns the spot where the AI has the most number of ways to win**

```
var move = {};
    move.index = -1;
    var bestVal = -Infinity;
    for (var i = 0; i < 9; i++) {
        if (board[i] == i) {
            board[i] = ai;
            let moveVal = miniMax(board, player);
            board[i] = i;
            if (moveVal > bestVal) {
                move.index = i;
                bestVal = moveVal;
            }
        }
    }
    return move;
```

# miniMax Algorithm

**Determines the number of ways the AI can win with the current state of the board**

```
if (checkWin(coolBoard, player) != null) {
        return -10;
    } 
    if (checkWin(coolBoard, ai) != null) {
        return 10;
    }
    if (availableSpots().length == 0) {
        return 0;
    }

    if (person == ai) {
        let best = -Infinity;
        for (var i = 0; i < 9; i++) {
            if (coolBoard[i] == i) {
                coolBoard[i] = ai;
                let score = miniMax(coolBoard, player);
                best = Math.max(best, score);
                coolBoard[i] = i;
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (var i = 0; i < 9; i++) {
            if (board[i] == i) {
                coolBoard[i] = player;
                let score = miniMax(coolBoard, ai);
                best = Math.min(best, score);
                coolBoard[i] = i;
            }
        }
        return best;
    } 
```
