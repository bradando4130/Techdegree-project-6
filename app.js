// initialise variables of key elements
const qwerty = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
const btnReset = document.querySelector(".btn__reset");
const overlay = document.querySelector("#overlay");
const lives = document.getElementsByClassName("tries");
const fails = document.getElementsByClassName("lost");
let letterArray = document.getElementsByClassName("letter");

let resetCounter = 0;
let missed = 0;

// listen for clicking of start button to toggle display
btnReset.addEventListener("click", () => {
  if (resetCounter === 1) {
    resetGame();
  } else {
    overlay.style.display = "none";
  }
});

// phrases array containing 5 phrases for guessing game
const phrases = [
  "the quick brown fox jumped over the lazy dog",
  "peter piper picked a peck of pickled peppers",
  "fair shake of the sauce bottle mate",
  "and thats how the cookie crumbles",
  "javascript is a fun coding language",
];

// function to get return a random phrase from the array as a string of letters
getRandomPhraseAsArray = (arr) => {
  let randomIndex = Math.floor(Math.random() * arr.length);
  let randomPhrase = arr[randomIndex];
  randomPhrase = randomPhrase.split("");
  return randomPhrase;
};

// store result of getRandomPhraseAsArray to variable to be re used in next function

// function to display selected phrase on screen for game
addPhraseToDisplay = (arr) => {
  let phraseArray = getRandomPhraseAsArray(phrases);
  for (let i = 0; i < phraseArray.length; i++) {
    let newLi = document.createElement("LI");
    let liText = document.createTextNode(phraseArray[i]);
    let phraseUl = document.getElementById("phrase").firstElementChild;
    if (liText.textContent === " ") {
      newLi.className = "space";
    } else {
      newLi.className = "letter";
    }
    newLi.appendChild(liText);
    phraseUl.appendChild(newLi);
  }
};
addPhraseToDisplay(phrases);

// check if clicked letter is present in phrase
checkLetter = (buttonClick) => {
  let letterMatch = null;
  for (let i = 0; i < letterArray.length; i++) {
    if (buttonClick === letterArray[i].textContent) {
      letterArray[i].className = "letter show";
      letterMatch = buttonClick;
    }
  }
  return letterMatch;
};

// event listener for button clicks on qwerty, if button does not have class of 'chosen' run function checkLetter above
qwerty.addEventListener("click", (event) => {
  let buttonClick = event.target.textContent;
  if (
    event.target.tagName === "BUTTON" &&
    event.target.className !== "chosen"
  ) {
    event.target.className = "chosen";
    const letterFound = checkLetter(buttonClick);
    checkWin();
    // if letterFound = null, remove a life
    if (letterFound === null) {
      missed++;
      lives[0].firstElementChild.setAttribute("src", "images/lostHeart.png");
      lives[0].className = "lost";
      checkWin();
    }
  }
});

//function to check for win and loss conditions after each click. modifies overlay accordingly if win/loss conditions met
checkWin = () => {
  let letterShow = document.getElementsByClassName("show");
  if (missed === 5) {
    overlay.className = "lose";
    overlay.firstElementChild.textContent = "Bad luck! You lost. Try again.";
    overlay.style.display = "flex";
    btnReset.textContent = "Play Again";
    resetCounter = 1;
  } else if (letterArray.length === letterShow.length) {
    overlay.className = "win";
    overlay.firstElementChild.textContent = "Congragulations! You're a winner!";
    overlay.style.display = "flex";
    btnReset.textContent = "Play Again";
    resetCounter = 1;
  }
};

//reset the game upon win/loss screen, undo all the changes made throughout the game
// seperate fucntion for each reset, call functions at end of master function
resetGame = () => {
  resetCounter = 0;
  missed = 0;

  resetPhrase = () => {
    phrase.firstElementChild.innerHTML = "";
    addPhraseToDisplay(phrases);
  };

  resetLives = () => {
    for (i = 0; i < fails.length; i) {
      fails[i].firstElementChild.setAttribute("src", "images/liveHeart.png");
      fails[i].className = "tries";
    }
  };

  resetButtons = () => {
    let buttons = document.getElementsByClassName("chosen");
    for (i = 0; i < buttons.length; i) {
      buttons[i].className = "";
    }
  };
  resetButtons();
  resetPhrase();
  resetLives();
  overlay.style.display = "none";
};
