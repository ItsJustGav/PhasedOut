let drawnCard = null;
let phand = [];
let discardPile = [];
let isDrawn = false;
const discardBtn = document.getElementById("discardButton");

class Card { 
    constructor(value, color) {
        this.value = value;
        this.color = color;
    }
}

let deck = [];
const colors = ['Red', 'Blue', 'Green', 'Yellow'];
colors.forEach(color => {
    for (let i = 1; i <=12; i++) {
        for (let j = 0; j < 2; j++) {
            deck.push(new Card(i, color));
        }
    }
})


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
    } else {
        alert("You do not have a drawn card");
    }
       
}

    updateHandDisplay(phand);


function updateHandDisplay(hand) {
    const handDisplay = document.getElementById("handDisplay");
    handDisplay.innerHTML = ""; 

    hand.forEach((card, index) => {
        const li = document.createElement("li");
        //li.textContent = `${card.value}`;

        const swapBtn = document.createElement("button");
        swapBtn.textContent = `${card.color} ${card.value}`;
        swapBtn.classList.add(card.color.toLowerCase());
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


window.onload = () => {
    updateHandDisplay(phand);
}


// Need to figure out how to implement red, blue, green, and yellow

shuffle(deck);
console.log(deck);
dealCards(deck, phand);



/* 
    Create 10 levels
     -Run of 4
     -Run of 5
     -Set of 4
     -Set of 5
     -Set of 3 run of 3
     -Set of 4 run of 3
     -Set of 7
     -Run of 5 Set of 3
     -Run of 8
     -9 of Same Color
*/

