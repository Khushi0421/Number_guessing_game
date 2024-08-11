let randomnumber = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector('#subt'); 
const userInput = document.querySelector('.guessfield');
const guessSlot = document.querySelector('.guesses');
const lastresult = document.querySelector('.lastresult');
const loworhigh = document.querySelector('.loworhigh');
const Startover = document.querySelector('.resultparas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        console.log(guess);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    // Check if the input is a number between 1 and 100
    if (isNaN(guess)) {
        alert('Please enter a valid number');
    } else if (guess < 1) {
        alert('Please enter a number greater than 1');
    } else if (guess > 100) {
        alert('Please enter a number less than 100');
    } else {
        prevGuess.push(guess);
        if (numGuess === 11) {
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${randomnumber}`);
            endgame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    // Check if the guess is correct or not
    if (guess === randomnumber) {
        displayMessage(`You guessed it right!`);
        endgame();
    } else if (guess < randomnumber) {
        displayMessage(`Number is too low`);
    } else if (guess > randomnumber) {
        displayMessage(`Number is too high`);
    }
}

function displayGuess(guess) {
    // Display previous guesses and remaining attempts
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    numGuess++;
    lastresult.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
    // Display a message for the player
    loworhigh.innerHTML = `<h2>${message}</h2>`;
}

function endgame() {
    // Disable input and create a new game option
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newgame">Start new Game</h2>`;
    Startover.appendChild(p);
    playGame = false;
    newgame();
}

function newgame() {
    // Start a new game
    const newgamebutton = document.querySelector('#newgame');
    newgamebutton.addEventListener('click', function () {
        randomnumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        lastresult.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled');
        Startover.removeChild(p);
        playGame = true;
    });
}
