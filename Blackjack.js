/*
    Blackjack game:
    node Blackjack.js:

    create a deck of cards
    shuffle the deck
    deal 1 card to the player and dealer, then deal another card to the player and dealer
    begin loop
    check if player or dealer has 21 or more
        if 21, end and declare winner
        if over 21, end and declare other player winner
    deal player a card
    deal dealer a card
    keep going until someone wins

    steps:
    initialise vars
    function createDeck - 52 cards A-K and 4 suits, 2 arrays multiplied? [A-K][4 suits] -> [A of Spades]. A = 1 (for now), J,Q,K = 10
    function dealStartCards - deals starting cards and logs the starting hands of each player
    function startGame - starts the game, sets condition of while loop to true
    function dealCard - deals a random card and removes it from the deck
    // function checkState - sums up both players hands and checks if 21 or if above 21 - move to dealCard? 
    function endGame - ends the game, sets condition of while loop to false
    logs winner

*/

const cardValues = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
// const cardScore = cardValues.map((value) => {
//   if (value === "A") {
//     return 1;
//   }
//   if (value === "J" || value === "Q" || value === "K") {
//     return 10;
//   }
//   return value;
// });
const cardSuits = ["Spades", "Hearts", "Clubs", "Diamonds"];
const deck = [];
const playerHand = [];
const dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameEnd = false;

function createDeck() {
    for (const value of cardValues) {
        for (const suit of cardSuits) {
            deck.push([`${value} of ${suit}`]);
        }
    }
    //add score value to each card array - find an easier way to do this after finishing project
    deck.map((card) => {
        if (card[0].substring(0, 1) === "A") {
            card.push(1);
            return;
        }
        if (
            card[0].substring(0, 1) === "J" ||
            card[0].substring(0, 1) === "Q" ||
            card[0].substring(0, 1) === "K" ||
            card[0].substring(0, 2) === "10"
        ) {
            card.push(10);
            return;
        }
        card.push(card[0].substring(0, 1));
    });
}

function getRandomCard() {
    let randomIndex = Math.floor(Math.random() * deck.length);
    let randomCard = deck[randomIndex];
    deck.splice(randomIndex, 1);
    return randomCard;
}

function evaluatePlayerScore() {
    playerScore += parseInt(playerHand[playerHand.length - 1][1]);
}
function evaluateDealerScore() {
    playerScore += parseInt(playerHand[playerHand.length - 1][1]);
}

function dealStartCards() {
    playerHand.push(getRandomCard());
    dealerHand.push(getRandomCard());
    playerHand.push(getRandomCard());
    dealerHand.push(getRandomCard());
    //evaluate starting score:
    for (cardArray of dealerHand) {
        dealerScore += parseInt(cardArray[1]);
    }
    for (cardArray of playerHand) {
        playerScore += parseInt(cardArray[1]);
    }
}
function checkState() {
    if (dealerScore === 21) {
        console.log("Dealer wins!");
        return (gameEnd = true);
    }
    if (playerScore === 21) {
        console.log("Player wins!");
        return (gameEnd = true);
    }
    if (dealerScore > 21) {
        console.log("Dealer bust, Player wins!");
        return (gameEnd = true);
    }
    if (playerScore > 21) {
        console.log("Player bust, dealer wins!");
        return (gameEnd = true);
    }
}

/*




*/
console.log("Starting game.");
createDeck();

dealStartCards();
console.log("Playerhand:", playerHand, "   Playerscore: ", playerScore);
console.log("Dealerhand:", dealerHand, "   Dealerscore: ", dealerScore);

console.log("Beginning game loop.");
while (gameEnd === false) {
    checkState();
    playerHand.push(getRandomCard());
    evaluatePlayerScore();
    console.log("Playerhand:", playerHand, "   Playerscore: ", playerScore);
    checkState();
    dealerHand.push(getRandomCard());
    evaluateDealerScore();
    console.log("Dealerhand:", dealerHand, "   Dealerscore: ", dealerScore);
}

//issue with a card being added to the next player after the previous player loses, shouldn't checkState end the while loop as soon as it sends gameEnd to true?
//it doesn't then increase the next player's score either
