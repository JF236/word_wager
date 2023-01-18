let roundNumber = 1;
let comment = document.querySelector('.comment');
let numberOfLettersInput = document.querySelector('.numberOfLettersInput');
let numberOfLettersButton = document.querySelector('.numberOfLettersButton');
let numberOfLettersLabel = document.querySelector('.numberOfLettersLabel');
let inputLettersInput = document.querySelector('.inputLettersInput');
let inputLettersButton = document.querySelector('.inputLettersButton');
let inputLettersLabel = document.querySelector('.inputLettersLabel');
let inputLetters = document.querySelectorAll('.inputLetters');
let secretWord = "";
let inputtedLetters = [];
let numberOfDesiredLetters = 0;
let numberOfDesiredLettersCopy = 0;
let score = 0;
let guessButton = document.querySelector('.guessButton');
let endOfRoundButtons = document.querySelectorAll('.endOfRoundButtons');
let lettersGuessed = document.querySelector('.lettersGuessed');
let lettersGuessedTitle = document.querySelector('.lettersGuessedTitle');
let stringOfCorrectLetters = "";
let foundWord = false;
let guessString = "";
let fillInSquare = 0;
lettersGuessedTitle.hidden = true;

const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

//must have it so autofocuses on boxes that are not filled yet
//and updates your score/tells you how much you have done


//generates the secret word, and creates blue squares
function generateRandomWord(){
    let randomNum = Math.floor((Math.random() * (wordList.length)) + 1);
    secretWord = wordList[randomNum];
    console.log(secretWord);
    let secretWordLength = secretWord.length;
    while (secretWordLength != 0){
        square = document.createElement('input');
        square.className = "square" + (secretWord.length - secretWordLength);
        square.style.display = 'inline-block';
        square.style.bottom = '200px';
        square.style.height = "80px";
        square.style.width = "80px";
        square.style.margin = "10px";
        square.style.backgroundColor = "yellow";
        document.body.append(square);
        secretWordLength--;
    }
}

//adds score, calls fillInGuess to fill in guess
function updateScoreDisplay(amountToAdd){
    score += Number(amountToAdd)*roundNumber;
    comment.textContent = "You added " + (amountToAdd*roundNumber) + " to your score. Fill in the remaining letters to take a guess.";
    scoreShow = document.querySelector('#scoreNum');
    scoreShow.textContent = score;
}

//clears the score
function clearScore(){
    score = 0;
    scoreShow = document.querySelector('#scoreNum');
    scoreShow.textContent = 0;
    roundNumber = 1;
    roundShow = document.querySelector('#roundNum');
    roundShow.textContent = 1;
}

//checks the number of guesses
//hides number of letters input
//calls addInputBox # of guess times
//creates takeInIndivLetters listener for every keyup 
function checkNumberOfLetters(){
    guessButton.hidden = true;
    numberOfDesiredLetters = numberOfLettersInput.value
    numberOfDesiredLettersCopy = numberOfDesiredLetters;
    const resetParas = document.querySelectorAll('.numberOfLetters');
    for (const resetPara of resetParas){
        resetPara.hidden = true;
    }
    messageToAdd = document.createElement('p');
    document.body.append(messageToAdd);
    messageToAdd.textContent = "Type the letters you would like to add";
    while (numberOfDesiredLettersCopy != 0){
        addInputBox();
        numberOfDesiredLettersCopy--;
    }
    numberOfDesiredLettersCopy = numberOfDesiredLetters;
    console.log("numberofDesiredLetters = " + numberOfDesiredLetters);
    var currentInputBox = document.querySelector('.letterInput' + (numberOfDesiredLetters - numberOfDesiredLettersCopy));
    currentInputBox.focus();  
    document.addEventListener('keyup', takeInIndivLetters);
}

//adds a box with class = letterinputx to guess letters
function addInputBox(){
    checkLetterBox = document.createElement('input');
    checkLetterBox.className = "letterInput" + (numberOfDesiredLetters - numberOfDesiredLettersCopy);
    checkLetterBox.style.backgroundColor = "red";
    checkLetterBox.style.height = "20px";
    checkLetterBox.style.width = "20px";
    checkLetterBox.style.margin = "10px";
    document.getElementById('massRemove').appendChild(checkLetterBox);
}



//adds letters to array of guessed letters
//if all letters have been taken in, calls revealLetters to show corrects
//adds the guess button and calls fillInGuess
function takeInIndivLetters(){
    if (numberOfDesiredLettersCopy > 0){
        currentInputBox = document.querySelector('.letterInput' + (numberOfDesiredLetters - numberOfDesiredLettersCopy));
        inputtedLetters += currentInputBox.value;
        console.log("input letters = " + inputtedLetters);
        numberOfDesiredLettersCopy--;
        currentInputBox = document.querySelector('.letterInput' + (numberOfDesiredLetters - numberOfDesiredLettersCopy));
    }
    if(numberOfDesiredLettersCopy != 0){
        currentInputBox.focus();
    }
    else{
        messageToAdd.hidden = true;
        numberOfDesiredLettersCopy = numberOfDesiredLetters;
        while (numberOfDesiredLettersCopy != 0){
            var currentInputBox = document.querySelector('.letterInput' + (numberOfDesiredLetters - numberOfDesiredLettersCopy));
            currentInputBox.parentNode.removeChild(currentInputBox);
            numberOfDesiredLettersCopy--;
        }
        document.removeEventListener('keyup', takeInIndivLetters);
        numberOfDesiredLettersCopy=numberOfDesiredLetters;
        revealLetters();
    }
}

