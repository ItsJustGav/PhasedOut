let drawnCard = null;
let phand = [];
let discardPile = [];
let isDrawn = false;
let deck = [];
const discardBtn = document.getElementById("discardButton");

class Card { 
    constructor(value, color) {
        this.value = value;
        this.color = color;
    }
}


function createDeck() {
    const newDeck = [];
    const colors = ['Red', 'Blue', 'Green', 'Yellow'];
    colors.forEach(color => {
        for (let i = 1; i <=12; i++) {
            for (let j = 0; j < 2; j++) {
                newDeck.push(new Card(i, color));
            }
        }
    });
    return newDeck;
}

function startGame() {
    deck = createDeck();
    shuffle(deck);

    dealCards(deck, phand);
    phand.sort((a, b) => a.value - b.value);

    isDrawn = false;
    drawnCard = null;
    currentLevel = 0;
    updateHandDisplay(phand);
    displayLevel();
    winChecker(phand);

    console.log(phand.map(card => `${card.color} ${card.value}`));
}

function shuffle(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function dealCards(array1, array2) {
    for (let i = 0; i < 10; i++) {
        array2.push(array1.pop());
    }
}

function enableDiscardButton() {
    discardBtn.disable = false;
}
function disableDiscardButton() {
    discardBtn.disable = true;
}


function drawCard(array1, array2) {
    if (array1.length === 0) {
        console.log("No more cards to draw.");
        return;
    } if (isDrawn === true) {
        console.log("You already drew a card!");
        return;
    }
    
    drawnCard = array1.pop();
    isDrawn = true;
    displayDrawnCard();
    enableDiscardButton();
    updateHandDisplay(phand);
    console.log("You have drawn: " + drawnCard.color + " " + drawnCard.value);
    return drawnCard;
}

function discardDrawn() {
    if (isDrawn) {
        discardPile.push(drawnCard);
        drawnCard = null;
        isDrawn = false;
        
        disableDiscardButton();
        
        console.log("discard function called");
    }
    displayDrawnCard();
    updateHandDisplay(phand);

    console.log(discardPile.map(card => `${card.color} ${card.value}`));

    winChecker(phand);
}

function swapCard(index) {
    if (isDrawn ) {
        const oldCard = phand[index]; 
        phand[index] = drawnCard;

        discardPile.push(oldCard);
        drawnCard = null;
        isDrawn = false;
        updateHandDisplay(phand);
        displayDrawnCard();
        console.log(`Current Phase: ${currentLevel + 1}`);
        winChecker(phand);
    } else {
        alert("You do not have a drawn card");
    }
       
}

    updateHandDisplay(phand);


function updateHandDisplay(hand, isReset = false) {
    const handDisplay = document.getElementById("handDisplay");
    handDisplay.innerHTML = ""; 

    hand.forEach((card, index) => {
        const li = document.createElement("li");
        //li.textContent = `${card.value}`;

        const swapBtn = document.createElement("button");
        swapBtn.textContent = `${card.color} ${card.value}`;
        swapBtn.classList.add(card.color.toLowerCase());

        if (isReset) {
            swapBtn.classList.add("card-slide-in");

            const direction = index < hand.length / 2 ? "-100px" : "100px";
            swapBtn.style.setProperty(`--direction`, direction);
        }

        swapBtn.disabled = !isDrawn;

        swapBtn.onclick = () => {
            swapCard(index);
        };

        li.appendChild(swapBtn);
        handDisplay.appendChild(li);        
    })
}

function displayDrawnCard() {
    const displayDrawn = document.getElementById("displayDrawn");
    const div = document.createElement("div");

    if(!isDrawn) {
        displayDrawn.innerHTML = "";
        displayDrawn.appendChild(div);

        return;
    }
    displayDrawn.innerHTML = "";
    div.textContent = `You drew a ${drawnCard.color} ${drawnCard.value}`;
    displayDrawn.appendChild(div);

    console.log("displayDrawnCard called");
}

function displayDiscard() {
    const displayDiscard = document.getElementById("displayDiscard");
    displayDiscard.innerHTML = "";
    deck
    const div = document.createElement("div");
    div.textContent = `${discardPile.pop()}`
    document
}

function isRun(n, hand){
    let sorted = hand.slice();
    sorted.sort((a, b) => a.value - b.value);
    let inARow = 1;

    for (let i = 1; i < sorted.length; i++) {
        if (sorted[i].value === sorted[i - 1].value + 1) {
            inARow++;
            if (inARow >= n) return true;
        } else {
            inARow = 1;
        }
    }
    return false;
}

let currentLevel = 0; 

function isSet(n, hand) {
    let sorted = hand.slice();
    sorted.sort((a, b) => a.value - b.value);
    let inARow = 1;
    for (let i = 1; i < sorted.length; i++) {
        if (sorted[i].value === sorted[i-1].value) {
            inARow++;
            if(inARow >= n) return true;
        } else {
            inARow = 1;
        }
    }
    return false;
}

function displayLevel(hand) {
    const displayLevel = document.getElementById("displayLevel");
    displayLevel.innerHTML = "";
    const div = document.createElement("div");
    div.textContent = `You are on phase (${currentLevel} + 1)`;
    displayLevel.appendChild(div);

    console.log("Level displayed")
}

function startNewRound() {
    deck = [...discardPile, ...phand, ...deck];
    shuffle(deck);

    phand = [];
    cpu1 = [];
    cpu2 = [];
    cpu3 = [];
    discardPile = [];

    dealCards(deck, phand);
    // dealCards(deck, cpu1);
    // dealCards(deck, cpu2);
    // dealCards(deck, cpu3);
    phand.sort((a, b) => a.value - b.value);

    isDrawn = false;
    drawnCard = null;
    updateHandDisplay(phand, true);
    displayDrawnCard();
    winChecker(phand);

    console.log("Reached end of round logic");
    console.log("Deck length:", deck.length);
    console.log("Hand:", phand.map(card => `${card.color} ${card.value}`)); 
    console.log("Current level:", (currentLevel + 1));
    console.log(deck.map(card => `${card.color} ${card.value}`));

    return deck; 
}

// Need to change advance level to check for layDown instead... then when hand reaches 0 they win round.
// Need a check phaseWin and round
function level1(hand) {
    // Run of 4
    if (isRun(4, hand)) {
        advanceLevel();
        startNewRound();
    } else {
        return;
    }
}
function level2(hand) {
    // Run of 5
    if (isRun(5, hand)) {
        advanceLevel();
        startNewRound();
    } else {
        return;
    }
}
function level3(hand) {
    // Set of 4
    if (isSet(4, hand)) {
        advanceLevel();
        startNewRound();
    } else {
        return; 
    }
}
function level4(hand) {
    // Set of 5
    if (isSet(5, hand)) {
        advanceLevel();
        startNewRound();
    } else {
        return;
    }
}
function level5(hand) {
    // Set of 3 Run of 3
    if (isSet(3, hand) && isRun(3, hand)) {
        advanceLevel();
        startNewRound();
    } else {
        return
    }
}
function level6(hand) {
    // Set of 4 Run of 3
    if (isSet(4, hand) && isRun(3, hand)) {
        advanceLevel();
        startNewRound();
    } else {
        return; 
    }
}
function level7(hand) {
    // Set of 7
    if (isSet(7, hand)) {
        advanceLevel();
        startNewRound();
    } else {
        return;
    }
}
function level8(hand) {
    // Run of 5 Set of 3
    if (isRun(5, hand) && isSet(3, hand)) {
        advanceLevel();
        startNewRound();
    } else {
        return;
    }
}
function level9(hand) {
    // Run of 8
    if (isRun(8, hand)) {
        advanceLevel();
        startNewRound();
    } else {
        return;
    }
}
function level10(hand) {
    // 9 of same color
    if (isColor(9, hand)) {
        console.log("Congratulations, you have won!")
    } else {
        return; 
    }
}

const levels = [level1, level2, level3, level4, level5, level6, level7, level8, level9, level10];


function advanceLevel() {
    // If winChecker returns true, advance level... Just realized I need to advance level upon laying all cards down
    currentLevel++;

    // Advance level if a player lays out all cards.
    console.log("Advanced to Level: " + (currentLevel + 1)); 
    if (currentLevel >= levels.length) {
        console.log("You have completed all phases! Congratulations!");
        // trigger win screen / lock UI/ etc. 
    }
}

function winChecker(hand) {
    // if win, call advance level. Check for win after discard or swap.
    levels[currentLevel](hand)
}

window.onload = () => {
    startGame();
    updateHandDisplay(phand);
}

console.log("Current level: ", (currentLevel + 1));
console.log("Function:", levels[currentLevel]);


// Need to figure out how to implement red, blue, green, and yellow

console.log(deck.map(card => `${card.color} ${card.value}`));