var board;
const player = 'x';
const ai = 'o';
const winArray = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]
const cells = document.querySelectorAll('.cell');
const winningMessageElement = document.getElementById('winningMsg');
const winningMessageTextElement = document.querySelector('.msg');
const restartButton = document.getElementById('resetButton');

beginGame();

restartButton.addEventListener('click', beginGame);

function beginGame() {
    board = Array.from(Array(9).keys());
    cells.forEach(cell => {
        cell.innerText = '';
        cell.addEventListener('click', manageClick, {once: true});
    })
    winningMessageElement.classList.remove('show');
}

function manageClick(e) {
    placeMove(e.target.id, player);
    if (!isDraw()) {
        placeMove(bestMove(), ai);
    }
}

function placeMove(spot, person) {
    board[spot] = person;
    document.getElementById(spot).innerText = person;
    let gameWon = checkWin(board, person);
    if (gameWon != null) {
        endGame(gameWon);
    }
}

function checkWin(board, person) {
    let gameWinner = null;
    for (var i = 0; i < winArray.length; i++) {
        var sum = 0;
        var combo = winArray[i];
        for (var j = 0; j < combo.length; j++) {
            if (board[combo[j]] == person) {
                sum++;
            }
        }
        if (sum == 3) {
            gameWinner = {index: i, person: person}
            break;
        }
    }
    return gameWinner;
    
}

function endGame(gameWinner) {
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', manageClick, {once: true});
    }
    if (gameWinner.person == player) {
        document.querySelector(".end .msg").innerText = "You Win!";
    } else {
        document.querySelector(".end .msg").innerText = "AI Wins!";
    }
    winningMessageElement.classList.add('show');
}

function availableSpots() {
    var spots = [];
    for (var i = 0; i < 9; i++) {
        if (board[i] == i) {
            spots.push(i);
        }
    }
    return spots;
}

function isDraw() {
    if (availableSpots().length != 0) {
        return false
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', manageClick, {once: true});
    }
    document.querySelector(".end .msg").innerText = "Tie Game!";
    winningMessageElement.classList.add('show');
    return true;
}

function bestMove() {
    return findOptimalMove().index;
}

function miniMax(coolBoard, person) {

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
}

function findOptimalMove() {
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
}