//fills the letter into every square that is correct
//calls updateScoreDisplay
function revealLetters(){
    console.log("inputted letters = " + inputtedLetters);
    console.log("secret word = " + secretWord);
    lettersGuessed.textContent = inputtedLetters;
    lettersGuessedTitle.hidden = false;
    lettersGuessed.hidden = false;
    for(let i=0;i<secretWord.length;i++){
        for(let j=0;j<inputtedLetters.length;j++){
            console.log("comparing " + secretWord[i] + " and " + inputtedLetters[j]);
            if (secretWord[i]==inputtedLetters[j]){
                stringOfCorrectLetters += inputtedLetters[j];
                correctSquare = document.querySelector('.square' + i);
                correctSquare.value = secretWord[i];
            }
        }
    }
    guessButton.hidden = false;
    guessButton.disabled = true;
    updateScoreDisplay(numberOfDesiredLetters);
    fillInSquare = 0;
    fillInGuess();
}

function fillInGuess(){
    console.log("guessString = " + guessString + ", secretWord = " + secretWord);
    if (guessString.length < secretWord.length){    
        squareIsFilled = document.querySelector('.square' + fillInSquare);
        if (squareIsFilled.value == ""){
            squareIsFilled.focus();
            squareIsFilled.addEventListener('keyup', addLetterGuessToString);
        }
        else{
            addLetterGuessToString();   
        }
    }
    else{
        guessButton.disabled = false;
        guessButton.addEventListener('click', checkGuess);
    }
}

function addLetterGuessToString(){
    guessString += squareIsFilled.value;
    fillInSquare++;
    fillInGuess();
}

//clears comment
//adds back the input for # of letters
function setUpRound(){
    roundShow = document.querySelector('#roundNum');
    roundShow.textContent = roundNumber;
    guessString = "";
    numberOfDesiredLetters = 0;
    numberOfDesiredLettersCopy = 0;
    comment.textContent = "";
    const resetParas = document.querySelectorAll('.numberOfLetters');
    for (const resetPara of resetParas){
        resetPara.hidden = false;
    }
    numberOfLettersInput.value = "";
    guessButton.hidden = true;
    numberOfLettersInput.focus();
}

//removes all blue boxes from last round
//removes winning message
//calls setUpRound to remove all other stuff
//generates random word, clears score, and adds event listener for number input
function setUpRoundComplete(){
    for(let i=0; i<secretWord.length; i++){
        removeLetterBox = document.querySelector(".square" + i);
        removeLetterBox.remove();
    }
    winningMessage = document.querySelector('.winningMessage');
    winningMessage.remove();
    //resetButton = document.querySelector('.resetButton');
    resetButton.remove();
    generateRandomWord();
    clearScore();
    setUpRound();
    lettersGuessed.hidden = true;
    lettersGuessedTitle.hidden = true;

    inputtedLetters = [];
    numberOfDesiredLetters = 0;
    numberOfDesiredLettersCopy = 0;
    stringOfCorrectLetters = "";
    foundWord = false;
    guessString = "";
    fillInSquare = 0;

    numberOfLettersButton.addEventListener('click', checkNumberOfLetters);
}

function removeWrongGuess(){
    let i = 0;
    while(stringOfCorrectLetters != 0){
        let checkingSquare = document.querySelector('.square' + i);
        if(stringOfCorrectLetters[0] == checkingSquare.value && secretWord[i] == stringOfCorrectLetters[0]){
            stringOfCorrectLetters = stringOfCorrectLetters.substring(1);
        }
        else{
            checkingSquare.value = "";
        }
        i++;
    }
    while(i<secretWord.length){
        checkingSquare = document.querySelector('.square' + i);
        checkingSquare.value = "";
        i++;
    }
}

function checkGuess(){
    console.log("adding this to score: " + numberOfDesiredLetters);
    console.log("string of correct letters =" + stringOfCorrectLetters);
    if (guessString==secretWord){
        foundWholeWord();
    }
    else{
        roundNumber++;
        roundShow.textContent = roundNumber;
        comment.textContent = "Not Correct! Starting round " + roundNumber;
        removeWrongGuess();
        setUpRound();
    }
}

function foundWholeWord(){
    console.log("found Whole Word correct message should show");
    var winningMessage = document.createElement('p');
    winningMessage.className = 'winningMessage';
    winningMessage.textContent = "You Won! Your score is: " + score;
    document.body.append(winningMessage);
    addResetButton();
}

//adds a reset game button
//calls setUpRoundComplete to restart game
function addResetButton(){
    comment.textContent = "";
    lettersGuessed.textContent = "";
    lettersGuessedTitle.hidden = true;
    guessButton.hidden = true;
    resetButton = document.createElement('button');
    resetButton.className = "resetButton";
    resetButton.textContent = "Restart";
    document.body.append(resetButton);
    resetButton.addEventListener('click', setUpRoundComplete);
}


generateRandomWord();
setUpRound();
numberOfLettersButton.addEventListener('click', checkNumberOfLetters);
