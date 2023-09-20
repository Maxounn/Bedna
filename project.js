const prompt = require("prompt-sync")();

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
}


let balance = deposit();
const nrOfLines = getNumberOfLines();
