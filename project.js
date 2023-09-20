const prompt = require("prompt-sync")();

const rows = 3;
const cols = 3;

const symbolsCount = {
    "cherry": 3,
    "lemon": 4,
    "apple": 5,
    "banana": 6
}

const symbolValues = {
    "cherry": 5,
    "lemon": 4,
    "apple": 3,
    "banana": 2
}

const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount. ");
        } else {
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter a number of lines to bet on(1-3): ");
        const nrOfLines = parseFloat(lines);

        if (isNaN(nrOfLines) || nrOfLines <= 0 || nrOfLines > 3) {
            console.log("Invalid number of lines. ");
        } else {
            return nrOfLines;
        }
    }
};

const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the bet per line: ");
        const betAmount = parseFloat(bet);

        if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance / lines) {
            console.log("Invalid bet amount. Try again.");
        } else {
            return betAmount;
        }
    }
}

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(symbolsCount)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i = 0; i < cols; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < rows; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    const transposedRows = [];

    for (let i = 0; i < rows; i++) {
        transposedRows.push([]);
        for (let j = 0; j < cols; j++) {
            transposedRows[i].push(reels[j][i]);
        }
    }
    return transposedRows;
}

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i !== row.length - 1) {
                rowString += " |";
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for(let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols) {
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if(allSame){
            winnings += bet * symbolValues[symbols[0]];
        }
    }
    return winnings;
}

let balance = deposit();
const nrOfLines = getNumberOfLines();
const bet = getBet(balance, nrOfLines);
const reels = spin();
const rowsToTr = transpose(reels);
printRows(rowsToTr);
const winnings = getWinnings(rowsToTr, bet, nrOfLines);
console.log("You won "+ winnings.toString() + "$!");
